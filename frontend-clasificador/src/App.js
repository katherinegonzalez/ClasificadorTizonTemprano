import React, { useState, useRef } from 'react';
import './App.css';
import MenuBar from  './components/menu-bar/MenuBar';
import Classifier from  './components/classifier/Classifier';
import Information from  './components/information/Information';
import About from  './components/about/About';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

  const [image, setImage] = useState('/default-image.png');

  const inputRef = useRef(null);
  
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
   }

   const onImageDelete = (event) => {
      console.log('borrar image');
      setImage('/default-image.png');
      console.log(image);
    
   }
  
   const onClassifyImage = (event) => {

    console.log('Clasificar Imagen: ', console.log(inputRef.current.value));
  }
   
  return (
    <BrowserRouter>
     <MenuBar></MenuBar>
    <Routes>
      <Route path="/" element={<Classifier />} />
      <Route path="/informacion" element={<Information />} />
      <Route path="/sobre-nosotros" element={<About />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
