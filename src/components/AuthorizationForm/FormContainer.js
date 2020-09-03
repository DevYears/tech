import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import AuthorizationRouter from '../../routes/AuthorizationRouter';

const useStyles = makeStyles((theme) => ({
  authFormContainer: {
    paddingTop: theme.spacing(4),
  },
}));

export default function () {
  const classes = useStyles();

  return (
    <Container className={classes.authFormContainer} component="main" maxWidth="sm">
      <Card>
        <CardContent>
          <AuthorizationRouter />
        </CardContent>
      </Card>
    </Container>
  );
}
