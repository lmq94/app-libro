import axios from 'axios';

const baseUrl = 'http://localhost:8000/api';


function getBooks(setItems){
    axios.get(`${baseUrl}/$books`)
        .then(response => {
            console.log(response.data);
            setItems(response.data);
        })
        .catch(error => {
            console.error(error);
        });

}

export {getBooks}