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
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link as LinkRoute} from "react-router-dom";
import { AppContext } from '../../context';

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

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const { setIsAuth } = useContext(AppContext);
  const { setShowError } = useContext(AppContext);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const signUpURL = 'http://127.0.0.1:5000/registro';

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Actualizar el estado de los errores para quitar el error cuando se escribe en el campo
    setErrors((prevErrors) => ({ ...prevErrors, [name]: !value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData(event.currentTarget);
    const formData = {
      name: data.get('name'),
      lastname: data.get('lastname'),
      occupation: data.get('occupation'),
      email: data.get('email'),
      password: data.get('password'),
    };
  
    const newErrors = {
      name: !data.get('name'),
      lastname: !data.get('lastname'),
      occupation: !data.get('occupation'),
      email: !data.get('email'),
      password: !data.get('password'),
    };

    // Actualizar estado con errores
    setErrors(newErrors);

    // Si todos los campos requeridos están llenos, continúa con el envío
    if (!Object.values(newErrors).some((error) => error)) {

      fetch('http://127.0.0.1:5000/registro', {
        method: 'POST',
        body:  JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json', // Establece el tipo de contenido como JSON
        },
      })
      .then(response => response.json()) 
      .then(response => {
        console.log(response);
        if (response.token) {
          setSessionID(response.token);
          setIsAuth(true);
          navigate('/validacion-experto');
        } else {
          setShowError(true)
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setShowError(true);
        console.log(err)
      });

    } else {
      setShowError(true);
      setLoading(false);
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
              <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
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
      <Copyright sx={{ mt: 5 }} />
      </Container>
    }
    </>   
  );
}