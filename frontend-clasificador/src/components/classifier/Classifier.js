import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ClassifierContent from './ClassifierContent';
import Copyright from '../copy-right/CopyRight';

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
              PapApp
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
            <Container sx={{ pt: 8 }} maxWidth="md">
              <ClassifierContent></ClassifierContent>  
            </Container> 
        }
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </main>     
    );
  }
  
  export default Classifier;

  