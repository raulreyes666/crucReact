import React from 'react';
import './Platillo.css'
const Platillo = ({ platillo, onEdit, onDelete }) => {
  return ( 
    <div id='Platillo'>
      <h3>{platillo.comida}</h3>
      <p><strong>Descripción:</strong> {platillo.descripcion}</p>
      <p><strong>Acompañantes:</strong> {platillo.acompaniantes.join(', ')}</p>
      <p><strong>Picor:</strong> {platillo.picor}</p>
      <p><strong>Número de personas:</strong> {platillo.num_personas}</p>
      <img src={platillo.image} alt={platillo.comida} style={{ width: '250px', height: '200px' }} /> <br />
      <button onClick={() => onEdit(platillo)}>Editar</button>
      <button onClick={() => onDelete(platillo)}>Eliminar</button>
    </div>
  );
};

export default Platillo;
