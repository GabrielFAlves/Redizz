import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

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

export default function ProductsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Estados para armazenar os valores do formulário
  const [formData, setFormData] = React.useState({
    productName: '',
    category: '',
    value: '',
    quantity: '',
  });

  // Função para lidar com a alteração nos campos do formulário
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = () => {
    // Aqui você pode realizar a lógica necessária com os dados do formulário
    console.log('Formulário enviado:', formData);

    // Fechar o modal após o envio do formulário
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} variant='contained'>ADD Produto</Button>
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
              label="Nome do Produto"
              variant="outlined"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Categoria"
              variant="outlined"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Valor"
              type="number"
              variant="outlined"
              name="value"
              value={formData.value}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Quantidade"
              type="number"
              variant="outlined"
              name="quantity"
              value={formData.quantity}
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
