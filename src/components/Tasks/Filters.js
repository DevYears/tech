import React, { useState, useRef } from 'react';
import { Grid } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import ControlPointIcon from '@material-ui/icons/ControlPoint';

import { showSnackbarNotification } from '../../actions/NotificationActions';
import { changeFilters as setActiveFilters } from '../../actions/TasksActions';

const useFilterStyles = makeStyles((theme) => ({
  filterItem: {
    marginRight: '1em',
  },
  filterCreateDialog: {
    minWidth: '10em',
  },
  filterContainer: {
    paddingBottom: theme.spacing(2),
  },
}));

const FILTER_ITEMS = [
  { id: 'id', name: 'ID задачи', multiple: true },
  { id: 'doer_user_id', name: 'ID исполнителя' },
  { id: 'craftsman_user_id', name: 'ID мастера' },
  {
    id: 'status_id',
    name: 'Cтатус задачи',
    multiple: true,
    selector: [
      { value: 1, name: 'Новая' },
      { value: 10, name: 'В работе' },
      { value: 100, name: 'Готово' },
    ],
  },
  { id: 'type_id', name: 'ID типа задачи', multiple: true },
];

export default function () {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [openCreateFilter, setOpenCreateFilter] = useState(false);
  const activeFilters = useSelector(({ tasks }) => tasks.filters);
  const [currentFilter, setCurrentFilter] = useState(undefined);
  const currentFilterValueInput = useRef(null);
  const classes = useFilterStyles();
  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleMenuClick = (item) => () => {
    setCurrentFilter(item);
    setOpenCreateFilter(true);
    handleMenuClose();
  };

  const handleCloseCreateFilter = () => {
    setCurrentFilter(undefined);
    setOpenCreateFilter(false);
  };

  const handleCreateFilter = () => {
    const filter = {
      value: currentFilterValueInput.current.value,
      name: currentFilter.id,
      description: currentFilter.name,
      selector: currentFilter.selector,
    };

    if (filter.value === '' || filter.value === undefined) {
      dispatch(showSnackbarNotification('Заполните значение фильтра', 'warning'));
      return;
    }

    if (
      !currentFilter.multiple
      && activeFilters.filter((activeFilter) => (activeFilter.name === currentFilter.id))[0]
    ) {
      handleCloseCreateFilter();
      dispatch(showSnackbarNotification('Фильтр такого типа уже присутствует', 'warning'));
      return;
    }

    dispatch(setActiveFilters([...activeFilters, filter]));
    handleCloseCreateFilter();
  };

  const handleDeleteFilter = (filter) => () => {
    dispatch(setActiveFilters([
      ...activeFilters.filter((activeFilter) => activeFilter !== filter),
    ]));
  };

  return (
    <Grid className={classes.filterContainer} container spacing={2}>
      <Grid item>
        <Chip className={classes.filterItem} label="Добавить фильтр" color="primary" onClick={handleMenuOpen} icon={<ControlPointIcon />} />
      </Grid>
      {activeFilters.map((activeFilter) => (
        <Grid item><Chip key={`${activeFilter.name}: ${activeFilter.value}`} className={classes.filterItem} label={`${activeFilter.description}: ${activeFilter.value}`} onDelete={handleDeleteFilter(activeFilter)} color="primary" variant="outlined" /></Grid>
      ))}
      <Menu
        id="simple-menu"
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        {FILTER_ITEMS.map((item) => (
          <MenuItem key={item.id} onClick={handleMenuClick(item)}>{item.name}</MenuItem>
        ))}
      </Menu>
      <Dialog open={openCreateFilter} onClose={handleCloseCreateFilter} aria-labelledby="form-dialog-title">
        <DialogContent>
          <TextField
            className={classes.filterCreateDialog}
            inputRef={currentFilterValueInput}
            // eslint-disable-next-line no-unneeded-ternary
            select={currentFilter && currentFilter.selector ? true : false}
            autoFocus
            margin="dense"
            id="name"
            label="Введите значение"
            type="email"
            fullWidth
          >
            { currentFilter && currentFilter.selector ? currentFilter.selector.map((selector) => (
              <MenuItem key={selector.value} value={selector.value}>{selector.name}</MenuItem>
            )) : null}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateFilter} color="primary">
            Применить
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
