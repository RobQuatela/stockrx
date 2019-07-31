import React, { useState, useEffect } from 'react';
import StockList from './stock-list';
import * as availableStocksStore from '../../common/stores/available-stocks-store';
import * as portfolioStore from '../../common/stores/portfolio-store';
import * as selectedStocksStore from '../../common/stores/selected-stocks-store';
import StockCharts from './stock-charts';
import { makeStyles } from '@material-ui/styles';
import { Tabs, Tab, Typography } from '@material-ui/core';
import SelectedStock from './selected-stock';
import StocksError from './stocks-error';

const useStyles = makeStyles({
  stocksProvider: {
    margin: 30,
    '& h2': {
      marginBottom: 20,
    }
  },
  tabStyles: {
    color: 'white',
  },
  tabPanel: {
    margin: 20,
  },
});



const StocksProvider = () => {
  const classes = useStyles();
  const [availableStocksState, setAvilableStocksState] = useState({
    loading: true,
    stocks: [],
    error: false,
  });
  const [topFiveStockPicks, setTopFiveStockPicks] = useState([]);
  const [myStocks, setMyStocks] = useState([]);
  const [tab, setTab] = useState(0);
  const [selectedStocksState, setSelectedStocksState] = useState({
    stocks: [],
    loading: false,
  });

  // this effect is for creating subscriptions to the store
  useEffect(() => {
    const subscriptions = [];
    // subscribe to stocks with shares owned in order to fill up the stock list
    subscriptions.push(availableStocksStore.availableStocksStateWithSharesOwned$.subscribe(state => setAvilableStocksState(state)));

    // subscribe to best performing stocks observable to push down to horizontal bar graph
    subscriptions.push(availableStocksStore.bestPerformingStocks$.subscribe(stocks => setTopFiveStockPicks(stocks)));

    // subscribe to portfolio to push down to doughnut chart
    subscriptions.push(portfolioStore.portfolio$.subscribe(portfolioState => setMyStocks(portfolioState.stocks)));

    // subscribe to selected stocks to handle tabs of selected stocks
    subscriptions.push(selectedStocksStore.selectedStocks$.subscribe(state => setSelectedStocksState(state)));

    selectedStocksStore.selectedStocks1$.subscribe(x => console.log(x));
    // unsubscribe all subscriptions when component unmounts
    return () => subscriptions.forEach(subscription => subscription.unsubscribe());
  }, []);

  const removeSelectedStock = (stock) => {
    selectedStocksStore.actions.remove(stock);
    setTab(0);
  }

  const handleTabChange = (event, newValue) => setTab(newValue);

  const TabPanel = (props) => {
    return (
      <Typography
        component='div'
        role='tabpanel'
        hidden={props.value !== props.index}
        className={classes.tabPanel}
        id={props.index}
      >
        {props.children}
      </Typography>
    )
  }

  // react to error object inside of available stock state
  // if there is an error, render the StocksError component instead of the StockList
  const loadStockList = () => {
    if (!availableStocksState.error) {
      return (
        <StockList
          loading={availableStocksState.loading}
          selectedStockLoading={selectedStocksState.loading}
          stocks={availableStocksState.stocks}
        />
      )
    } else {
      return (
        <StocksError />
      );
    }
  }

  return (
    <div className={classes.stocksProvider}>
      <Tabs value={tab} onChange={handleTabChange} classes={{ root: classes.tabStyles }}>
        <Tab label='Stock Exchange' id={0} />
        {
          selectedStocksState.stocks.map((value, index) => (
            <Tab label={value.stockInfo.symbol} id={index + 1} key={value.stockInfo.symbol} />
          ))
        }
      </Tabs>
      <TabPanel value={tab} index={0}>
        <StockCharts
          topFiveData={{ data: topFiveStockPicks.map(x => x.price), labels: topFiveStockPicks.map(x => x.symbol) }}
          myStocksData={{ data: myStocks.map(x => x.price * x.shares), labels: myStocks.map(x => x.symbol) }}
        />
        <h4>Stocks</h4>
        { loadStockList() }
      </TabPanel>
      {
        selectedStocksState.stocks.map((value, index) => (
          <TabPanel value={tab} index={index + 1} key={value.stockInfo.symbol}>
            <SelectedStock stock={value} onremovestock={removeSelectedStock} />
          </TabPanel>
        ))
      }
    </div>
  );
};

export default StocksProvider;