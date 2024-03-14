import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import SalesModal from '../Modal/SalesSetModal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFirebase } from '../../context/firebase.context';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'clientName', headerName: 'Cliente', width: 150, editable: true },
  { field: 'productName', headerName: 'Produto', width: 150, editable: true },
  { field: 'date', headerName: 'Data', width: 110, editable: true },
  { field: 'totalAmount', headerName: 'Valor total', width: 110, editable: true },
];

export function TableSales() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [rows, setRows] = useState([]);
  const { getSales, deleteSale } = useFirebase();

  async function fetchData() {
    const sales = await getSales();
    setRows(sales);
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    const filteredRows = rows.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    setRows(filteredRows);
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const handleDeleteSelected = async () => {
    await deleteSale(selectedRows)
    console.log("Linhas selecionadas:", selectedRows);
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
      <Button variant="contained" onClick={handleDeleteSelected}>
        Delete Selected
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick // Use essa propriedade ao invés de disableRowSelectionOnClick
        onRowSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
          console.log(newSelection);
        }}
      />
    </Box>
  );
}
