import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Icon, makeStyles } from '@material-ui/core';
import * as stocksStore from '../stores/stocks-store';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: '#ace5ff',
  },
  titleBarColorPrimary: {
    backgroundColor: '#384047',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  money: {
    color: '#3cff3c',
    marginRight: theme.spacing(3),
  },
  refreshColorPrimary: {
    color: '#04a9f4',
  },
}));

const TitleBar = (props) => {
  const classes = useStyles();

  const handleRefresh = async () => {
    await stocksStore.findall();
  }

  return (
    <AppBar position='static' classes={{ root: classes.root, colorPrimary: classes.titleBarColorPrimary }} className={props.appbarstyle}>
      <Toolbar>
        <Typography variant='h5' color='secondary' className={classes.root}>StockRx</Typography>
        <div className={classes.menuButton}>
          <IconButton onClick={handleRefresh}>
            <Icon color='primary' classes={{ colorPrimary: classes.refreshColorPrimary }}>refresh</Icon>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TitleBar;