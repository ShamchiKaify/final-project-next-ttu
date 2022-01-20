/*
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, form, strength, price) {
  return { name, form, strength, price };
}

const rows = [
    createData('Shamin Asfaq', 1234, 27, 'Male'),
    createData('Ms. Tiffany', 5547, 23, 'Female'),
    createData('Ali Akkas', 9984, 53, 'Male'),
    createData('Angelina Jolie', 3624, 34, 'Female'),
    createData('Brad Pitt', 3658, 52, 'Male'),
    createData('Rachel Green', 6363, 28, 'Female')
];

export default function BrandListTable() {
    var server = require('../../host.json');
    var host = server.url_dev;

    useEffect(() => {
        axios.get(`${host}/brand/get_all`).then(res => {
            console.log(res);
        });
    }, []);

    return (
        <TableContainer component={Paper} style={{marginTop: '10px'}}>
            <Typography style={{marginBottom: '10px'}} variant="h4">Appointments Today</Typography>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
                <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Form</StyledTableCell>
                <StyledTableCell align="right">Strength</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                    {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.form}</StyledTableCell>
                    <StyledTableCell align="right">{row.strength}</StyledTableCell>
                    <StyledTableCell align="right">{row.price}</StyledTableCell>
                </StyledTableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    );
}
*/

// --

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Alert } from '@mui/material';


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'brandName', headerName: 'Brand Name', width: 180 },
    { field: 'form', headerName: 'Form', width: 180 },
    { field: 'strength', headerName: 'Strength', width: 180 },
    {
        field: 'price',
        headerName: 'Price',
        // type: 'number',
        width: 130,
    }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function BrandListTable() {
    var server = require('../../host.json');
    var host = server.url_dev;
    var [data, setData] = useState([])
    var [timeTaken, setTimeTaken] = useState(0);

    useEffect(() => {
        var startDate = new Date();
        // Do your operations
        axios.get(`${host}/brand/get_all`).then(res => {
            var foundData = res.data;
            foundData = foundData.map(item => {
                return { ...item, id: item?.brandId };
            });
            setData(foundData);
            var endDate   = new Date();
            var seconds = (endDate.getTime() - startDate.getTime()) / 1000
            setTimeTaken(seconds);
        });
    }, []);
    
    return (
        <div style={{ height: 630, width: '75%', margin: 'auto', marginTop: '10px' }}>
            <Typography style={{ marginBottom: '10px' }} variant="h5">All Brands</Typography>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection={false}
            />
            <Alert style={{ marginTop: '1%' }} severity="info">Time: {timeTaken} seconds</Alert>
        </div>
    );
    
}
