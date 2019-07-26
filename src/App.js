import React, { useEffect } from 'react';
import './App.css';
import TitleBar from './common/components/title-bar';
import * as stocksService from './common/services/stocks-service';
import StocksProvider from './pages/stocks/stocks-provider';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import PortfolioProvider from './pages/portfolio/portfolio-provider';
import { Drawer, makeStyles } from '@material-ui/core';
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
  useEffect(() => {
    stocksService.findall();
  }, [])
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
    </div>
  );
}

export default App;
