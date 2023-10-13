import axios from 'axios';

const baseUrl = 'http://localhost:8000/api';


function getBooks(setItems){
    axios.get(`${baseUrl}/books`)
        .then(response => {
            console.log(response.data);
            setItems(response.data);
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

export {getBooks, deleteBook}