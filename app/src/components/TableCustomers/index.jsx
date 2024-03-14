import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CustomersModal from '../Modal/CustomersSetModal';
import Button from '@mui/material/Button';
import { useFirebase } from '../../context/firebase.context';
import CustomerUpdateModal from '../Modal/CustomerUpdateModal';

export function TableCustomers() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const { getCustomers, deleteCustomer, updateCustomer, rows, setRows, fetchData } = useFirebase();
  
  const handleOpenUpdateModal = (customerId) => {
    setSelectedCustomerId(customerId);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteSelected = async () => {
    await deleteCustomer(selectedRows).then(async() => {
      await fetchData()
    })
    console.log("Linhas selecionadas:", selectedRows);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phoneNumber', headerName: 'Celular', width: 110 },
    { field: 'cpf', headerName: 'CPF', width: 110 },
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
      <CustomersModal />
      <Button variant="contained" onClick={handleDeleteSelected}>
        Delete Selected
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        onRowSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
          console.log(newSelection);
        }}
      />
      {selectedCustomerId && (
        <CustomerUpdateModal
          key={selectedCustomerId}
          customer={rows.find((row) => row.id === selectedCustomerId)}
          updateCustomer={updateCustomer}
          onClose={() => setSelectedCustomerId(null)}
        />
      )}
    </Box>
  );
}
