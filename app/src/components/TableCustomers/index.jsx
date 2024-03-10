import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nome',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    editable: true,
  },
  {
    field: 'celular',
    headerName: 'Celular',
    width: 110,
    editable: true,
  },
  {
    field: 'cpf',
    headerName: 'CPF',
    width: 110,
    editable: true,
  },
];

const rows = [
  { id: 1, nome: 'Gabriel', email: 'Gabriel@gmail.com', celular: 111111111, cpf: 172 },
  { id: 2, nome: 'Guilherme', email: 'Guilherme@gmail.com', celular: 22222222, cpf: 145 },
  { id: 3, nome: 'Paulo', email: 'Paulo@gmail.com', celular: 333333333, cpf: 134 },
  { id: 4, nome: 'Magal', email: 'Magal@gmail.com', celular: 444444444, cpf: 175 },
  { id: 5, nome: 'Mangeli', email: 'Mangeli@gmail.com', celular: 555555555, cpf: 196 },
];

export function TableCustomers() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
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