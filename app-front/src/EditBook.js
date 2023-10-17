import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import BookData from './BookData';
import {updateBook, getBookById} from './ApiService';

function EditBook(props) {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [book, setBook] = useState({

  });
  // Aquí puedes cargar los datos del libro con el ID proporcionado

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(book);
    updateBook(book, id, setSuccessMessage, setErrorMessage );
  
    setBook({
      name: '',
      author: '',
      edition_date: '',
    })
  };

  const handleFilterResults = (data, error) => {
    if (error) {
        setError(error);
        setBook([]);
    }
    else
      setBook(data)
  }      

  useEffect(() => {
    if (id) { // Asegúrate de tener un ID antes de buscar el libro
      getBookById(id, handleFilterResults);
    } else {
      setBook(null);
    }
  }, [id]);

  // Renderiza un formulario para editar los datos del libro

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