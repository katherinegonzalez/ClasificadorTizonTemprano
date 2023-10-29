import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function Classifier() {

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
      <div className='clasificador__container'>
      <header className='clasificador__header'>
        <h1>Clasificador de Tizón Temprano</h1>
      </header>
      <section className='clasificador__description'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum est egestas egestas vulputate. Nam fermentum imperdiet ipsum, id congue massa laoreet in. Donec tincidunt quis tellus eget interdum. Integer in mollis tortor. Praesent feugiat sagittis velit, nec consectetur odio convallis vitae. Nulla dapibus sapien vitae odio varius, pretium tempor mauris malesuada. Morbi ornare bibendum libero in condimentum. Fusce mollis cursus cursus.</p>
      </section>  
      <section className="clasificador__select-image">
        <figure>
          <img src={image} alt="default" className={image === '/default-image.png' ? 'default-image' : ''} />
          { image !== '/default-image.png' &&
            <IconButton aria-label="delete" className='delete-button' onClick={onImageDelete}>
              <DeleteIcon />
            </IconButton>
          }
        </figure>
  
        { image === '/default-image.png' && <Button
          variant="contained"
          component="label"
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
        { image !== '/default-image.png' &&
        <Button variant="contained" onClick={onClassifyImage}>Clasificar</Button>
        }
      </section> 
      </div>  
    );
  }
  
  export default Classifier;
  