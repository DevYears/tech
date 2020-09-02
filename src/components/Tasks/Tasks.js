import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import UpdateIcon from '@material-ui/icons/Update';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import store from '../../store';
import { fetchTasks } from '../../actions/TasksActions';
import Filters from './Filters';

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

// function createData(name, calories, fat, carbs, protein) {
//   return {
//     name, calories, fat, carbs, protein,
//   };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function () {
  const tasks = useSelector((state) => state.tasks.tasks) || [];
  const classes = useStyles();

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
              store.dispatch(fetchTasks());
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
                <TableCell>{row.created_at}</TableCell>
                <TableCell>{row.craftsman_user_id}</TableCell>
                <TableCell>{row.doer_user_id}</TableCell>
                <TableCell>{row.type_id}</TableCell>
                <TableCell>{row.status_name}</TableCell>
                <TableCell>
                  <div>
                    <IconButton><EditIcon /></IconButton>
                    <IconButton><DeleteForeverIcon /></IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
