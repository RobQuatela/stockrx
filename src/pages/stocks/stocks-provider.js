import React, { useState, useEffect } from 'react';
import StockList from './stock-list';
import * as stocksStore from '../../common/stores/stocks-store';
import * as portfolioStore from '../../common/stores/portfolio-store';
import * as selectedStocksStore from '../../common/stores/selected-stocks-store';
import StockCharts from './stock-charts';
import { makeStyles } from '@material-ui/styles';
import { Tabs, Tab, Typography } from '@material-ui/core';
import SelectedStock from './selected-stock';

const useStyles = makeStyles({
  stocksProvider: {
    margin: 30,
    '& h2': {
      marginBottom: 20,
    }
  },
  tabStyles: {
    color: 'white',
  }
});

const TabPanel = (props) => {
  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={props.value !== props.index}
      id={props.index}
    >
      {props.children}
    </Typography>
  )
}

const StocksProvider = () => {
  const classes = useStyles();
  const [availableStocksState, setAvilableStocksState] = useState({
    loading: true,
    stocks: [],
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
    subscriptions.push(stocksStore.stocksStateWithSharesOwned$.subscribe(stockStoreState => {
      setAvilableStocksState({
        loading: stockStoreState.loading,
        stocks: stockStoreState.stocks,
      });
    }));

    // subscribe to best performing stocks observable to push down to horizontal bar graph
    subscriptions.push(stocksStore.bestPerformingStocks$.subscribe(stocks => {
      setTopFiveStockPicks(stocks);
    }));

    // subscribe to portfolio to push down to doughnut chart
    subscriptions.push(portfolioStore.portfolio$.subscribe(portfolioState => {
      setMyStocks(portfolioState.stocks);
    }));

    // subscribe to selected stocks to handle tabs of selected stocks
    subscriptions.push(selectedStocksStore.selectedStocks$.subscribe(state => {
      setSelectedStocksState({
        stocks: state.stocks,
        loading: state.loading,
      });
    }));

    // unsubscribe all subscriptions when component unmounts
    return () => subscriptions.forEach(subscription => subscription.unsubscribe());
  }, []);

  const handleBuyStock = (stock) => {
    portfolioStore.actions.buyStock(stock);
  }

  const handleSellStock = (stock) => {
    portfolioStore.actions.sellStock(stock);
  }

  const handleSelectStock = (stock) => {
    selectedStocksStore.actions.select(stock);
  }

  const handleRemoveSelectedStock = (stock) => {
    selectedStocksStore.actions.remove(stock);
    setTab(0);
  }

  const handleTabChange = (event, newValue) => setTab(newValue);

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
        <StockList
          loading={availableStocksState.loading}
          selectedStockLoading={selectedStocksState.loading}
          stocks={availableStocksState.stocks}
          handleBuyStock={handleBuyStock}
          handleSellStock={handleSellStock}
          handleSelectStock={handleSelectStock}
        />
      </TabPanel>
      {
        selectedStocksState.stocks.map((value, index) => (
          <TabPanel value={tab} index={index + 1} key={value.stockInfo.symbol}>
            <SelectedStock stock={value} onremovestock={handleRemoveSelectedStock} />
          </TabPanel>
        ))
      }
    </div>
  );
};

export default StocksProvider;