import React from 'react';
import { Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import * as numeral from 'numeral';

const SelectedStockFinancials = (props) => {

  const formatValue = (value) => `$${numeral((value / 1000000)).format('(0,0)')}`;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align='right'>Metric (in millions)</TableCell>
          <TableCell align='right'>{props.financials[0].date}</TableCell>
          <TableCell align='right'>{props.financials[1].date}</TableCell>
          <TableCell align='right'>{props.financials[2].date}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell align='right'>Revenue</TableCell>
          <TableCell align='right'>{formatValue(props.financials[0].Revenue)}</TableCell>
          <TableCell align='right'>{formatValue(props.financials[1].Revenue)}</TableCell>
          <TableCell align='right'>{formatValue(props.financials[2].Revenue)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align='right'>Cost of Revenue</TableCell>
          <TableCell align='right'>{formatValue(props.financials[0]['Cost of Revenue'])}</TableCell>
          <TableCell align='right'>{formatValue(props.financials[1]['Cost of Revenue'])}</TableCell>
          <TableCell align='right'>{formatValue(props.financials[2]['Cost of Revenue'])}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align='right'>Gross Profit</TableCell>
          <TableCell align='right'>{formatValue(props.financials[0]['Gross Profit'])}</TableCell>
          <TableCell align='right'>{formatValue(props.financials[1]['Gross Profit'])}</TableCell>
          <TableCell align='right'>{formatValue(props.financials[2]['Gross Profit'])}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align='right'>Operating Expenses</TableCell>
          <TableCell align='right'>{formatValue(props.financials[0]['Operating Expenses'])}</TableCell>
          <TableCell align='right'>{formatValue(props.financials[1]['Operating Expenses'])}</TableCell>
          <TableCell align='right'>{formatValue(props.financials[2]['Operating Expenses'])}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align='right'>Operating Income</TableCell>
          <TableCell align='right'>{formatValue(props.financials[0]['Operating Income'])}</TableCell>
          <TableCell align='right'>{formatValue(props.financials[1]['Operating Income'])}</TableCell>
          <TableCell align='right'>{formatValue(props.financials[2]['Operating Income'])}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align='right'>R&D Expenses</TableCell>
          <TableCell align='right'>{formatValue(props.financials[0]['R&D Expenses'])}</TableCell>
          <TableCell align='right'>{formatValue(props.financials[1]['R&D Expenses'])}</TableCell>
          <TableCell align='right'>{formatValue(props.financials[2]['R&D Expenses'])}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align='right'>SG&A Expenses</TableCell>
          <TableCell align='right'>{formatValue(props.financials[0]['SG&A Expense'])}</TableCell>
          <TableCell align='right'>{formatValue(props.financials[1]['SG&A Expense'])}</TableCell>
          <TableCell align='right'>{formatValue(props.financials[2]['SG&A Expense'])}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align='right'>Net Income</TableCell>
          <TableCell align='right'>{formatValue(props.financials[0]['Net Income'])}</TableCell>
          <TableCell align='right'>{formatValue(props.financials[1]['Net Income'])}</TableCell>
          <TableCell align='right'>{formatValue(props.financials[2]['Net Income'])}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default SelectedStockFinancials;