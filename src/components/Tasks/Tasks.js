import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from 'react-router-dom';

import UpdateIcon from '@material-ui/icons/Update';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import EditIcon from '@material-ui/icons/Edit';
import QueueIcon from '@material-ui/icons/Queue';

import Filters from './Filters';
import { navigateToHandler } from '../../routes/routes';
import {
  fetchTasks, setPage, setRowsPerPage, fetchTakeNew, fetchTaskReset,
} from '../../actions/TasksActions';
import {
  fetchUsers,
} from '../../actions/DirectoryActions';

const useStyles = makeStyles((theme) => ({
  tasksContainer: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    paddingBottom: '6em',
  },
  tasksHeader: {
    marginBottom: theme.spacing(2),
  },
  tasksRow: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#eee',
    },
  },
  filters: {
    paddingBottom: theme.spacing(2),
  },
}));

export default function () {
  const {
    tasks, paginator, page, rowsPerPage, filters,
  } = useSelector((state) => state.tasks);
  const users = useSelector(({ directory }) => directory.users);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, page, rowsPerPage, filters]);

  useEffect(() => {
    const userIds = new Set([
      ...tasks.map((task) => task.craftsman_user_id),
      ...tasks.map((task) => task.doer_user_id),
    ]);
    dispatch(fetchUsers([...userIds]));
  }, [dispatch, tasks]);

  // Fast DateTime conversion
  const formatDate = (dateStr) => dateStr.replace('Z', '').split('T').reverse().join(' ')
    .split('-')
    .reverse()
    .map((val, index) => (index !== 2 ? val : val.split(' ').reverse().join(' ')))
    .join('.');

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
  };

  const handleResetTask = (id) => () => {
    dispatch(fetchTaskReset(id));
    setTimeout(() => dispatch(fetchTasks()), 1000);
  };

  const handleShowTask = (id) => () => {
    navigateToHandler(history, `/tasks/${id}`)();
  };

  const replaceUser = (id) => {
    if (id === 0) {
      return 'Нет';
    }
    if (users) {
      const userData = users[id];
      if (userData) {
        return `${userData.last_name} ${userData.name}`;
      }
    }
    return id;
  };

  return (
    <Card className={classes.tasksContainer}>
      <Grid container justify="space-between">
        <Grid>
          <Typography className={classes.tasksHeader} component="h1" variant="h6">
            Задачи
          </Typography>
        </Grid>
        <Grid>
          <Tooltip title="Взять в работу новую задачу">
            <IconButton
              onClick={() => {
                dispatch(fetchTakeNew());
              }}
            >
              <QueueIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Обновить">
            <IconButton
              onClick={() => {
                dispatch(fetchTasks());
              }}
            >
              <UpdateIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Filters />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Мастер</TableCell>
              <TableCell>Исполнитель</TableCell>
              <TableCell>Тип</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Управление</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((row) => (
              <TableRow
                className={classes.tasksRow}
                key={row.id}
                onDoubleClick={handleShowTask(row.id)}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell>{replaceUser(row.craftsman_user_id)}</TableCell>
                <TableCell>{replaceUser(row.doer_user_id)}</TableCell>
                <TableCell>{row.type_name}</TableCell>
                <TableCell>{row.status_name}</TableCell>
                <TableCell>
                  <div>
                    <Tooltip title="Открыть задачу">
                      <IconButton onClick={handleShowTask(row.id)}><EditIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title="Сбросить задачу">
                      <IconButton onClick={handleResetTask(row.id)}>
                        <RestoreFromTrashIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[30, 50, 100]}
        component="div"
        count={paginator.count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        labelRowsPerPage="Задач на странице"
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Card>
  );
}
