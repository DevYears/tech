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

import UpdateIcon from '@material-ui/icons/Update';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import Filters from './Filters';
import {
  fetchTasks, setPage, setRowsPerPage, fetchTask,
} from '../../actions/TasksActions';

const useStyles = makeStyles((theme) => ({
  tasksContainer: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    paddingBottom: '6em',
    height: '100%',
  },
  tasksHeader: {
    marginBottom: theme.spacing(2),
  },
  filters: {
    paddingBottom: theme.spacing(2),
  },
}));

// id
// author_user_id
// craftsman_user_id
// doer_user_id
// type_id
// status_id
// version
// descr
// created_at
// started_at
// completed_at
// descr_parsed
// type_name
// status_name

export default function () {
  const {
    tasks, paginator, page, rowsPerPage, filters,
  } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, page, rowsPerPage, filters]);

  const handleShowTask = (id) => () => {
    dispatch(fetchTask(id));
  };

  const formatDate = (dateStr) => dateStr.replace('Z', '').split('T').reverse().join(' ');

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
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
          <IconButton
            onClick={() => {
              dispatch(fetchTasks());
            }}
          >
            <UpdateIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid className={classes.filters} container spacing={2}>
        <Filters />
      </Grid>
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
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell>{row.craftsman_user_id}</TableCell>
                <TableCell>{row.doer_user_id}</TableCell>
                <TableCell>{row.type_id}</TableCell>
                <TableCell>{row.status_name}</TableCell>
                <TableCell>
                  <div>
                    <IconButton onClick={handleShowTask(row.id)}><EditIcon /></IconButton>
                    <IconButton><DeleteForeverIcon /></IconButton>
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
