import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Icon, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  iconColor: {
    color: 'white',
  }
})

const TitleBar = () => {
  const classes = useStyles();
  return (
    <AppBar color='primary' position='static'>
      <Toolbar>
        <IconButton edge='start'>
          <Icon classes={{ colorPrimary: classes.iconColor }}>menu</Icon>
        </IconButton>
        <Typography variant='h5'>StockTix</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TitleBar;