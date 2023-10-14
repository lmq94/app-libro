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

export {getBooks, deleteBook, createBook}