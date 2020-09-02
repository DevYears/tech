import React, { useState, useRef } from 'react';
import Chip from '@material-ui/core/Chip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import ControlPointIcon from '@material-ui/icons/ControlPoint';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useFilterStyles = makeStyles(() => ({
  filterItem: {
    marginRight: '1em',
  },
}));

const FILTER_ITEMS = [
  { id: 'id', name: 'ID задачи', multiple: true },
  { id: 'doer_user_id', name: 'ID исполнителя' },
  { id: 'craftsman_user_id', name: 'ID мастера' },
  // 1 - новая, 10 - в работе, 100 - готово
  { id: 'status_id', name: 'ID статуса задачи', multiple: true },
  { id: 'type_id', name: 'ID типа задачи', multiple: true },
];

export default function () {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [openCreateFilter, setOpenCreateFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(undefined);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertError, setAlertError] = useState('');
  const currentFilterValueInput = useRef(null);
  const classes = useFilterStyles();

  const callAlert = (error) => {
    setAlertError(error);
    setAlertOpen(true);
  };

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
    };

    if (filter.value === '') {
      callAlert('Заполните значение фильтра');
      return;
    }

    if (
      !currentFilter.multiple
      && activeFilters.filter((activeFilter) => (activeFilter.name === currentFilter.id))[0]
    ) {
      handleCloseCreateFilter();
      callAlert('Фильтр такого типа уже присутствует');
      console.error('Filter already exists');
      return;
    }

    setActiveFilters([...activeFilters, filter]);
    handleCloseCreateFilter();
  };

  const handleAlertClose = () => {
    setAlertError('');
    setAlertOpen(false);
    // if (reason === 'clickaway') {
    //   return;
    // }
  };

  const handleDeleteFilter = (filter) => () => {
    setActiveFilters([...activeFilters.filter((activeFilter) => activeFilter !== filter)]);
  };

  return (
    <>
      <Chip className={classes.filterItem} label="Добавить фильтр" color="primary" onClick={handleMenuOpen} icon={<ControlPointIcon />} />
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
            inputRef={currentFilterValueInput}
            autoFocus
            margin="dense"
            id="name"
            label="Введите значение"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateFilter} color="primary">
            Применить
          </Button>
        </DialogActions>
      </Dialog>
      {activeFilters.map((activeFilter) => (
        <Chip deleteIcon={DeleteForeverIcon} className={classes.filterItem} label={`${activeFilter.description}: ${activeFilter.value}`} onDelete={handleDeleteFilter(activeFilter)} color="primary" variant="outlined" />
      ))}
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertOpen} autoHideDuration={2000} onClose={handleAlertClose}>
        <MuiAlert severity="error">
          {alertError}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
