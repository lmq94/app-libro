import React, { useState } from 'react';
import {createBook} from './ApiService';
import BookData from './BookData'

function BookForm () {
  const [book, setBook] = useState({
    name: '',
    author: '',
    edition_date: '',
  });
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
    createBook(book, setSuccessMessage, setErrorMessage);
    setBook({
      name: '',
      author: '',
      edition_date: '',
    })
  };

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