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

function ResultModal ({
  image,
  predictedClass,
  probabilities
}) {

  const {openModal, setOpenModal} = useContext(AppContext);

  const handleClose = () => {
    setOpenModal(false);
  };

  const etiquetas =  {
    0: 'Papa Sana',
    1: 'Tizón Tardío',
    2: 'Tizón Temprano' 
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
          <div className='result_classification-image'>
            <img src={image} alt="default" />
            <br />
            <h3>
            Resultado de la Clasificación: {predictedClass}
            </h3>
          </div>
          <br />
          <h4>Probabilidades:</h4>
          <br />
            <ul>
              {probabilities.map((probability, index) =>
                <li key={probability}> <strong>{etiquetas[index]}:</strong>{probability}</li>
              )}
            </ul>
        </DialogContent>
      </BootstrapDialog>
  );
}

export default ResultModal;
