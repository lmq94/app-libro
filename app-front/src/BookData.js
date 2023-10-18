
//Componente creado con el fin de reutilizar el codigo html de un formulario donde se ingresan los datos del libro
function BookForm({ bookData, handleChange, handleSubmit, successMessage, errorMessage }) {
    return (
      <div className = "container container-sm mt-5">
        <form onSubmit = { handleSubmit}>
          <div className="form-group m-3">
            <label>Nombre:</label>
            <div className = "col-md-6 mx-auto">
              <input
                type = "text"
                name = "name"
                value ={bookData.name}
                onChange = {handleChange}
                className = "form-control form-control-sm col-6"
              />
            </div>
          </div>
          <div className = "form-group m-3">
            <label>Autor:</label>
            <div className = "col-md-6 mx-auto">
              <input
                type = "text"
                name = "author"
                value = {bookData.author}
                onChange = {handleChange}
                className = "form-control form-control-sm"
              />
            </div>
          </div>
          <div className = "form-group m-3">
            <label>Fecha de Edición:</label>
            <div className = "col-md-6 mx-auto">
              <input
                type = "Date"
                name = "edition_date"
                value = {bookData.edition_date}
                onChange = {handleChange}
                className = "form-control form-control-sm"
              />
            </div>
          </div>
          {successMessage && (
            <div className = "alert alert-success mt-3">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className = "alert alert-danger mt-3 error-message">
              {errorMessage}
            </div>
          )}
          <button type = "submit" className = "btn btn-primary mt-3">
            Enviar datos
          </button>
        </form>
      </div>
    );
  }
  
  export default BookForm;