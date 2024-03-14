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

export default function CustomerUpdateModal({ customer, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        cpf: ''
    });

    // Use o hook useFirebase para acessar a função updateCustomer
    const { updateCustomer, fetchData } = useFirebase();
    
    useEffect(() => {
        if (customer) {
            setFormData({
                name: customer.name,
                email: customer.email,
                phoneNumber: customer.phoneNumber,
                cpf: customer.cpf
            });
        }
    }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        await updateCustomer(customer.id, formData).then(async() => {
          await fetchData()
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
                    Update Customer
                </Typography>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="CPF"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </Box>
        </Modal>
    );
}
