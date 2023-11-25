import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { setSessionID } from './session';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link as LinkRoute} from "react-router-dom";
import { AppContext } from '../../context';
import bcrypt from 'bcryptjs';
import Copyright from '../copy-right/CopyRight';

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const { setIsAuth } = useContext(AppContext);
  const { setShowMessage, setMessage, setMessageType } = useContext(AppContext);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Actualizar el estado de los errores para quitar el error cuando se escribe en el campo
    setErrors((prevErrors) => ({ ...prevErrors, [name]: !value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData(event.currentTarget);
    const saltRounds = 10;
    bcrypt.hash(data.get('password').toString(), saltRounds, function(err, hashPassword) {

      if (err) {
        setMessageType('error');
        setMessage('');
        setShowMessage(true);
        setLoading(false);
        return;
      }

      const formData = {
        name: data.get('name'),
        lastname: data.get('lastname'),
        occupation: data.get('occupation'),
        email: data.get('email'),
        password: hashPassword,
        signupkey: data.get('signupkey')
      };
    
      const newErrors = {
        name: !data.get('name'),
        lastname: !data.get('lastname'),
        occupation: !data.get('occupation'),
        email: !data.get('email'),
        password: !data.get('password'),
        signupkey: !data.get('signupkey')
      };
  
      // Actualizar estado con errores
      setErrors(newErrors);
  
      // Si todos los campos requeridos están llenos, continúa con el envío
      if (!Object.values(newErrors).some((error) => error)) {
  
        fetch('http://127.0.0.1:5000/registro', {
          method: 'POST',
          body:  JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => response.json()) 
        .then(response => {
          console.log(response);
          if (response.token) {
            setSessionID(response.token, response.id);
            setIsAuth(true);
            navigate('/validacion-experto');
            setMessage('¡Registro Exitoso!');
            setMessageType('success');
            console.log('Registro exitoso');
          } else {
            if (response.message) {
              setMessageType('error');
              setMessage(response.message);
            }
          }          
          setShowMessage(true);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          setShowMessage(true);
          setMessageType('error');
          setMessage('');
          console.log(err)
        });
  
      } else {
        setMessage('');
        setShowMessage(true);
        setLoading(false);
      }

    });
    
  };
  
  return (
    <>
      { loading && 
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
        <Copyright sx={{ mt: 8, mb: 4}} />
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
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarse
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  autoFocus
                  error={errors.name}
                  helperText={errors.name && "Este campo es obligatorio"}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastname"
                  autoComplete="family-name"
                  error={errors.lastname}
                  helperText={errors.lastname && "Este campo es obligatorio"}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="occupation"
                  label="Ocupación"
                  name="occupation"
                  autoComplete="occupation"
                  error={errors.occupation}
                  helperText={errors.occupation && "Este campo es obligatorio"}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  error={errors.email}
                  helperText={errors.email && "Este campo es obligatorio"}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={errors.password}
                  helperText={errors.password && "Este campo es obligatorio"}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="signupkey"
                  label="Token de Registro"
                  type="password"
                  id="signupkey"
                  autoComplete="signupkey"
                  error={errors.signupkey}
                  helperText={errors.signupkey && "Este campo es obligatorio"}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <LinkRoute to="/login" style={{ textDecoration: 'none' }}>
                  <Typography  variant="body2" color="primary">
                    ¿Ya tienes una cuenta? Inicia Sesión
                  </Typography>
                </LinkRoute>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5, mb: 4 }} />
      </Container>
      }
    </>   
  );
}