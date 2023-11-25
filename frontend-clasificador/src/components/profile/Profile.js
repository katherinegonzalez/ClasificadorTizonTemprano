import React, { useState, useContext, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Avatar, Box, CircularProgress, Container, InputAdornment, Stack, TextField } from '@mui/material';
import { AppContext } from '../../context';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { getSessionID, getUserID } from '../auth/session';
import Copyright from '../copy-right/CopyRight';

function Profile() {

  const {isAuth} = useContext(AppContext);
  const [userData, setUserData ] = useState({});
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
  
    const getUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/user?id=${getUserID()}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${getSessionID()}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });
        const result = await response.json();
        setUserData(result.user); 
        setLoading(false);
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setLoading(false);
      }
    };
    
    if (isAuth) {
      getUser();
    }
  }, []);

  return (
    <>
    <main 
      style={{ 
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
      }}>

      { !loading && 
        <Container 
          sx={{ 
            py: 8,
            flex: 1
          }} 
          maxWidth="md">
            <Grid item xs={12} md={6} justifyContent="center" alignItems="center">
              <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flexGrow: 2, display: 'flex', justifyContent: 'center' }}>
                  <Avatar sx= {{width: 100, height: 100}}>{userData.name.charAt(0)}</Avatar>
                </CardContent>

              <CardContent sx={{ flexGrow: 3 }}>
                <Typography variant="h5" paragraph>
                  Perfil de Experto
                </Typography>

                <Box sx={{ '& > :not(style)': { m: 2 } }}>
                  <Stack direction="row" spacing={2}>

                  <TextField
                    id="input-with-icon-textfield"
                    fullWidth
                    label="Nombre"
                    value={userData.name}
                    disabled={true}
                    className='profile-text-field'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                    <TextField
                      id="input-with-icon-textfield"
                      fullWidth
                      disabled={true}
                      className='profile-text-field'
                      label="Apellido"
                      value={userData.lastname}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                    />
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      id="input-with-icon-textfield"
                      fullWidth
                      disabled={true}
                      className='profile-text-field'
                      label="Ocupación"
                      value={userData.occupation}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                    />
                    <TextField
                      id="input-with-icon-textfield"
                      fullWidth
                      disabled={true}
                      className='profile-text-field'
                      label="Email"
                      value={userData.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                    />
                  </Stack>
                </Box>  
            </CardContent>
          </Card>
      </Grid>
    </Container>
  }
  { loading && 
    <CardContent sx={{ 
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center'}}>
      <CircularProgress/>
    </CardContent> 
  }
  <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
    <Copyright />
  </Box>
</main>
</>
);
}


export default Profile;