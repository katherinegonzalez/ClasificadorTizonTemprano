import React, { useState, useRef, useContext } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, CircularProgress, IconButton } from '@mui/material';
import { AppContext } from '../../context';
import ResultModal from '../result-modal/ResultModal';
import CloseIcon from '@mui/icons-material/Close';
import { BASE_URL, CLASSIFY_IMAGES_URL, SAVE_IMAGES_TO_VALIDATE_URL } from '../../utils/constants';

function ClassifierContent() {

  const defaultImage= '/default-leaf-image.jpg';
  const [imageSrc, setImageSrc] = React.useState(defaultImage);
  const [image, setImage] = React.useState(null);
  const [predictedClass, setpredictedClass] = useState('');
  const [probabilities, setProbabilities] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const { setOpenModal} = useContext(AppContext);
  const { setShowMessage } = useContext(AppContext);

  const inputRef = useRef(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImageSrc(URL.createObjectURL(event.target.files[0]));
    }
   }

   const onImageDelete = (event) => {
      setImageSrc(defaultImage);
      setImage(null);
      setpredictedClass('');
      setProbabilities([]);
   }
  
   const onClassifyImage = () => {
    const formData = new FormData();
    formData.append('file', image);
    setLoading(true);

    fetch(`${BASE_URL}${CLASSIFY_IMAGES_URL}`, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json()) 
    .then(response => {
      setpredictedClass(response.predicted_class);
      setProbabilities(response.probabilities);
      setLoading(false);
      // Almacenar imagen para ser validada por experto después
      formData.append('classification', response.predicted_class);
      fetch(`${BASE_URL}${SAVE_IMAGES_TO_VALIDATE_URL}`, {
        method: 'POST',
        body: formData,
      }).then(() => setLoading(false))
      .catch(err => {
        setLoading(false);
      });
    })
    .catch(err => {
      setLoading(false);
      setShowMessage(true);
    });

  }

  const resultMessage = (prediction) => {
    let message = 'la papa tiene tizón tardío.'
    if(prediction.toLowerCase().includes('sana')) {
      message = 'la papa está sana.';
    } else if (prediction.toLowerCase().includes('temprano')) {
      message = 'la papa tiene tizón temprano';
    }
    return message;
  }

  const recommendationResult = (prediction) => {
    let recommendation = 'Para atacar el tizón tardío y evitar que este se propague al resto de tu cultivo,  te recomendamos quitar las hojas que veas con manchas oscuras de tu cultivo  usar un producto que contenga Trichoderma harzianum, un biofungicida eficaz para el control de este hongo.';
    if(prediction.toLowerCase().includes('sana')) {
      recommendation = 'Recuerda revisar tu cultivo de manera frecuente para asegurarte que continue creciendo sanamente. También recuerda regarlo de forma regular evitando que se encharque y asegúrate que reciba el sol directamente.';
    } else if (prediction.toLowerCase().includes('temprano')) {
      recommendation = 'Para contra atacar el tizón temprano y evitar que este se propague al resto de tu cultivo, te recomendamos quitar las hojas que veas con manchas oscuras o puntos amarillos de tu cultivo y usar Gluticid, un producto biológico eficaz para el control de este hongo.';
    }
    return recommendation;
  }

  return (
    <Grid item xs={12} md={6} justifyContent="center" alignItems="center">
        <Card sx={{ display: 'flex' }}>
        <CardMedia
            component="img"
            sx={{ width: 400, height: 400, display: { xs: 'none', sm: 'block' } }}
            image={imageSrc}
            alt={'default'}
            className={imageSrc === defaultImage ? 'default-image' : ''} 
          />
          { imageSrc !== defaultImage && 
            <IconButton 
            aria-label="borrar imagen" 
            className='delete-button' 
            onClick={onImageDelete}
            sx={{
            position: 'absolute',
            color: (theme) => theme.palette.grey[300]}}> 
            <CloseIcon />
          </IconButton>
          }
          { predictedClass === '' && !loading &&
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="subtitle1" paragraph align='center' color="text.disabled">
              Instrucciones
            </Typography>
            <Typography variant="subtitle2" paragraph color="text.disabled">
              1. Haz clic en el botón "Seleccionar Imagen".
              <br />
              2. Selecciona la imagen de la hoja desde tu computadora. Esta imagen se mostrará en la parte izquierda.
              <br />
              3. Haz clic en el botón "Clasificar".
              <br />
              4. El resultado de la clasificación se mostrará en este espacio.
              <br />
              6. Si deseas cargar una nueva imagen, haz clic en la "X" en la parte superior izquierda y vuelve a empezar de nuevo.
            </Typography>
          </CardContent>
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
         { predictedClass !== '' && !loading &&
         <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6" paragraph align='center'>
              Resultado de Clasificación: 
              <br />
              {predictedClass}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Según la imagen de la hoja que cargaste, {resultMessage(predictedClass)}.
            </Typography>
            <Typography variant="subtitle1" paragraph>
              <strong>Recomendación: </strong> {recommendationResult(predictedClass)}
            </Typography>
            <Typography variant="subtitle1">
              Si deseas obtener información detallada sobre las probabilidades haz
              <Button 
                variant="text" 
                color="primary"
                onClick={() => {setOpenModal(true)}}>
                Clic aquí
              </Button>.
            </Typography>
         </CardContent>
         }
        </Card>
      <Box
        sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}>
          { imageSrc === defaultImage && 
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 3, mb: 2, width: '50%' }}
            startIcon={<CloudUploadIcon />}>
            Seleccionar Imagen
            <input
              ref={inputRef}
              type="file"
              hidden
              accept=".jpg, .jpeg, .png"
              onChange={onImageChange}
            />
          </Button> }
          { (imageSrc !== defaultImage && predictedClass === '' && !loading) &&
          <Button 
            variant="contained" 
            sx={{ mt: 3, mb: 2, width: '50%' }}
            fullWidth
            disabled={loading}
            onClick={onClassifyImage}>Clasificar</Button>
          }
      </Box> 
      <ResultModal
          image={imageSrc}
          predictedClass={predictedClass}
          probabilities={probabilities}
        />
    </Grid>
  );
}


export default ClassifierContent;