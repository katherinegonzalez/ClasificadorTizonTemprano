# PapApp 🚀

PapApp es una aplicación con Inteligencia Artificial para la clasificación de hojas de las plantas de papas, su objetivo es determinar, a través de imágenes, si las hojas tienen la enfermedad de Tizón temprano, Tizón tardío o si es un cultivo sano. 

Este proyecto ha sido implementado como proyecto de grado de la maestría de Inteligencia Artificial de la Pontificia Universidad Javeriana.

Dentro de este repositorio se encuentran la aplicación Web UI implementada en React y la aplicación backend implementada en python, que contiene la API de clasificación, autenticación y almacenamiento de imágenes. 

# Estructura de Carpetas 📂

Las carpetas se estructuran de la siguiente manera:

- **/frontend-clasificador**: Contiene el código frontend de la aplicación web.
- **/clasificador-server**: Contiene el código fuente del backend de la aplicación
  - **/classifierAPI**: Código del API del clasifiador y archivo .pkl del modelo entrenado.

# Frontend Clasificador 📋
Es una aplicación web implementada en React js. Para más detalles sobre instalación y configuración haz click [Aquí](./frontend-clasificador/README.md) 

# Backend Clasificador 📋
Este código está implementado en python con el framework Flask, en un solo servidor local Flask se encuentran alojados los servicios de autenticación, almacenamiento de usuarios, almacenamiento de imágenes y la API de clasificación. Para más detalles sobre configuración e instalación ve [Aquí](./clasificador-server/README.md) .

# API de clasificación 📋
El modelo utilizado para este clasificador es el vgg16_bn.pkl alojado en la carpeta classifierAPI.
Este modelo fue entrenado en el siguiente NoteBook.
Ver Más Aquí.

## Github repository 📦

[GithubPapApp](https://github.com/katherinegonzalez/ClasificadorTizonTemprano)

## Integrantes del Equipo 😊

Katherine Xiomar González Santacruz
Joshep Andersson Blanco Reyes
Lorena Patricia Mora Hernandez



