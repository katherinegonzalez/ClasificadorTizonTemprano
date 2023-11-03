import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { AppContext } from '../../context';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function ResultModal () {

  const {openModal, setOpenModal} = useContext(AppContext);

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Resultado de Clasificación
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Predicted Class: Papa Sana
          </Typography>
          <Typography gutterBottom>
          Class Probabilities:

          Papa Sana: 0.4172878861427307
          Tizón Tardío: 0.2733481824398041
          Tizón Temprano: 0.3093639016151428
          </Typography>
          <Typography gutterBottom>
            Recomendación: 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum est egestas egestas vulputate. Nam fermentum imperdiet ipsum, id congue massa laoreet in. Donec tincidunt quis tellus eget interdum. Integer in mollis tortor. 
          </Typography>
        </DialogContent>
      </BootstrapDialog>
  );
}

export default ResultModal;
