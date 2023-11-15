import React, { useState } from 'react';
import './App.css';
import MenuBar from  './components/menu-bar/MenuBar';
import Classifier from  './components/classifier/Classifier';
import Information from  './components/information/Information';
import About from  './components/about/About';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from './context';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ExpertValidation from './components/expert-validation/ExpertValidation';

function App() {   
  const [openModal, setOpenModal] = useState(false);

  return (
    <BrowserRouter>
    <AppContext.Provider value={{openModal, setOpenModal}}>
    <MenuBar></MenuBar>
    <Routes>
      <Route path="/" element={<Classifier />} />
      <Route path="/validacion-expert" element={<ExpertValidation />} />
      <Route path="/sobre-nosotros" element={<About />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/registro" element={<SignUp />} />
    </Routes>
    </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
