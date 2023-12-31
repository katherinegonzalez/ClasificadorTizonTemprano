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
import { CircularProgress } from '@mui/material';
import { AppContext } from '../../context';
import { getSessionID, getUserID } from '../auth/session';
import Copyright from '../copy-right/CopyRight';
import { BASE_URL, GET_IMAGES_TO_VALIDATE_URL, SAVE_VALIDATED_IMAGES_URL } from '../../utils/constants';

export default function ExpertValidation() {

  const [ cards, setCards ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ isValidationDone, setIsValidationDone ] = useState(false);
  const { setShowMessage, setMessage, setMessageType } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}${GET_IMAGES_TO_VALIDATE_URL}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${getSessionID()}`,
            'Content-Type': 'application/json'
          },
        });
        const result = await response.json();
        setCards(result.images);
        setLoading(false);
      } catch (error) {
        setShowMessage(true);
        setLoading(false);
      }
    };
    if (cards.length === 0 || !isValidationDone) {
      fetchData(); 
    }
  }, [isValidationDone, cards.length, setShowMessage]);

  const getImageUrl = (image, imageType) => {
    return `data:image/${imageType};base64, ${image}`;
  }

  const onValidateClassification = ({imageId, isApproved}) => {

    const validatedCardsList = cards.map(image => {
      if (imageId === image.id)  {

        if (image.isApproved === isApproved) {
          image.isApproved = null;
        } else {
          image.isApproved = isApproved; 
        }
      }
      return image;
    });
    setCards(validatedCardsList);
  }

  const onSaveValidation = () => {
    const validatedImagesList = cards.filter(image =>image.isApproved !==null && image.isApproved !==undefined);

    if (validatedImagesList.length === 0) {
      setShowMessage(true);
      setMessage('¡Ups! Parece que aún no has realizado ninguna validación.' + 
        'Valida al menos una imagen para continuar.');
      setMessageType('warning');
    } else {
      setLoading(true);

      const formData = new FormData();
      
      formData.append('userId', getUserID());
      formData.append('files', JSON.stringify(validatedImagesList));

      fetch(`${BASE_URL}${SAVE_VALIDATED_IMAGES_URL}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${getSessionID()}`
      }
      })
      .then((response) => {
        if (response.status === 200) {
          setIsValidationDone(true);
        } else {
          setShowMessage(true);
        }
        setLoading(false);  
      })
      .catch(err => {
        setShowMessage(true);
        setLoading(false);
      });
    }
  }

  const onBackButton = () => {
    setLoading(true);
    setIsValidationDone(false);
  }

  return (
    <>
      <CssBaseline />
      <main style={ loading ? {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)'
      } : {}}>
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
              { !isValidationDone && '¡Ayudanos a Mejorar!'}
              { isValidationDone && !loading && '¡Gracias por tu Aporte!'}
            </Typography>
            {cards.length === 0 && !loading && !isValidationDone && 
             <Typography variant="h5" align="center" color="text.secondary" paragraph>
             ¡Gracias por tu interés en ayudarnos! En este momento, no contamos con imágenes para que valides su clasificación. Pero no te preocupes, ¡vuelve a revisar más tarde! Tu contribución es muy apreciada.
            </Typography>
            }
            {cards.length > 0 && !loading && !isValidationDone && 
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                A continuación, te presentamos una lista de imágenes clasificadas por nuestra increíble inteligencia artificial. Por favor, aprueba si crees que la clasificación es correcta según tus conocimientos, o rechaza si piensas lo contrario. Tu ayuda es invaluable. ¡Gracias por ser parte de nuestro equipo!
            </Typography>
            }
            { isValidationDone && !loading && 
              <Box
              sx={{ pt: 4, display: 'flex' }}
              direction="row"
              spacing={2}
              justifyContent="center">
                <Button variant="contained" onClick={()=>{ onBackButton()}}>Volver</Button>
              </Box>
            }
          </Container>
        </Box>
        {!loading && !isValidationDone && 
          <Container sx={{ py: 4 }} maxWidth="md">
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

                      { card.isApproved !== undefined && card.isApproved !== null &&
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
                                fontWeight: 'bolder',
                                textAlign: 'center'
                              }}>
                              {card.isApproved ? 'Clasificación Aprobada': 'Clasificación Rechazada'}
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
                          backgroundColor: card.isApproved ? '#4caf504d' : ''
                        }}
                        onClick={() => {onValidateClassification({imageId: card.id, isApproved: true})}}>
                        Aprobar</Button>
                      <Button 
                        color="error" 
                        size="small"
                        sx={ {
                           backgroundColor: card.isApproved === false ? '#d32f2f40' : ''
                        }}
                        onClick={() => {onValidateClassification({imageId: card.id, isApproved: false})}}>
                          Rechazar</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            { cards.length > 0 && 
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
                  onClick={()=> {onSaveValidation()}}
                  sx={{ mt: 3, mb: 2, width: '50%' }}>
                  Guardar y Enviar
                </Button>
              </Box>
            }
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