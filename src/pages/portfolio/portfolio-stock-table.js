import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, makeStyles, TablePagination, TableFooter } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: 30,
    backgroundColor: '#384047',
    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
    borderRadius: 4,
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

  return (
    <div className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tdStyles}>Name</TableCell>
            <TableCell className={classes.tdStyles}>Price</TableCell>
            <TableCell className={classes.tdStyles}>Shares Owned</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.stocks.map(stock => {
              return (
                <TableRow key={stock.symbol}>
                  <TableCell className={classes.tdStyles}>{stock.symbol}</TableCell>
                  <TableCell className={classes.tdStyles}>${stock.price}</TableCell>
                  <TableCell className={classes.tdStyles}>{stock.shares}</TableCell>
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
    </div>
  );
};

export default PortfolioStockTable;