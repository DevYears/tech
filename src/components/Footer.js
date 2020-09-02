import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  footer: {
    position: 'relative',
    bottom: 0,
    right: 0,
    left: 0,
    height: '6em',
    paddingTop: '2em',
    textAlign: 'center',
    backgroundColor: '#3f51b5',
    color: '#fff',
  },
}));

export default function () {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Typography>© ООО «Толковая реклама»</Typography>
      <Typography>ОГРН: 1132315004117, ИНН: 2315182076, КПП: 231501001</Typography>
      <Typography>353905, Край Краснодарский, г. Новороссийск, ул. Иссаева, 2, офис 7</Typography>
    </div>
  );
}
