import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import Copyright from '../copy-right/CopyRight';
import { BASE_URL, LOGIN_URL } from '../../utils/constants';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const { setIsAuth} = useContext(AppContext);
  const { setShowMessage, setMessage, setMessageType, setUserName } = useContext(AppContext);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(false);

  const setError = (message = '') => {
    setMessage(message);
    setMessageType('error');
    setShowMessage(true);
    setIsAuth(false);
    setLoading(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Actualizar el estado de los errores para quitar el error cuando se escribe en el campo
    setErrors((prevErrors) => ({ ...prevErrors, [name]: !value }));
  };

  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData(event.currentTarget);

    const formData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    
    const newErrors = {
      email: !data.get('email'),
      password: !data.get('password'),
    };

    // Actualizar estado con errores
    setErrors(newErrors);

    // Si todos los campos requeridos están llenos, continúa con el envío
    if (!Object.values(newErrors).some((error) => error)) {
        fetch(`${BASE_URL}${LOGIN_URL}`, {
        method: 'POST',
        body:  JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json()) 
      .then(response => {
        if (response.token) {
          setSessionID(response.token, response.id, rememberMe);
          setUserName(response.name);
          setIsAuth(true);
          navigate('/validacion-experto');
        } else {
          const errorMessage = response.message ? response.message : '';
          setError(errorMessage);
        }
        setLoading(false);
      })
      .catch(err => {
        setError();
      });
    } else {
      setError();
    }
  };

  return (
    <>
    {loading && 
      <Container 
        component="main" 
        maxWidth="xs" 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 64px)',
        }}>
      <Box
        sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
        }}>
          <CircularProgress/>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    }
    {!loading && 
    <Container component="main" maxWidth="xs">
    <CssBaseline />
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
            error={errors.email}
            helperText={errors.email && "Este campo es obligatorio"}
            onChange={handleChange}
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
            error={errors.password}
            helperText={errors.password && "Este campo es obligatorio"}
            onChange={handleChange}
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
    <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
    }
    </>
  );
}