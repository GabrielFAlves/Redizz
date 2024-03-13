import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CustomersModal from '../Modal/CustomersModal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFirebase } from '../../context/firebase.context';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150, editable: true },
  { field: 'email', headerName: 'Email', width: 150, editable: true },
  { field: 'phoneNumber', headerName: 'Celular', width: 110, editable: true },
  { field: 'cpf', headerName: 'CPF', width: 110, editable: true },
];

export function TableCustomers() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [rows, setRows] = useState([]);
  const { getCustomers, deleteCustomer } = useFirebase();

  async function fetchData() {
    const customers = await getCustomers();
    setRows(customers);
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
    await deleteCustomer(selectedRows)
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
      <CustomersModal/>
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
