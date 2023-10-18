import axios from 'axios';

const baseUrl = 'http://localhost:8000/api';

//Funcion encargarda de traer todos los libros en la api
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

//Funcion que filtra los libros en la api por nombre o autor (o ambos)
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

  //Funcion que busca un libro en la api por su id y lo trae si existe
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


//Funcion que dado un id buscara un libro en la api y lo borrara si existe
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

//Funcion encargada de dar de alta un libro en la api
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

//Funcion encargada de actualizar un libro en la api
function updateBook(data, id, setSuccessMessage, setErrorMessage ){
    console.log(data);
    axios.put(`${baseUrl}/book/${id}`, data)
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