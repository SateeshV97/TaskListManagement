import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const TabularView = (props)=> {
    const {rows = []} = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, fontFamily : 'Comic Sans MS", "Comic Sans' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align='center'>Type</TableCell>
            <TableCell>Joke</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
         sx={{
            '& .MuiTableCell-root': {
              //width: `calc(100%/${(rows).length + 1})`,
             // padding: '5px 0px 5px 5px',
            },
          }}
        >
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{row.category}</TableCell>
              <TableCell align='center'>{row.type}</TableCell>
              <TableCell>{row.joke}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default TabularView;
