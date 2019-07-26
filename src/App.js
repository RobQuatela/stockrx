import React, { useEffect, useState } from 'react';
import './App.css';
import TitleBar from './common/components/title-bar';
import * as stocksStore from './common/stores/stocks-store';
import * as snackbarStore from './common/stores/snackbar-store';
import StocksProvider from './pages/stocks/stocks-provider';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import PortfolioProvider from './pages/portfolio/portfolio-provider';
import { Drawer, makeStyles, Snackbar, Icon } from '@material-ui/core';
import DrawerContent from './common/components/drawer-content';

const drawerWidth = 250;

const useStyles = makeStyles({
  root: {
    //display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    backgroundColor: '#2b343b',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  }
});

function App() {
  const classes = useStyles();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    stocksStore.findall();
    const subscription = snackbarStore.snackbar$.subscribe(snackbar => {
      setIsSnackbarOpen(snackbar.isOpen);
      setSnackbarMessage(snackbar.message);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCloseSnackbar = () => setIsSnackbarOpen(false);

  return (
    <div className={classes.root}>
      <TitleBar appbarstyle={classes.appBar} />
      <Router>
        <div>
          <Drawer
            className={classes.drawer}
            variant='permanent'
            anchor='left'
            classes={{ paper: classes.drawer }}
          >
            <DrawerContent />
          </Drawer>
          <div className={classes.content}>
            <Switch>
              <Route path='/stocks' component={StocksProvider} />
              <Route path='/portfolio' component={PortfolioProvider} />
              <Redirect from='*' to='/stocks' />
            </Switch>
          </div>
        </div>
      </Router>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={isSnackbarOpen}
        autoHideDuration={500}
        message={
          <div style={{display: 'flex', alignItems: 'center', color: 'lightgreen'}}>
            <Icon>thumb_up</Icon>
            <span style={{marginLeft: 10}}>{snackbarMessage}</span>
          </div>
        }
        onClose={handleCloseSnackbar}
      />
    </div>
  );
}

export default App;
