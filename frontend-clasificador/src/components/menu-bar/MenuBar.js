import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { deleteCookie, getSessionID, getUserID } from '../auth/session';
import { AppContext } from '../../context';
import React, { useContext, useState, useEffect } from 'react';


const pages = {
  'mi-clasificador': 'Mi clasificador', 
  'validacion-experto': 'Ayudanos a Mejorar', 
  'sobre-nosotros': 'Sobe Nosotros'
};
const settings = {
  'profile': 'Perfil', 
  'logout': 'Cerrar Sesión',
};

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {isAuth, setIsAuth, userName, setUserName} = useContext(AppContext);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (settingValue) => {
    setAnchorElUser(null);
    if (settingValue === 'logout') {
      deleteCookie();
      setIsAuth(false);
    }

    if (settingValue === 'profile') {
      navigate('/perfil');
    }
  };

  useEffect(() => {

    const getUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/user?id=${getUserID()}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${getSessionID()}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });
        const result = await response.json();
        console.log(result);
        setUserName(result.user.name);   
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };
    
    if (!userName && isAuth) {
      getUser();
    }
  });

  return (
      <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={'/logo-agro.png'} alt="default" height={40} width={40}/>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {Object.keys(pages).filter(page => (!isAuth && page !== 'validacion-experto') || isAuth)
                .map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={`/${page === 'mi-clasificador' ? '': page}`} style={{'textDecoration':'none', 'color': 'black'}}>{pages[page]}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={'/logo-agro.png'} alt="default" height={40} width={40}/>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {Object.keys(pages).filter(page => (!isAuth && page !== 'validacion-experto') || isAuth)
              .map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu} 
                sx={{ my: 2, display: 'block' }}
              >
                <Link to={`/${page === 'mi-clasificador' ? '': page}`} style={{'textDecoration':'none', 'color': 'white'}}>{pages[page]}</Link>
              </Button> 
            ))}
          </Box>

          { isAuth && 
          
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar>{userName.charAt(0)}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {Object.keys(settings).map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{settings[setting]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          }

          { !isAuth && 
          <Stack spacing={2} direction="row">
            <Button variant="contained" color="secondary">
              <Link to='/login' style={{'textDecoration':'none', 'color': 'white'}}>
                INICIAR SESIÓN
              </Link>
            </Button>
            <Button variant="contained" color="secondary">
              <Link to='/registro' style={{'textDecoration':'none', 'color': 'white'}}>
                REGISTRARSE
              </Link>
            </Button>
          </Stack>
          }
        </Toolbar>
      </Container>
    </AppBar>
    
  );
}
export default ResponsiveAppBar;