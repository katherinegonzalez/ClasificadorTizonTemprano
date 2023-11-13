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
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ListItemText } from '@mui/material';
import ClassifierContent from './ClassifierContent';

function Classifier() {

    const [shouldShowClassifier, setshouldShowClassifier] = React.useState(false);

    return (

        <main>
        { !shouldShowClassifier && 
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
              Clasificador de Tizón
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                ¡Descubre el estado de tus papas de manera sencilla! 
                Nuestra plataforma usa inteligencia artificial para decirte si tus papas están sanas o tienen tizón, ya sea temprano o tarde. ¡Cuida tus cultivos con información precisa! 
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={()=>{ setshouldShowClassifier(true)}}>¡Empezar ahora!</Button>
            </Stack>
          </Container>
        </Box>
        }
        { shouldShowClassifier && 
            <Container sx={{ py: 8 }} maxWidth="md">
                <ClassifierContent></ClassifierContent>
                
            </Container> 

        }

      </main>
     
    );
  }
  
  export default Classifier;

  