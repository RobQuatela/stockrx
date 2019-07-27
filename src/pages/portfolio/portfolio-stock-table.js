import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, makeStyles, TablePagination, TableFooter, Paper } from '@material-ui/core';
import * as numeral from 'numeral';

const useStyles = makeStyles({
  root: {
    margin: 30,
    backgroundColor: '#384047',
  },
  tdStyles: {
    color: '#fff',
    borderBottom: '1px solid #1e272e',
  },
});

const PortfolioStockTable = (props) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const formatMoney = (value) => `$${numeral(value).format('(0,0.00)')}`;

  return (
    <Paper elevation={2} classes={{ root: classes.root }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tdStyles}>Name</TableCell>
            <TableCell className={classes.tdStyles}>Price</TableCell>
            <TableCell className={classes.tdStyles}>Shares Owned</TableCell>
            <TableCell className={classes.tdStyles}>Valuation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.stocks.map(stock => {
              return (
                <TableRow key={stock.symbol}>
                  <TableCell className={classes.tdStyles}>{stock.symbol}</TableCell>
                  <TableCell className={classes.tdStyles}>{formatMoney(stock.price)}</TableCell>
                  <TableCell className={classes.tdStyles}>{stock.shares}</TableCell>
                  <TableCell className={classes.tdStyles}>{formatMoney(stock.price * stock.shares)}</TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              rowsPerPage={rowsPerPage}
              count={props.stocks.length}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
};

export default PortfolioStockTable;