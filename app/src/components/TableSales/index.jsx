import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import SalesModal from '../Modal/SalesModal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'cliente', headerName: 'Cliente', width: 150, editable: true },
  { field: 'produto', headerName: 'Produto', width: 150, editable: true },
  { field: 'data', headerName: 'Data', width: 110, editable: true },
  { field: 'valorTotal', headerName: 'Valor total', width: 110, editable: true },
];

const rows = [
  { id: 1, cliente: 'Gabriel', produto: 'Caneta', data: '23/11/2023', valorTotal: 1200 },
  { id: 2, cliente: 'Thiago', produto: 'Caneta', data: '24/11/2023', valorTotal: 1300 },
  { id: 3, cliente: 'Victor', produto: 'Caneta', data: '23/11/2023', valorTotal: 1900 },
  { id: 4, cliente: 'Mangeli', produto: 'Caneta', data: '22/11/2023', valorTotal: 1500 },
  { id: 5, cliente: 'Talita', produto: 'Caneta', data: '23/11/2023', valorTotal: 1500 },
];

export function TableSales() {
  const [searchValue, setSearchValue] = useState('');
  const [rowsState, setRows] = useState(rows);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    const filteredRows = rows.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    setRows(filteredRows);
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <TextField
        label="Search"
        value={searchValue}
        onChange={handleSearchChange}
        variant="outlined"
        margin="normal"
      />
      <SalesModal/>
      <Button variant="contained">
        Delete Selected
      </Button>
      <DataGrid
        rows={rowsState}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
