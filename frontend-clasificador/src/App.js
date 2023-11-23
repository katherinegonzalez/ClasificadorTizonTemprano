import React, { useState } from 'react';
import './App.css';
import MenuBar from  './components/menu-bar/MenuBar';
import Classifier from  './components/classifier/Classifier';
import About from  './components/about/About';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from './context';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ExpertValidation from './components/expert-validation/ExpertValidation';
import ProtectedRoutes from './components/auth/protected-routes/ProtectedRoutes';
import LoginRoute from './components/auth/login-route/LoginRoute';
import { isAuthenticated } from './components/auth/session';
import Error from './components/toast-message/ToastMessage';
import Profile from './components/profile/Profile';

function App() {   
  const [openModal, setOpenModal] = useState(false);
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('Ocurrió un error! Vuelva a intentarlo.');
  const [messageType, setMessageType] = useState('error');
  const [userName, setUserName] = useState('');

  return (
    <BrowserRouter>
    <AppContext.Provider 
      value={{
        openModal, 
        setOpenModal, 
        isAuth, 
        setIsAuth, 
        showMessage, 
        setShowMessage,
        message, 
        setMessage,
        messageType, 
        setMessageType,
        userName, 
        setUserName}}>
    <MenuBar></MenuBar>
    <Routes>
      <Route path="/" element={<Classifier />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/validacion-experto" element={<ExpertValidation />} />
      </Route>
      <Route element={<LoginRoute />}>
        <Route path="/login" element={<SignIn />} />
      </Route>
      <Route path="/sobre-nosotros" element={<About />} />
      <Route path="/registro" element={<SignUp />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/perfil" element={<Profile />} />
      </Route>
    </Routes>
    <Error></Error>
    </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
