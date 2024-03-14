import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ProductsModal from '../Modal/ProductsSetModal';
import { useFirebase } from '../../context/firebase.context';
import {ProductUpdateModal} from '../Modal/ProductUpdateModal'

export function TableProducts() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const [selectedProductId, setSelectedProductId] = useState(null);
  const { getProducts, deleteProduct, updateProduct, rows, setRows, fetchDataProducts } = useFirebase();

  const handleOpenUpdateModal = (productId) => {
    setSelectedProductId(productId);
  };

  useEffect(() => {
    fetchDataProducts();
  }, []); 

  const handleDeleteSelected = async () => {
    await deleteProduct(selectedRows).then(async() => {
      await fetchDataProducts()
    })
    console.log("Linhas selecionadas:", selectedRows);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'productName', headerName: 'Produto', width: 150 },
    { field: 'category', headerName: 'Categoria', width: 150 },
    { field: 'value', headerName: 'Valor', width: 110 },
    { field: 'quantity', headerName: 'Quantidade', width: 110 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            event.stopPropagation(); // Prevents row selection
            handleOpenUpdateModal(params.row.id);
          }}
        >
          Update
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
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
      {selectedProductId && (
        <ProductUpdateModal
          key={selectedProductId}
          product={rows.find((row) => row.id === selectedProductId)}
          updateProduct={updateProduct}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </Box>
  );
}
