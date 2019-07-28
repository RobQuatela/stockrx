import React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText, Icon, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#1e272e',
    color: '#d5d6d7',
  },
  clearBtnPrimaryColor: {
    color: '#d5d6d7',
  },
});

const TitleBarNotificationsMenu = (props) => {
  const classes = useStyles();

  const showClearButton = (value) => {
    if (value > 0) {
      return (
        <MenuItem>
          <Button 
            color='primary' 
            classes={{ textPrimary: classes.clearBtnPrimaryColor }}
            onClick={props.handleclear}
          >
            Clear All
          </Button>
        </MenuItem>
      );
    }
  }

  return (
    <Menu
      id='notifications_menu'
      anchorEl={props.anchorEl}
      keepMounted
      open={Boolean(props.anchorEl)}
      onClose={props.handleclose}
      classes={{ paper: classes.root }}
    >
      {
        props.notifications.map(notification => (
          <MenuItem key={notification.id}>
            <ListItemIcon onClick={() => props.handleremovenotification(notification.id)}>
              <Icon color='secondary'>cancel</Icon>
            </ListItemIcon>
            <ListItemText>{notification.message}</ListItemText>
          </MenuItem>
        ))
      }
      {showClearButton(props.notifications.length)}
    </Menu>
  )
}

export default TitleBarNotificationsMenu;
