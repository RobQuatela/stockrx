import React, { useState, useEffect } from 'react';
import { makeStyles, Divider, List, ListItem, ListItemIcon, Icon, ListItemText } from '@material-ui/core';
import * as portFolioServices from '../stores/portfolio-store';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  drawerContent: {
    display: 'grid',
    gridTemplateRows: '20% 20% auto',
    height: '100%',
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: '50%',
    backgroundImage: 'url(https://api.adorable.io/avatars/285/abott@adorable.png)',
    backgroundSize: 'cover',
    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
    alignSelf: 'center',
    justifySelf: 'center',
  },
  profile: {
    backgroundColor: '#384047',
  },
  walletStats: {
    display: 'flex',
    alignItems: 'center',
    margin: 10,
    '& p, small': {
      margin: 0,
      marginTop: 5,
      marginRight: 10,
    }
  },
  navigation: {
  },
  link: {
    textDecoration: 'none',
    color: '#d5d6d7',
    '&:hover': {
      textDecoration: 'none',
      color: '#ace5ff',
    }
  },
  linkActive: {
    color: '#ace5ff',
  },
  iconPrimaryColor: {
    color: '#d5d6d7',
  },
})
const DrawerContent = () => {
  const [state, setState] = useState({
    wallet: 0,
    name: '',
    createdAt: new Date(),
  });

  const classes = useStyles();

  useEffect(() => {
    portFolioServices.portfolio$.subscribe(portfolio => {
      setState({
        wallet: portfolio.wallet,
        name: portfolio.name,
        createdAt: portfolio.createdAt,
      });
    });
  }, []);

  return (
    <div className={classes.drawerContent}>
      <div className={classes.avatar}>
      </div>

      <div className={classes.profile}>
        <Divider />
        <div className={classes.walletStats}>
          <small>Cash on Hand: </small>
          <p style={{ color: '#3cff3c' }}>${state.wallet.toFixed(2)}</p>
        </div>
        <div className={classes.walletStats}>
          <small>Name: </small>
          <p>{state.name}</p>
        </div>
        <div className={classes.walletStats}>
          <small>Created: </small>
          <p>{state.createdAt.toISOString()}</p>
        </div>
      </div>
      <div className={classes.navigation}>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <Icon color='primary' classes={{colorPrimary: classes.iconPrimaryColor}}>poll</Icon>
            </ListItemIcon>
            <ListItemText>
                <NavLink to='/stocks' className={classes.link} activeClassName={classes.linkActive}>Stock Exchange</NavLink>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Icon color='primary' classes={{ colorPrimary: classes.iconPrimaryColor }}>account_circle</Icon>
            </ListItemIcon>
            <ListItemText>
                <NavLink to='/portfolio' className={classes.link} activeClassName={classes.linkActive}>My Portfolio</NavLink>
            </ListItemText>
          </ListItem>
        </List>
      </div>
    </div>
  )
};

export default DrawerContent;