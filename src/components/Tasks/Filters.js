import React, { useState } from 'react';
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
import Autocomplete from '@material-ui/lab/Autocomplete';

import ControlPointIcon from '@material-ui/icons/ControlPoint';

import { showSnackbarNotification } from '../../actions/NotificationActions';
import { changeFilters as setActiveFilters, setPage } from '../../actions/TasksActions';
import { fetchUserByTerm } from '../../actions/DirectoryActions';

const useFilterStyles = makeStyles((theme) => ({
  filterItem: {
    marginRight: '1em',
  },
  filterCreateDialog: {
    minWidth: '23em',
  },
  filterContainer: {
    paddingBottom: theme.spacing(2),
  },
}));

const FILTER_ITEMS = [
  { id: 'id', name: 'ID задачи', multiple: true },
  { id: 'doer_user_id', name: 'Исполнитель', selectUser: true },
  { id: 'craftsman_user_id', name: 'Мастер', selectUser: true },
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

const FilterInput = ({
  handleFilterInputChange, currentFilter, currentFilterValue, currentFilterOptions,
}) => {
  const classes = useFilterStyles();
  if (!currentFilter) {
    return null;
  }

  if (currentFilter.selector) {
    return (
      <TextField
        className={classes.filterCreateDialog}
        // eslint-disable-next-line no-unneeded-ternary
        select
        onChange={handleFilterInputChange}
        autoFocus
        margin="dense"
        id="name"
        label={currentFilter.name}
        fullWidth
        value={currentFilterValue}
      >
        { currentFilter && currentFilter.selector ? currentFilter.selector.map((selector) => (
          <MenuItem key={selector.value} value={selector.value}>{selector.name}</MenuItem>
        )) : null}
      </TextField>
    );
  }

  if (currentFilter.selectUser) {
    return (
      <Autocomplete
        className={classes.filterCreateDialog}
        options={currentFilterOptions}
        value={currentFilterValue}
        getOptionLabel={(option) => `${option.last_name} ${option.name} (${option.email})`}
        onChange={handleFilterInputChange}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            onChange={handleFilterInputChange}
            label={currentFilter.name}
          />
        )}
      />
    );
  }

  return (
    <TextField
      className={classes.filterCreateDialog}
      // eslint-disable-next-line no-unneeded-ternary
      onChange={handleFilterInputChange}
      autoFocus
      margin="dense"
      id="name"
      label={currentFilter.name}
      fullWidth
      value={currentFilterValue}
    />
  );
};

export default function () {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [openCreateFilter, setOpenCreateFilter] = useState(false);
  const activeFilters = useSelector(({ tasks }) => tasks.filters);
  const usersByTerm = useSelector(({ directory }) => directory.usersByTerm);
  const [currentFilter, setCurrentFilter] = useState(undefined);
  const [currentFilterValue, setCurrentFilterValue] = useState(undefined);
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
    setCurrentFilterValue(undefined);
    setOpenCreateFilter(false);
  };

  const handleCreateFilter = () => {
    const filter = {
      value: currentFilterValue,
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

    dispatch(setPage(0));
    dispatch(setActiveFilters([...activeFilters, filter]));
    handleCloseCreateFilter();
  };

  const handleDeleteFilter = (filter) => () => {
    dispatch(setPage(0));
    dispatch(setActiveFilters([
      ...activeFilters.filter((activeFilter) => activeFilter !== filter),
    ]));
  };

  const handleFilterInputChange = (e, newVal) => {
    const val = e.target.value;

    if (currentFilter.selectUser && val.length > 2) {
      dispatch(fetchUserByTerm(val));
    }

    if (newVal && newVal.id) {
      setCurrentFilterValue(newVal.id);
      return;
    }

    setCurrentFilterValue(val);
  };

  return (
    <Grid className={classes.filterContainer} container spacing={2}>
      <Grid item>
        <Chip className={classes.filterItem} label="Добавить фильтр" color="primary" onClick={handleMenuOpen} icon={<ControlPointIcon />} />
      </Grid>
      {activeFilters.map((activeFilter) => (
        <Grid key={`${activeFilter.description}: ${activeFilter.value}`} item><Chip className={classes.filterItem} label={`${activeFilter.description}: ${activeFilter.value}`} onDelete={handleDeleteFilter(activeFilter)} color="primary" variant="outlined" /></Grid>
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
          <FilterInput
            handleFilterInputChange={handleFilterInputChange}
            currentFilter={currentFilter}
            currentFilterValue={currentFilterValue}
            currentFilterOptions={usersByTerm}
          />
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
