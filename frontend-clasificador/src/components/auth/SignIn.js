import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { setSessionID } from './session';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { AppContext } from '../../context';
import { Link as LinkRoute} from "react-router-dom";


function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const {isAuth, setIsAuth} = useContext(AppContext);
  
  const navigate = useNavigate();

  
  const [rememberMe, setRememberMe] = useState(false);
  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    console.log('remember:', event.target.elements);
    const formData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    console.log(formData);

    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      body:  JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json', // Establece el tipo de contenido como JSON
      },
    })
    .then(response => response.json()) 
    .then(response => {
      console.log(response);
      setLoading(false);
      setSessionID(response.token, rememberMe);
      setIsAuth(true);
      navigate('/validacion-experto');
    })
    .catch(err => {
      setLoading(false);
      setIsAuth(false);
      // setshowError(true)
      console.log(err)
    });


  };

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    {loading && <CircularProgress/> }
    {!loading && 
    <Box
        sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
        />
        <FormControlLabel
            control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={handleCheckboxChange}/>}
            label="Recordarme"
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
        >
            Iniciar Sesión
        </Button>
        <Grid container>
            <Grid item xs>
            <LinkRoute to="/registro" style={{ textDecoration: 'none' }}>
              <Typography  variant="body2" color="primary">
                ¿Olvidaste tu contraseña?
              </Typography>
            </LinkRoute>
            </Grid>
            <Grid item>
            <LinkRoute to="/registro" style={{ textDecoration: 'none' }}>
              <Typography  variant="body2" color="primary">
                ¿No tienes una cuenta? Regístrate"
              </Typography>
            </LinkRoute>
            </Grid>
        </Grid>
        </Box>
    </Box>
  }
    <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}