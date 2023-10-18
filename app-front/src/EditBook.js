import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import BookData from './BookData';
import {updateBook, getBookById} from './ApiService';


//Componente encargado de actualizar un libro en la aplicacion 
function EditBook(props) {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [book, setBook] = useState({

  });
  

  //Mensajes de errores o de exito que se actualizaran dependiendo del resultado de la actualizacion de un libro, para esto se usa useState
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  //Controla el envio de los datos del formulario de actualizacion
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(book);

    //Se envian los datos a la api
    updateBook(book, id, setSuccessMessage, setErrorMessage );
  
    //Reseteo el formulario luego que se envian los datos a la api
    setBook({
      name: '',
      author: '',
      edition_date: '',
    })
  };

  //Controla los resultados de filtracion
  const handleFilterResults = (data, error) => {
    if (error) {
        setError(error);
        setBook([]);
    }
    else
      setBook(data)
  }      

  useEffect(() => {
    if (id) { 
      getBookById(id, handleFilterResults);
    } else {
      setBook(null);
    }
  }, [id]);

//Aqui se genera el html del formulario de actualizacion de un libro
  return (
    <div className = "mt-5">
      <h3>Editar libro</h3>
      <BookData
            bookData = {book}
            handleChange = {handleChange}
            handleSubmit = {handleSubmit}
            successMessage = {successMessage}
            errorMessage = {errorMessage}
      />
    </div>
    );
}

export default EditBook;