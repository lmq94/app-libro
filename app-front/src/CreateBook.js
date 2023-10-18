import React, { useState } from 'react';
import {createBook} from './ApiService';
import BookData from './BookData'

//Componente encargado de dar de alta un libro en la aplicacion
function BookForm () {
  const [book, setBook] = useState({
    name: '',
    author: '',
    edition_date: '',
  });

  //Mensajes de errores o de exito luego de la creacion de un libro, para esto se usa useState
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  //Evento encargado de enviar los datos del libro hacia la api, luego aqui llegara un mensaje de exito o error que se notificara al usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(book);
    createBook(book, setSuccessMessage, setErrorMessage);
    setBook({
      name: '',
      author: '',
      edition_date: '',
    })
  };

  //Aqui se genera el html del formulario de creacion de un libro
  return (
    <div>
    <h3 className = "mt-5">Crear libro</h3>
    <BookData
          bookData = {book}
          handleChange = {handleChange}
          handleSubmit = {handleSubmit}
          successMessage = {successMessage}
          errorMessage = {errorMessage}
    />
  </div>
  );
};

export default BookForm;