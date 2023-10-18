import axios from 'axios';

const baseUrl = 'http://localhost:8000/api';


function getBooks(item){
    axios.get(`${baseUrl}/books`)
        .then(response => {
            console.log(response.data);
            item(response.data);
        })
        .catch(error => {
            console.error(error);
        });

}

function filterBooks( filter, callback) {
    axios
      .get(`${baseUrl}/books/search`, {
        params: {
          name: filter.name,
          author: filter.author,
        }
      })
      .then((response) => {
        if (response.data && response.status === 200) {
          if (response.data.length === 0) {
            callback([], "No se encontraron resultados");
          } else {
            callback(response.data, null);
          }
        } else {
          callback([], "Hubo un error en la solicitud");
        }
      })
      .catch((error) => {
        console.error(error);
        callback([], "Hubo un error en la solicitud");
      });
  }

  function getBookById(id, callback = null, data = null) {
    axios
      .get(`${baseUrl}/book/${id}`)
        .then((response) => {
          if (callback && typeof callback === 'function') {
            if (response.data && response.status === 200) {
              if (response.data) {
                callback(response.data, null);
              } else {
                callback(null, "No se encontraron resultados");
              }
            } else {
              callback(null, "No se encontraron resultados");
            }
          }
        })
        .catch((error) => {
          console.error(error);
          if (callback && typeof callback === 'function') {
            callback(null, "Hubo un error en la solicitud");
          }
        });
  }

function deleteBook(id){
    axios.delete(`${baseUrl}/book/${id}`).
        then(response => {
            if (response.status === 204) {
                console.log(`Libro con ID ${id} eliminado exitosamente.`);
            } else {
                console.error(`Error al eliminar el libro con ID ${id}.`);
            }
        })
        .catch(error => {
            console.error(`Error en la solicitud de eliminación: ${error}`);
        });
}


function createBook(data, setSuccessMessage, setErrorMessage){
    axios.post(`${baseUrl}/books`, data)
            .then((response) => {
                console.log('Datos actualizados:', response.data)
                setSuccessMessage("El libro se ha creado con éxito");
                setErrorMessage(null); 
            })     
            .catch((error) => {
                console.error('Error al actualizar los datos:', error)
                if (error.response && error.response.data && error.response.data.errors) {
                    const errorMessages = Object.values(error.response.data.errors).flat();
                    setErrorMessage(errorMessages.join(", "));
                }
                else{
                  setErrorMessage("Error al crear el usuario: " + error.message);
                  setSuccessMessage(null); 
                }
              });
                
}

function updateBook(data, id, setSuccessMessage, setErrorMessage ){
    console.log(data);
    axios.patch(`${baseUrl}/book/${id}`, data)
            .then((response) => {
              console.log('Datos actualizados:', response.data)
              setSuccessMessage("El libro se ha creado con éxito");
              setErrorMessage(null); 
          }) 
          .catch((error) => {
            console.error('Error al actualizar los datos:', error)
            if (error.response && error.response.data && error.response.data.errors) {
                const errorMessages = Object.values(error.response.data.errors).flat();
                setErrorMessage(errorMessages.join(", "));
            }
            else{
              setErrorMessage("Error al crear el usuario: " + error.message);
              setSuccessMessage(null); 
            }
          });
}

export {getBooks, filterBooks,getBookById, deleteBook, createBook, updateBook}