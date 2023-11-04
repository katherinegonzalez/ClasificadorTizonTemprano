import React, { useState, useRef, useContext } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ResultModal from '../result-modal/ResultModal';
import { AppContext } from '../../context';

function Classifier() {

    const [imageSrc, setImageSrc] = useState('/default-image.png');
    const [image, setImage] = useState(null);
    const [predictedClass, setpredictedClass] = useState('');
    const [probabilities, setProbabilities] = useState([]);
    const {openModal, setOpenModal} = useContext(AppContext);
  
    const inputRef = useRef(null);


    const mensajeClasificacion =  {
      'Papa Sana': 'la papa está sana!',
      'Tizón Tardío': 'la papa tiene tizón tardío',
      'Tizón Temprano': 'la papa tiene tizón temprano'
    };
    
    const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        console.log('event.target.files[0]: ', event.target.files[0]);
        setImage(event.target.files[0]);
        setImageSrc(URL.createObjectURL(event.target.files[0]));
      }
     }
  
     const onImageDelete = (event) => {
        console.log('borrar image');
        setImageSrc('/default-image.png');
        setImage(null);
        setpredictedClass('');
        setProbabilities([]);
        console.log(imageSrc);
      
     }
    
     const onClassifyImage = () => {
      const formData = new FormData();
      formData.append('file', image);

      fetch('http://127.0.0.1:5000/classifyImage', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json()) 
      .then(response => {
        console.log(response);
        setpredictedClass(response.predicted_class);
        setProbabilities(response.probabilities);
      })
      .catch(err => console.log(err));

    }
     
    return (
      <div className='clasificador__container'>
        <header className='clasificador__header'>
          <h1>Clasificador de Tizón Temprano</h1>
        </header>
        <section className='clasificador__description'>
          <div>
            <p>¡Bienveido al clasificador de tizón temprano con inteligencia artificial!</p> 
          </div>
          <br />
          <p>
            Esta plataforma te permitirá saber si las papas de tu cultivo están sanas o tienen la enfermedad de tizón en estado temprano o tardío.
            El clasificadr de tizón temprano usa inteligencia artificial para predecir con exactitud el estado de tu cultivo de papa. 
          </p>
          <br />
          <p>
            Usarlo es muy simple, solo tienes que subir las imágenes de las hojas de tus plantas de papa y hacer click en el botón <strong>Clasificar</strong>.
            Si deseas obtener más información acerca de esta clasificación, haz click en el link <strong>'click aquí'</strong> ubicado en la parte inferior de tu imagen
            una vez hayas obtenido el resultado de la clasificación. Si desea hacer una nueva clasificación puede borrar la imagen actual con el ícono del basurero.
          </p>
        </section>  
        <section className="clasificador__select-image">
          <div>
          <figure>
            <img src={imageSrc} alt="default" className={imageSrc === '/default-image.png' ? 'default-image' : ''} />
            { imageSrc !== '/default-image.png' &&
              <IconButton aria-label="delete" className='delete-button' onClick={onImageDelete}>
                <DeleteIcon />
              </IconButton>
            }
          </figure>
    
          { imageSrc === '/default-image.png' && <Button
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
          { console.log(predictedClass) }
          { (imageSrc !== '/default-image.png' && predictedClass === '') &&
          <Button variant="contained" onClick={onClassifyImage}>Clasificar</Button>
          }
          </div>
          { predictedClass !== '' &&
            <div className='classification-result'>
              <h3>Resultado: {predictedClass}</h3> 
              <br />
              <p>Teniendo en cuenta la imagen de la hoja cargada, se identifica que {mensajeClasificacion[predictedClass]} </p>
              <p>Si desea tener más información haga <button onClick={() => {setOpenModal(true)}}><strong>click aquí</strong></button>.</p>
            </div>
          }
        </section> 
        <ResultModal 
          image={imageSrc}
          predictedClass={predictedClass}
          probabilities={probabilities}
        />
      </div>  
    );
  }
  
  export default Classifier;

  /* 
  TODO: Arreglar el responsive de la Aplicación, también para pantallas grandes
  Organizar la información de adentro del modal
  Hacer el llamado al servicio
  Completar el component de información
  Buscar como plantilla de about
  Implementar About
  */
  