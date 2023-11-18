import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO: 
// 1. CREAR SERVICIO PARA ALMACENAR IMAGENES EN DRIVE EN UNA CARPETA y EN LA BD almacenar la ruta y un campo booleano para saber si se fue o no aprobada
// 3. CREAR SERVICIO PARA RETORNAR IMAGENES ALMACENADAS
// 5. HACER PETICIÓN AL SERVIDOR PARA TRAER LAS IMAGENES
// 6. HACER SERVICIO PARA QUE CUANDO EL USUARIO LE DE CLICK EN APROBAR SE VAA DIRECTAMENTE A LA CARPETA DE DRIVE PARA ENTRENAR.
// 7. 

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const cards = [];
console.log(cards.length > 0);

export default function ExpertValidation() {
  return (
    <>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              ¡Ayudanos a Mejorar!
            </Typography>
            {cards.length ===0 && 
             <Typography variant="h5" align="center" color="text.secondary" paragraph>
             ¡Gracias por tu interés en ayudarnos! En este momento, no contamos con imágenes para que valides su clasificación. Pero no te preocupes, ¡vuelve a revisar más tarde! Tu contribución es muy apreciada.
            </Typography>
            }
            {cards.length >0 && 
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                A continuación, te presentamos una lista de imágenes clasificadas por nuestra increíble inteligencia artificial. Por favor, aprueba si crees que la clasificación es correcta según tus conocimientos, o rechaza si piensas lo contrario. Tu ayuda es invaluable. ¡Gracias por ser parte de nuestro equipo!
            </Typography>
            }
          </Container>
        </Box>
        <Container sx={{ py: 4 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Tizón Temprano
                    </Typography>
                    <Typography>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Aprobar</Button>
                    <Button color="error" size="small">Rechazar</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* End footer */}
    </>
  );
}