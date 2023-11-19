import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
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
import { CircularProgress } from '@mui/material';
import { AppContext } from '../../context';

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

export default function ExpertValidation() {

  const [ cards, setCards ] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setShowError } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('entra');
        const response = await fetch('http://127.0.0.1:5000/getImagesToValidate');
        const result = await response.json();
        console.log('cards: ', result.images);
        setCards(result.images);
        setLoading(false);
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setShowError(true);
        setLoading(false);
      }
    };
    if (cards.length === 0) {
      fetchData(); 
    }
  }, []);

  const getImageUrl = (image, imageType) => {
    return `data:image/${imageType};base64, ${image}`;
  }

  const onValidateClassification = ({imageId, isApprove}) => {

    const validatedCardsList = cards.map(image => {
      if (imageId === image.id)  {

        if (image.isApprove === isApprove) {
          image.isApprove = null;
        } else {
          image.isApprove = isApprove; 
        }
      }
      return image;
    });
    console.log('validatedCardsList: ', validatedCardsList);
    setCards(validatedCardsList);
  }


  return (
    <>
      <CssBaseline />
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)'
      }}>
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
            {cards.length === 0 && !loading &&
             <Typography variant="h5" align="center" color="text.secondary" paragraph>
             ¡Gracias por tu interés en ayudarnos! En este momento, no contamos con imágenes para que valides su clasificación. Pero no te preocupes, ¡vuelve a revisar más tarde! Tu contribución es muy apreciada.
            </Typography>
            }
            {cards.length > 0 && !loading &&
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                A continuación, te presentamos una lista de imágenes clasificadas por nuestra increíble inteligencia artificial. Por favor, aprueba si crees que la clasificación es correcta según tus conocimientos, o rechaza si piensas lo contrario. Tu ayuda es invaluable. ¡Gracias por ser parte de nuestro equipo!
            </Typography>
            }
          </Container>
        </Box>
        {!loading &&
          <Container sx={{ py: 4 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: '56.25%',
                        position: 'relative'
                      }}
                      image={getImageUrl(card.image, card.imageType)}>

                      { card.isApprove !== undefined && card.isApprove !== null &&
                        <Box
                          sx={{
                            position: 'absolute',
                            height: "100%",
                            width: '100%',
                            backgroundColor: 'black',
                            opacity: 0.7,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: 0
                          }}>
                            <Typography 
                              variant='h5' 
                              color='white'
                              sx={{
                                fontWeight: 'bolder'
                              }}>
                              {card.isApprove ? 'Clasificación Aprobada': 'Clasificación Rechazada'}
                            </Typography>
                        </Box>
                      }   
                    </CardMedia>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                      {card.classification}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small" 
                        sx={  {
                          backgroundColor: card.isApprove ? '#4caf504d' : ''
                        }}
                        onClick={() => {onValidateClassification({imageId: card.id, isApprove: true})}}>
                        Aprobar</Button>
                      <Button 
                        color="error" 
                        size="small"
                        sx={ {
                           backgroundColor: card.isApprove === false ? '#d32f2f40' : ''
                        }}
                        onClick={() => {onValidateClassification({imageId: card.id, isApprove: false})}}>
                          Rechazar</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box  
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}>

            <Button
              type="button"
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, width: '50%' }}>
              Guardar y Enviar
            </Button>

            </Box>
           
          </Container>
        }
        {loading &&
          <Container maxWidth="md"
             sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1
              }}>
            <Box
              sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1
              }}>
              <CircularProgress /> 
            </Box>
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
              <Copyright />
            </Box>
          </Container>
        }
      </main>
     
      { !loading && 
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Copyright />
        </Box>
      }
      
    </>
  );
}