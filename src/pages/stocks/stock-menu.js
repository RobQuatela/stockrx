import React from 'react';
import { Button, Icon, TextField } from '@material-ui/core';
import './stock-menu.css';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  primaryColors: {
    backgroundColor: 'white',
  },
});

const StocksMenu = (props) => {
  const classes = useStyles();
  return (
    <div className='stock-menu'>
      <TextField
        id='search'
        label='Search'
        onChange={(event) => props.handleSearch(event.target.value)}
        fullWidth
      />
      <Button classes={{ root: classes.primaryColors }} onClick={props.handleRefresh}>
        Refresh
                <Icon>refresh</Icon>
      </Button>
    </div>
  )
};

export default StocksMenu;