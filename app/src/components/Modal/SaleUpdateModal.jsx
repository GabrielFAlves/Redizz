import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useFirebase } from '../../context/firebase.context';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function SaleUpdateModal({ sale, onClose }) {
    const [formData, setFormData] = useState({
        clientName: '',
        productName: '',
        date: '',
        totalAmount: ''
    });

    // Use o hook useFirebase para acessar a função updateCustomer
    const { updateSale, fetchDataSales } = useFirebase();
    
    useEffect(() => {
        if (sale) {
            setFormData({
                clientName: sale.clientName,
                productName: sale.productName,
                date: sale.date,
                totalAmount: sale.totalAmount
            });
        }
    }, [sale]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        await updateSale(sale.id, formData).then(async() => {
          await fetchDataSales()
        })
        onClose();
    };

    return (
        <Modal
            open={true}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Update Sale
                </Typography>
                <TextField
                    label="Name"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Produto"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Data"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Valor Total"
                    name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </Box>
        </Modal>
    );
}
