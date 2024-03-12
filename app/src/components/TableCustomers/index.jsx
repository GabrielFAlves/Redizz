import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CustomersModal from '../Modal/CustomersModal';
import Button from '@mui/material/Button';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'nome', headerName: 'Name', width: 150, editable: true },
  { field: 'email', headerName: 'Email', width: 150, editable: true },
  { field: 'celular', headerName: 'Celular', width: 110, editable: true },
  { field: 'cpf', headerName: 'CPF', width: 110, editable: true },
];

const initialRows = [
  { id: 1, nome: 'Gabriel', email: 'Gabriel@gmail.com', celular: 111111111, cpf: 172 },
  { id: 2, nome: 'Guilherme', email: 'Guilherme@gmail.com', celular: 22222222, cpf: 145 },
  { id: 3, nome: 'Paulo', email: 'Paulo@gmail.com', celular: 333333333, cpf: 134 },
  { id: 4, nome: 'Magal', email: 'Magal@gmail.com', celular: 444444444, cpf: 175 },
  { id: 5, nome: 'Mangeli', email: 'Mangeli@gmail.com', celular: 555555555, cpf: 196 },
];

export function TableCustomers() {
  const [rows, setRows] = useState(initialRows);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection.selectionModel);
  };

  const handleDeleteSelected = () => {
    const updatedRows = rows.filter((row) => !selectedRows.includes(row.id));
    setRows(updatedRows);
    setSelectedRows([]);
  };

  const handleUpdate = (id, updatedData) => {
    const updatedRows = rows.map((row) => (row.id === id ? { ...row, ...updatedData } : row));
    setRows(updatedRows);
  };

  const handleRead = () => {
    // Perform read operation if needed
    console.log('Reading data:', rows);
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <CustomersModal
        onDelete={handleDeleteSelected}
        onUpdate={handleUpdate}
        onRead={handleRead}
      />
      <Button variant="contained" onClick={handleDeleteSelected}>
        Delete Selected
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
        onSelectionModelChange={handleSelectionChange}
      />
    </Box>
  );
}
