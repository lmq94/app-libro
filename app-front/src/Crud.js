import React, { useState, useEffect } from "react";
import { filterBooks, getBooks, getBookById, deleteBook } from "./ApiService";

function Crud() {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    author: "",
  });
  const [id, setId] = useState("");
  const [error, setError] = useState(null);
  const [showNoResults, setShowNoResults] = useState(false);

  let noMostrar = ["id", "created_at", "updated_at"];

  useEffect(() => {
    if (filter.name === "" && filter.author === "" && id === "") {
      getBooks(setItems);
    } else 
        if (showNoResults) {
          setItems([]);
    }
  }, [refresh, filter, showNoResults, id]);

  const handleDelete = (id) => {
    deleteBook(id);
    setRefresh(true);
  };

  const handleFilter = () => {
    if (id !== "") {
      getBookById(id, handleFilterResults);
    } else {
      setItems([]);
      filterBooks(filter, handleFilterResults); 
    }
  
  
  };
  
  const handleFilterById = () => {
    if (id !== "") {
      getBookById(id, (data, error) => {
        if (error) {
          setError(error);
          setItems([]);
          setShowNoResults(true); // No se encontraron resultados, establece showNoResults en true
        } else {
          const itemsArray = Array.isArray(data) ? data : [data];
          if (itemsArray.length === 0) {
            setShowNoResults(true); // No se encontraron resultados, establece showNoResults en true
          } else {
            setShowNoResults(false); // Se encontraron resultados, establece showNoResults en false
          }
          setItems(itemsArray);
          setError(null);
        }
      });
    }
    
  };

  const handleFilterResults = (data, error) => {
    if (error) {
      setError(error);
      setItems([]);
      setShowNoResults(true); // No se encontraron resultados, establece showNoResults en true
    } else {
      const itemsArray = Array.isArray(data) ? data : [data];
      if (itemsArray.length === 0) {
        setShowNoResults(true); // No se encontraron resultados, establece showNoResults en true
      } else {
        setShowNoResults(false); // Se encontraron resultados, establece showNoResults en false
      }
      setItems(itemsArray);
      setError(null);
    }
  };

  const handleReloadTable = () => {
    getBooks(setItems); // Recarga la tabla al obtener todos los libros
    setError(null); // Limpia el mensaje de error
    setShowNoResults(false); // Oculta el mensaje de no se encontraron resultados
  };

  useEffect(() => {
    setRefresh(false);
  }, [refresh]);

  return (
    <div>
      <h1 className = "mt-5">Libros</h1>
      <div className = "filter">
          <input
            type = "text"
            placeholder = "Filtrar por nombre"
            value = {filter.name}
            onChange = {(e) => setFilter({ ...filter, name: e.target.value })}
            className = "mt-3 ms-2"
          />
          <input
            type = "text"
            placeholder = "Filtrar por autor"
            value = {filter.author}
            onChange = {(e) => setFilter({ ...filter, author: e.target.value })}
            className = "mt-3 ms-2"
            
          />
          <input
            type = "text"
            placeholder = "Filtrar por ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className = "mt-3 ms-2 mx-2 mb-2"
          />
          <button onClick = {handleFilter} className = "btn btn-secondary mx-3 mb-2">Filtrar por Nombre o Autor</button>
          <button onClick = {handleFilterById} className = "btn btn-secondary mx-3 mb-2">Filtrar por ID</button>
      </div>
      {error ? (
        <div className = "error-message">
          <p style = {{ backgroundColor: "red" }}>{error}</p>
          <button onClick={handleReloadTable} className="btn btn-primary mt-2">
            Recargar Tabla
        </button>
        </div>
      ) : showNoResults ? (
        <div className = "error-message">
          <p style = {{ backgroundColor: "red" }}>No se ha encontrado ningún libro</p>
          <button onClick={handleReloadTable} className="btn btn-primary mt-2">
            Recargar Tabla
        </button>
        </div>
      ) : (
        <div className = "table-responsive mt-5">
          <table className="table table-bordered">
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
                <tr key = {index}>
                  {Object.keys(item).map((key) => (
                    !noMostrar.includes(key) && <td key = {key}>{item[key]}</td>
                  ))}
                  <td>
                  <a href={`/edit/${item.id}`} className="btn btn-primary m-1"> Editar</a>
                    <button
                      onClick = {() => handleDelete(item.id)}
                      className = "btn btn-danger m-1"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Crud;