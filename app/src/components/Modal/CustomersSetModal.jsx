import React, { useState, useContext } from 'react';
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

export default function CustomersModal() {

  const {setCustomer, fetchData} = useFirebase()

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Estados para armazenar os valores do formulário
  const [formData, setFormData] = useState({
    id: parseInt(Math.random()*10).toFixed(0),
    name: '',
    email: '',
    phoneNumber: '', // Renomeado de 'celular' para 'phoneNumber'
    cpf: '',
  });

  // Função para lidar com a alteração nos campos do formulário
  const handleInputChange = (event) => {
    const { name, value } = event.target; // Nome corrigido aqui
    setFormData({ ...formData, [name]: value }); // Nome corrigido aqui
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async () => {
    
    await setCustomer(formData).then(async() => {
      await fetchData()
    })

    // Fechar o modal após o envio do formulário
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} variant='contained'>ADD Cliente</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Preencha o formulário
          </Typography>
          {/* Formulário */}
          <form>
            <TextField
              label="Nome"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Número de celular"
              variant="outlined"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="CPF"
              variant="outlined"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Enviar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
