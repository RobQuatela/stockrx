import React, { useEffect, useState } from 'react';
import * as portfolioService from '../../common/services/portfolio-service';

const PortfolioProvider = () => {
  const [state, setState] = useState({
    wallet: 0,
    stocks: [],
  }); 

  useEffect(() => {
    portfolioService.portfolio$.subscribe(portfolioState => {
      setState({
        wallet: portfolioState.wallet,
        stocks: portfolioState.stocks,
      });
    });
  }, []);

  return (
    <div>{state.wallet}</div>
  );
};

export default PortfolioProvider;