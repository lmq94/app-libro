import React, { useState } from 'react';
import {createBook} from './ApiService';

function BookForm () {
  const [bookData, setBookData] = useState({
    name: '',
    author: '',
    edition_date: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(bookData);
    createBook(bookData, setSuccessMessage, setErrorMessage);
    setBookData({
      name: '',
      author: '',
      edition_date: '',
    })
  };

  return (
    <div className="container container-sm mt-5">
        <h3>Agregar un libro</h3>
        <form onSubmit={handleSubmit}>
            <div className="form-group m-3">
                <label>Título:</label>
                <div className="col-md-6 mx-auto">
                    <input
                        type="text"
                        name="name"
                        value={bookData.name}
                        onChange={handleChange}
                        className="form-control form-control-sm col-6"
                    />
                </div>
            </div>
            <div className="form-group m-3">
                <label>Autor:</label>
                <div className="col-md-6 mx-auto">
                    <input
                        type="text"
                        name="author"
                        value={bookData.author}
                        onChange={handleChange}
                        className="form-control form-control-sm"
                    />
                </div>
            </div>
            <div className="form-group m-3">
                <label>Fecha de Edición:</label>
                <div className="col-md-6 mx-auto">
                    <input
                        type="Date"
                        name="edition_date"
                        value={bookData.edition_date}
                        onChange={handleChange}
                        className="form-control form-control-sm"
                    />
                </div>
            </div>
            {successMessage && (
                <div className="alert alert-success mt-3">
                    {successMessage}
                </div>
            )}

            {/* Mostrar mensaje de error si errorMessage tiene un valor */}
            {errorMessage && (
                <div className="alert alert-danger mt-3 error-message">
                    {errorMessage}
                </div>
            )}
            <button type="submit" className="btn btn-primary mt-3">Agregar Libro</button>
        </form>
    </div>
  );
};

export default BookForm;