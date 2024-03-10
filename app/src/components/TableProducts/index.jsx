import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nome',
    headerName: 'Nome',
    width: 150,
    editable: true,
  },
  {
    field: 'categoria',
    headerName: 'Categoria',
    width: 150,
    editable: true,
  },
  {
    field: 'valor',
    headerName: 'Valor',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'qtdEstoque',
    headerName: 'Quantidade',
    type: 'number',
    width: 110,
    editable: true,
  }
];

const rows = [
  { id: 1, nome: 'Caneta', categoria: 'Material escolar', valor: 14 , qtdEstoque: '5'},
  { id: 2, nome: 'Borracha', categoria: 'Material escolar', valor: 31 , qtdEstoque: '5'},
  { id: 3, nome: 'Caderno', categoria: 'Material escolar', valor: 31 , qtdEstoque: '5'},
  { id: 4, nome: 'Apostila', categoria: 'Material escolar', valor: 11 , qtdEstoque: '5'},
  { id: 5, nome: 'Celular', categoria: 'Eletrônico', valor: 1300 , qtdEstoque: '5'}
];

export function TableProducts() {
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