import React, { useContext } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { AppContext } from '../../context';


function ToastMessage() {

  const { showMessage, setShowMessage, messageType, message } = useContext(AppContext);

  
  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowMessage(false);
  };

  return (
      <Snackbar open={showMessage} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity={messageType} sx={{ width: '100%' }}>
          {message ? message : 'Ocurrió un error! Vuelva a intentarlo.'}
        </Alert>
      </Snackbar>
  );
}


export default ToastMessage;