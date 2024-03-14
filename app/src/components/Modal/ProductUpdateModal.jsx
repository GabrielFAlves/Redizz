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

export function ProductUpdateModal({ product, onClose }) {
    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        value: '',
        quantity: ''
    });

    // Use o hook useFirebase para acessar a função updateCustomer
    const { updateProduct, fetchDataProducts } = useFirebase();
    
    useEffect(() => {
        if (product) {
            setFormData({
                productName: product.productName,
                category: product.category,
                value: product.value,
                quantity: product.quantity
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        await updateProduct(product.id, formData).then(async() => {
          await fetchDataProducts()
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
                    Update Product
                </Typography>
                <TextField
                    label="Produto"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Categoria"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Valor"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Quantidade"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </Box>
        </Modal>
    );
}
