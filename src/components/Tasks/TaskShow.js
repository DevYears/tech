import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import marked from 'marked';

import { fetchTask, changeTask, fetchTaskReady } from '../../actions/TasksActions';
import { fetchUsers } from '../../actions/DirectoryActions';
import { navigateToHandler, PAGES } from '../../routes/routes';

const useStyles = makeStyles((theme) => ({
  tasksContainer: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    paddingBottom: '6em',
  },
  control: {
    marginRight: '1em',
  },
}));

export default function () {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const task = useSelector((({ tasks }) => tasks.task));
  const users = useSelector(({ directory }) => directory.users);

  useEffect(() => {
    dispatch(fetchTask(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (task) {
      dispatch(fetchUsers([task.craftsman_user_id, task.Buttondoer_user_id]));
    }
  }, [task, dispatch]);

  const markdownToHtml = (md) => marked(md);
  // @todo Potential XSS, let's pretend we trust the server
  // We can filter it here if needed

  const readyHandler = () => {
    dispatch(fetchTaskReady(task.id, task.version));
  };

  const closeHandler = () => {
    dispatch(changeTask(undefined));
    navigateToHandler(history, PAGES.tasks)();
  };

  const replaceUser = (userId) => {
    if (userId === 0) {
      return 'Нет';
    }
    if (users) {
      const userData = users[userId];
      if (userData) {
        return `${userData.last_name} ${userData.name}`;
      }
    }
    return userId;
  };

  if (!task) {
    return (
      <Card className={classes.tasksContainer}>
        <Typography component="h1" variant="h6">
          Загрузка...
        </Typography>
        <Button
          className={classes.control}
          variant="outlined"
          color="primary"
          onClick={closeHandler}
        >
          Закрыть
        </Button>
      </Card>
    );
  }

  return (
    <Card className={classes.tasksContainer}>
      <Typography component="h1" variant="h6">
        {`Задача: ${task.type_name}`}
      </Typography>
      <Typography component="p">
        {`${task.created_at}, ${task.status_name}`}
      </Typography>
      <Typography component="p">
        {`Мастер: ${replaceUser(task.craftsman_user_id)}`}
      </Typography>
      <Typography component="p">
        {`Исполнитель: ${replaceUser(task.doer_user_id)}`}
      </Typography>
      <Typography component="h1" variant="h6">
        Описание:
      </Typography>
      <div
        className="markdownContainer"
        dangerouslySetInnerHTML={{
          __html: markdownToHtml(task.descr_parsed),
        }}
      />
      <Button
        className={classes.control}
        variant="contained"
        color="primary"
        onClick={readyHandler}
      >
        Готово
      </Button>
      <Button
        className={classes.control}
        variant="contained"
        color="primary"
        disabled
      >
        Сохранить
      </Button>
      <Button
        className={classes.control}
        variant="outlined"
        color="primary"
        onClick={closeHandler}
      >
        Закрыть
      </Button>
    </Card>
  );
}
