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

function App() {   
  const [openModal, setOpenModal] = useState(false);
  const [isAuth, setIsAuth] = useState(isAuthenticated());


  return (
    <BrowserRouter>
    <AppContext.Provider value={{openModal, setOpenModal, isAuth, setIsAuth}}>
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
    </Routes>
    </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
