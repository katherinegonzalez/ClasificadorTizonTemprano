import { Avatar, Box, Container, Link, Stack, Typography } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import { GITHUB_URL, JOSHEP_EMAIL, KATHERINE_EMAIL, LORENA_EMAIL } from "../../utils/constants";
import Copyright from "../copy-right/CopyRight";

function About() { 
    return (
      <main>
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
            Sobre Nosotros
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Somos estudiantes de la maestría en Inteligencia Artificial de la Pontificia Universidad Javeriana. 
            Nuestro objetivo es ayudarte a cultivar papas saludables. 
            ¿Cómo lo hacemos? Aplicamos los conocimientos que hemos adquirido durante nuestro tiempo de estudio para brindarte la mejor plataforma de clasificación. 
            ¡Estamos aquí para ti y tus cultivos! 
          </Typography>
        </Container>
          </Box>

          <Container sx={{ px: 2 }} maxWidth="md">

          <Typography
            component="h4"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Nuestro Equipo
          </Typography>

          <Box sx={{display: 'flex', justifyContent: 'center', py: 4}}>
            <Stack direction="row" spacing={6}>
              <Stack sx={{alignItems:'center'}} direction="column" spacing={1}>
                  <Avatar sx= {{width: 100, height: 100}} alt="Remy Sharp" src="/JoshepImage.png" />
                  <Typography>Joshep Blanco</Typography>
              </Stack>
              <Stack sx={{alignItems:'center'}} direction="column" spacing={1}>
                <Avatar sx= {{width: 100, height: 100}} alt="Cindy Baker" src="/KatheImage.png" />
                <Typography>Katherine González</Typography>
              </Stack>
              <Stack sx={{alignItems:'center'}} direction="column" spacing={1}>
                <Avatar sx= {{width: 100, height: 100}} alt="Travis Howard" src="/LoreImage.png" />
                <Typography>Lorena Mora</Typography>
              </Stack>
            </Stack>
          </Box>

          <Typography
            sx={{pt: 4}}
            component="h5"
            variant="h5"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Contáctanos:
          </Typography>

          <Box sx={{display: 'flex', justifyContent: 'center', py: 2}}>
            <Stack direction="column" spacing={2} sx={{display: 'flex', alignItems: 'center'}}>
              <Stack direction="row" sx={{display: 'row', alignItems: 'center'}}>
                <GitHubIcon /><Link href={GITHUB_URL}>GitHub</Link>
              </Stack>
             
              <Stack direction="row" sx={{display: 'row', alignItems: 'center'}}>
                <EmailIcon /><Typography> Emails: </Typography>
              </Stack>
              
              <Stack sx={{display: 'flex', alignItems: 'center'}}>
                <Link href={`mailto:${JOSHEP_EMAIL}`} color="primary">
                  {JOSHEP_EMAIL}
                </Link>
                <Link href={`mailto:${LORENA_EMAIL}`} color="primary">
                  {LORENA_EMAIL}
                </Link>
                <Link href={`mailto:${KATHERINE_EMAIL}`} color="primary">
                  {KATHERINE_EMAIL}
                </Link>
              </Stack>   
             
            </Stack>
            
          </Box>
         
          </Container>

          <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Copyright />
        </Box>
       
      </main>     
    );
  }
    
  export default About;