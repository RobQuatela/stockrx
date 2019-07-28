import React from 'react';
import { Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import * as numeral from 'numeral';

const SelectedStockFinancials = (props) => {

  const formatRoundedMoneyInMillions = (value) => `$${numeral((value / 1000000)).format('(0,0)')}`;
  const formatMoney = (value) => `$${numeral(value).format('0,0.00')}`;
  const formatPercent = (value) => `${numeral(value * 100).format('0,0.0')}%`;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align='right'>Metric</TableCell>
          <TableCell align='right'>{props.financials[0].date}</TableCell>
          <TableCell align='right'>{props.financials[1].date}</TableCell>
          <TableCell align='right'>{props.financials[2].date}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell align='right'>Revenue (in millions)</TableCell>
          <TableCell align='right'>{formatRoundedMoneyInMillions(props.financials[0].Revenue)}</TableCell>
          <TableCell align='right'>{formatRoundedMoneyInMillions(props.financials[1].Revenue)}</TableCell>
          <TableCell align='right'>{formatRoundedMoneyInMillions(props.financials[2].Revenue)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align='right'>Revenue Growth</TableCell>
          <TableCell align='right'>{formatPercent(props.financials[0]['Revenue Growth'])}</TableCell>
          <TableCell align='right'>{formatPercent(props.financials[1]['Revenue Growth'])}</TableCell>
          <TableCell align='right'>{formatPercent(props.financials[2]['Revenue Growth'])}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align='right'>Gross Margin</TableCell>
          <TableCell align='right'>{formatPercent(props.financials[0]['Gross Margin'])}</TableCell>
          <TableCell align='right'>{formatPercent(props.financials[1]['Gross Margin'])}</TableCell>
          <TableCell align='right'>{formatPercent(props.financials[2]['Gross Margin'])}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align='right'>Net Profit Margin</TableCell>
          <TableCell align='right'>{formatPercent(props.financials[0]['Net Profit Margin'])}</TableCell>
          <TableCell align='right'>{formatPercent(props.financials[1]['Net Profit Margin'])}</TableCell>
          <TableCell align='right'>{formatPercent(props.financials[2]['Net Profit Margin'])}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align='right'>Earnings per Share</TableCell>
          <TableCell align='right'>{formatMoney(props.financials[0]['EPS'])}</TableCell>
          <TableCell align='right'>{formatMoney(props.financials[1]['EPS'])}</TableCell>
          <TableCell align='right'>{formatMoney(props.financials[2]['EPS'])}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align='right'>Dividend per Share</TableCell>
          <TableCell align='right'>{formatMoney(props.financials[0]['Dividend per Share'])}</TableCell>
          <TableCell align='right'>{formatMoney(props.financials[1]['Dividend per Share'])}</TableCell>
          <TableCell align='right'>{formatMoney(props.financials[2]['Dividend per Share'])}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default SelectedStockFinancials;