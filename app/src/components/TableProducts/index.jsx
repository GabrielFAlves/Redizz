import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ProductsModal from '../Modal/ProductsSetModal';
import { useFirebase } from '../../context/firebase.context';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'productName', headerName: 'Nome', width: 150, editable: true },
  { field: 'category', headerName: 'Categoria', width: 150, editable: true },
  { field: 'value', headerName: 'Valor', type: 'number', width: 110, editable: true },
  { field: 'quantity', headerName: 'Quantidade', type: 'number', width: 110, editable: true }
];

export function TableProducts() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [rows, setRows] = useState([]);
  const { getProducts, deleteProduct } = useFirebase();

  async function fetchData() {
    const products = await getProducts();
    setRows(products);
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
    await deleteProduct(selectedRows)
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
      <ProductsModal/>
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
