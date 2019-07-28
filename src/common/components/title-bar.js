import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Icon, makeStyles, Badge } from '@material-ui/core';
import * as stocksStore from '../stores/available-stocks-store';
import TitleBarNotificationsMenu from './title-bar-notifications-menu';
import * as notificationsStore from '../stores/notifications-store';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: '#d5d6d7',
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
  iconColorPrimary: {
    color: '#ace5ff',
  },
  iconColorSecondary: {
    // color: '#73818e',
    color: 'rgb(255, 237, 111)',
  }
}));

const TitleBar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // subscribe to notifications store to receive list of notifications
    const subscription = notificationsStore.notifications$.subscribe((notifications, err) => {
      if (err) {
        console.log(err);
      }
      setNotifications(notifications);
    })

    return () => subscription.unsubscribe();
  }, []);

  // effect for closing the menu automatically if notifications are at 0
  useEffect(() => {
    if (notifications.length === 0) {
      setAnchorEl(null);
    }
  }, [notifications]);

  const handleRefresh = async () => {
    await stocksStore.actions.refresh();
  }

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const removeNotification = (id) => notificationsStore.actions.remove(id);

  const clearAllNotifications = () => notificationsStore.actions.clear();

  return (
    <AppBar position='static' classes={{ root: classes.root, colorPrimary: classes.titleBarColorPrimary }} className={props.appbarstyle}>
      <Toolbar>
        <Typography variant='h5' color='secondary' className={classes.root}>StockRx</Typography>
        <div className={classes.menuButton}>
          <IconButton onClick={handleRefresh}>
            <Icon color='primary' classes={{ colorPrimary: classes.iconColorPrimary }}>refresh</Icon>
          </IconButton>
          <IconButton onClick={handleMenuClick}>
            <Badge badgeContent={notifications.length} max={5} color='secondary'>
              <Icon color='secondary' classes={{ colorSecondary: classes.iconColorSecondary }}>notifications</Icon>
            </Badge>
          </IconButton>
          <TitleBarNotificationsMenu
            anchorEl={anchorEl}
            notifications={notifications}
            handleclose={handleMenuClose}
            handleremovenotification={removeNotification}
            handleclear={clearAllNotifications}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TitleBar;