import React, { useContext } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { AppContext } from '../../context';


function Error() {

  const {showError, setShowError} = useContext(AppContext);

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowError(false);
  };

  return (
      <Snackbar open={showError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          Ocurrió un error! Vuelva a intentarlo.
        </Alert>
      </Snackbar>
  );
}


export default Error;