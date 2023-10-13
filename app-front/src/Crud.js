import React, { useState, useEffect } from "react";
import {getBooks, deleteBook} from "./ApiService"

function Crud  ()  {
    const [items, setItems] = useState([]);
    const [refresh, setRefresh] = useState(false);

    let noMostrar = ['id', 'created_at', 'updated_at'];


    useEffect(() => {
        getBooks(setItems);
    }, [refresh]); 

    const handleDelete = (id) => {
            deleteBook(id);
        
            setRefresh(true);
        
    };

    useEffect(() => {
        setRefresh(false);
    }, [refresh]);


    return (
        <div>
          <h1>Libros</h1>
          <div className = "table-responsive mt-5">
            <table className = "table table-bordered">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Autor</th>
                  <th>Fecha de edición</th>
                  <th>Borrar o Editar</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    {Object.keys(item).map((key) => (
                      !noMostrar.includes(key) && (
                        <td key={key}>{item[key]}</td>
                      )
                    ))}
                    <td>
                      <button className = "btn btn-primary m-1">Editar</button>
                      <button onClick = {() => handleDelete(item.id)} className = "btn btn-danger m-1">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

}


export default Crud;