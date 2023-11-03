import React, { useState, useRef } from 'react';
import './App.css';
import MenuBar from  './components/menu-bar/MenuBar';
import Classifier from  './components/classifier/Classifier';
import Information from  './components/information/Information';
import About from  './components/about/About';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from './context';

function App() {   
  const [openModal, setOpenModal] = useState(false);
  return (
    <BrowserRouter>
    <AppContext.Provider value={{openModal, setOpenModal}}>
      <MenuBar></MenuBar>
      <Routes>
        <Route path="/" element={<Classifier />} />
        <Route path="/informacion" element={<Information />} />
        <Route path="/sobre-nosotros" element={<About />} />
      </Routes>
    </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
