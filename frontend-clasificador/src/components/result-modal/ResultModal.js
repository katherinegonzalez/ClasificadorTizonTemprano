import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { Box, CardMedia } from '@mui/material';

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
    0: 'Probabilidad de que la hoja sea de una Papa Sana es de: ',
    1: 'Probabilidad de que la hoja tenga Tizón Tardío es de: ',
    2: 'Probabilidad de que la hoja tenga Tizón Temprano es de: ' 
  };

  console.log('probabilities');
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
        <DialogContent dividers >
         
          <Box sx={{
            py: 2,
            px: 4
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}>
            <CardMedia
              component="img"
              sx={{ width: 220, height: 220, borderRadius: '5px' }}
              image={image}
              alt={'default'}
            />
            <Typography variant="h5" align="center" sx= {{ m: 2}}>
              {predictedClass}
            </Typography>
            </Box>
            <Typography  sx= {{ m: 2}}>
              Nuestro sistema de inteligencia artificial ha evaluado la imagen de la hoja y ha determinado el resultado basándose en el porcentaje más alto. 
            </Typography>
            <Typography  sx= {{ m: 2}}>
              Aquí está la clasificación resultante:
            </Typography>

            {probabilities.map((probability, index) =>
              <Typography  key={probability} sx= {{ m: 2}}>
              <strong>{etiquetas[index]}</strong>{`${(probability*100).toFixed(2)}%`}
              </Typography>
            )}
          </Box>
        </DialogContent>
      </BootstrapDialog>
  );
}

export default ResultModal;
