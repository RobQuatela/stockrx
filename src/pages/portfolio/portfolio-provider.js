import React, { useEffect, useState } from 'react';
import * as portfolioStore from '../../common/stores/portfolio-store';
import { makeStyles } from '@material-ui/styles';
import PortfolioDetail from './portfolio-detail';
import PortfolioStockTable from './portfolio-stock-table';

const useStyles = makeStyles({
  root: {
    margin: 30,
  },
});

const PortfolioProvider = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    wallet: 0,
    stocks: [],
    name: '',
  });

  useEffect(() => {
    const subscription = portfolioStore.portfolio$.subscribe(portfolioState => {
      setState({
        wallet: portfolioState.wallet,
        stocks: portfolioState.stocks,
        name: portfolioState.name,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const getStocksTotal = () => state.stocks.length > 0 ? state.stocks.map(x => x.price * x.shares).reduce((a, b) => a + b) : 0;
  const getSharesTotal = () => state.stocks.length > 0 ? state.stocks.map(x => x.shares).reduce((a, b) => a + b) : 0;

  return (
    <div className={classes.root}>
      <h4>My Portfolio</h4>
      <PortfolioDetail 
        name={state.name} 
        stocks={state.stocks}
        stockstotal={getStocksTotal()}
        sharestotal={getSharesTotal()}
      />
      <PortfolioStockTable
        stocks={state.stocks}
      />
    </div>
  );
};

export default PortfolioProvider;