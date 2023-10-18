import React, { useState, useEffect } from "react";
import { filterBooks, getBooks, getBookById, deleteBook } from "./ApiService";


//Componente encargado de mostrar los libros de la aplicacion, tambien se puede borrar y editar libros
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

  //Datos que no se mostraran en la tabla
  let noMostrar = ["id", "created_at", "updated_at"];

  //Se encargara de mostrar todos los libros si no se usan filtros ni se busca por identificador
  useEffect(() => {
    if (filter.name === "" && filter.author === "" && id === "") {
      getBooks(setItems);
    } else 
        if (showNoResults) {
          setItems([]);
    }
  }, [refresh, filter, showNoResults, id]);

  //Evento encargado de eliminar un libro
  const handleDelete = (id) => {
    deleteBook(id);
    setRefresh(true);
  };

  //Evento encargado de filtrar por identificador o por nombre o autor
  const handleFilter = () => {
    if (id !== "") {
      getBookById(id, handleFilterResults);
    } else {
      setItems([]);
      filterBooks(filter, handleFilterResults); 
    }
  
  
  };
  
  //Encargado de mostrar el libro que se obtiene (o no) buscando por id
  const handleFilterById = () => {
    if (id !== "") {
      getBookById(id, (data, error) => {
        if (error) {
          setError(error);
          setItems([]);
          setShowNoResults(true); 
        } else {
          const itemsArray = Array.isArray(data) ? data : [data];
          if (itemsArray.length === 0) {
            setShowNoResults(true); 
          } else {
            setShowNoResults(false); 
          }
          setItems(itemsArray);
          setError(null);
        }
      });
    }
    
  };


  //Encargado de mostrar el libro que se obtiene (o no) buscando por nombre o autor
  const handleFilterResults = (data, error) => {
    if (error) {
      setError(error);
      setItems([]);
      setShowNoResults(true); 
    } else {
      const itemsArray = Array.isArray(data) ? data : [data];
      if (itemsArray.length === 0) {
        setShowNoResults(true); 
      } else {
        setShowNoResults(false); 
      }
      setItems(itemsArray);
      setError(null);
    }
  };

  //Recarga la tabla cuando no se encuentra ningun resultado cuando hay una busqueda negativa sin resultados
  const handleReloadTable = () => {
    getBooks(setItems); 
    setError(null); 
    setShowNoResults(false); 
  };

  //Refresca la tabla mostrando todos los libros
  useEffect(() => {
    setRefresh(false);
  }, [refresh]);

  //Aqui se genera el html de la tabla
  return (
    <div>
        <h1 className = "mt-5">Libros</h1>
        <div className = "justify-content-center">
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