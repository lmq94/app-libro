import React, { useState, useEffect } from "react";
import {getBooks} from "./ApiService"

function Crud  ()  {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    // Simulación de carga de datos iniciales desde una API
        getBooks(setItems);
    
  }, []);

  // ... (resto del código de creación, edición y eliminación)

  return (
    <div>
      <h1>CRUD Component</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    {editingItem ? (
        <button onClick={handleUpdate}>Actualizar</button>
      ) : (
        <button onClick={handleCreate}>Crear</button>
    )}

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <article>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
            </article>
            <button onClick={() => handleEdit(item.id)}>Editar</button>
            <button onClick={() => handleDelete(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Crud;