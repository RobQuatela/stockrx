import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

const StockCharts = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Doughnut
        data={props.data}
        height={10}
        width={50}
      />
    </div>
  );
};

export default StockCharts;
