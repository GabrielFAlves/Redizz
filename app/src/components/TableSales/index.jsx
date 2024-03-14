import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import SalesModal from '../Modal/SalesSetModal';
import Button from '@mui/material/Button';
import { useFirebase } from '../../context/firebase.context';
import {SaleUpdateModal} from '../Modal/SaleUpdateModal'

export function TableSales() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const [selectedSaleId, setSelectedSaleId] = useState(null);
  const { getSales, deleteSale, updateSale, rows, setRows, fetchDataSales } = useFirebase();

  const handleOpenUpdateModal = (saleId) => {
    setSelectedSaleId(saleId);
  };

  useEffect(() => {
    fetchDataSales();
  }, []); 

  const handleDeleteSelected = async () => {
    await deleteSale(selectedRows).then(async() => {
      await fetchDataSales()
    })
    console.log("Linhas selecionadas:", selectedRows);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'clientName', headerName: 'Cliente', width: 150 },
    { field: 'productName', headerName: 'Produto', width: 150 },
    { field: 'date', headerName: 'Data', width: 110 },
    { field: 'totalAmount', headerName: 'Quantidade', width: 110 },
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
      <SalesModal />
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
      {selectedSaleId && (
        <SaleUpdateModal
          key={selectedSaleId}
          sale={rows.find((row) => row.id === selectedSaleId)}
          updateSale={updateSale}
          onClose={() => setSelectedSaleId(null)}
        />
      )}
    </Box>
  );
}
