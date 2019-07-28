import React from 'react';
import { Doughnut, HorizontalBar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import colorScheme from '../../common/components/color-scheme';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  chart: {
    width: '45%',
  }
});

const StockCharts = (props) => {
  const classes = useStyles();

  const generateColorScheme = (data) => {
    const colors = data.map(d => colorScheme[data.indexOf(d)]);
    return colors;
  }

  return (
    <div className={classes.root}>
      <div className={classes.chart}>
        <Doughnut
          data={
            {
              datasets: [{ data: props.myStocksData.data, backgroundColor: generateColorScheme(props.myStocksData.data), borderColor: 'black' }],
              labels: props.myStocksData.labels,
            }
          }
          height={250}
          width={200}
          options={
            {
              maintainAspectRatio: false,
              title: {
                text: 'Portfolio Makeup',
                display: true,
                fontColor: '#d5d6d7',
              },
              legend: {
                labels: {
                  fontColor: '#d5d6d7',
                },
              },
            }
          }
        />
      </div>
      <div className={classes.chart}>
        <HorizontalBar
          data={
            {
              datasets: [{ data: props.topFiveData.data, backgroundColor: generateColorScheme(props.topFiveData.data), borderColor: '#1e272e' }],
              labels: props.topFiveData.labels,
            }
          }
          height={250}
          width={200}
          options={
            {
              maintainAspectRatio: false,
              title: {
                text: 'Top 5 Picks',
                display: true,
                fontColor: '#d5d6d7',
              },
              legend: {
                display: false,
              },
              scales: {
                scaleLabel: {
                  fontColor: '#d5d6d7',
                },
              },
            }
          }
        />
      </div>
    </div>
  );
};

export default StockCharts;
