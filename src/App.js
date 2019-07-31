import React, { useEffect, useState } from 'react';
import TitleBar from './common/components/title-bar';
import * as availableStocksStore from './common/stores/available-stocks-store';
import * as snackbarStore from './common/stores/snackbar-store';
import * as activityStore from './common/stores/activities-store';
import StocksProvider from './pages/stocks/stocks-provider';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import PortfolioProvider from './pages/portfolio/portfolio-provider';
import { Drawer, makeStyles, Snackbar, Icon } from '@material-ui/core';
import DrawerContent from './common/components/drawer-content';
import ActivityProvider from './pages/activity/activity-provider';

const drawerWidth = 250;

const useStyles = makeStyles({
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
    availableStocksStore.dispatch({ type: 'REFRESH_AVAILABLE_STOCKS' });
    
    const subscriptions = [];
    
    subscriptions.push(snackbarStore.snackbar$.subscribe(snackbar => {
      setIsSnackbarOpen(snackbar.isOpen);
      setSnackbarMessage(snackbar.message);
    }));

    subscriptions.push(availableStocksStore.availableStocksState$.subscribe());
    subscriptions.push(activityStore.activities$.subscribe());

    return () => subscriptions.forEach(subscription => subscription.unsubscribe());
  }, []);

  const handleCloseSnackbar = () => snackbarStore.dispatch({ type: 'HIDE_SNACKBAR' });

  return (
    <div>
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
              <Route exact path='/stocks' component={StocksProvider} />
              <Route exact path='/portfolio' component={PortfolioProvider} />
              <Route exact path='/activity' component={ActivityProvider} />
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
