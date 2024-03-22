// PlatilloForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import './PlatilloForm.css';

// Definición del componente PlatilloForm
const PlatilloForm = ({ onSave, onCancel, platillo }) => {
  // Estado inicial del formulario
  const initialState = {
    comida: '',
    descripcion: '',
    acompaniantes: [],
    picor: '',
    numPersonas: 1,
    image: ''
  };

  // Estado del formulario y referencia al formulario en el DOM
  const [formData, setFormData] = useState(initialState);
  const formRef = useRef(null);

  // Efecto para actualizar el estado del formulario cuando cambia el platillo a editar
  useEffect(() => {
    if (platillo) {
      setFormData({
        comida: platillo.comida || '',
        descripcion: platillo.descripcion || '',
        acompaniantes: platillo.acompaniantes || [],
        picor: platillo.picor || '',
        numPersonas: platillo.num_personas || 1,
        image: platillo.image || ''
      });
    } else {
      setFormData(initialState);
    }
  }, [platillo]);

  // Función para manejar el cambio de estado de las casillas de verificación de acompañantes
  const handleCheckboxChange = (opcion) => {
    if (formData.acompaniantes.includes(opcion)) {
      // Si la opción ya está en la lista de acompañantes, la eliminamos
      setFormData(prevState => ({
        ...prevState, // Copia todas las propiedades del estado anterior
        acompaniantes: prevState.acompaniantes.filter(item => item !== opcion) // Actualiza la lista de acompañantes excluyendo la opción seleccionada
      }));
    } else {
      // Si la opción no está en la lista de acompañantes, la añadimos
      setFormData(prevState => ({
        ...prevState, // Copia todas las propiedades del estado anterior
        acompaniantes: [...prevState.acompaniantes, opcion] // Añade la opción seleccionada a la lista de acompañantes
      }));
    }
  };

  // Función para guardar un platillo
  const handleGuardar = () => {
    // Validación de campos obligatorios
    if (!formData.comida || !formData.descripcion || formData.acompaniantes.length === 0 || !formData.picor) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Creación de un nuevo platillo o edición de uno existente
    const nuevoPlatillo = {
      id: platillo ? platillo.id : generateUniqueId(),
      comida: formData.comida,
      descripcion: formData.descripcion,
      acompaniantes: formData.acompaniantes,
      picor: formData.picor,
      num_personas: formData.numPersonas,
      image: formData.image
    };
    onSave(nuevoPlatillo); // Llama a la función onSave pasando el nuevo platillo
    formRef.current.reset(); // Restablecer el formulario
    setFormData(initialState); // Restablecer el estado del formulario
  };

  // Función para cancelar la edición o creación de un platillo
  const handleCancelar = () => {
    onCancel(); // Llama a la función onCancel
    formRef.current.reset(); // Restablecer el formulario
    setFormData(initialState); // Restablecer el estado del formulario
  };

  // Renderizado del componente PlatilloForm
  return (
    <div>
      <h2>{platillo ? 'Editar Platillo' : 'Agregar Platillo'}</h2>
      <form ref={formRef}>
        {/* Campos del formulario */}
        {/* Input para el título del platillo */}
        <label>
          Título del Platillo:
          <input required type="text" value={formData.comida} onChange={(e) => setFormData(prevState => ({ ...prevState, comida: e.target.value }))} />
        </label>
        <br />
        {/* Textarea para la descripción del platillo */}
        <label>
          Descripción del Platillo:
          <textarea required value={formData.descripcion} onChange={(e) => setFormData(prevState => ({ ...prevState, descripcion: e.target.value }))} />
        </label>
        <br />
        {/* Casillas de verificación para los acompañantes */}
        <label>
          Acompañantes:
          <br />
          {['Salsa verde', 'Salsa roja', 'Aguacate', 'Cebollitas'].map((opcion, index) => (
            <div key={index}>
              <input required
                type="checkbox"
                value={opcion}
                checked={formData.acompaniantes.includes(opcion)}
                onChange={() => handleCheckboxChange(opcion)}
              />
              {opcion}
            </div>
          ))}
        </label>
        <br />
        {/* Radiobuttons para el picor */}
        <label>
          Picor:
          <br />
          {['Sin picante', 'No pica', 'Sí pica'].map((opcion, index) => (
            <div key={index}>
              <input required
                type="radio"
                value={opcion}
                checked={formData.picor === opcion}
                onChange={() => setFormData(prevState => ({ ...prevState, picor: opcion }))}
              />
              {opcion}
            </div>
          ))}
        </label>
        <br />
        {/* Selección de número de personas */}
        <label>
          Número de Personas:
          <select value={formData.numPersonas} onChange={(e) => setFormData(prevState => ({ ...prevState, numPersonas: e.target.value }))}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>
        <br />
        {/* Input para la URL de la imagen */}
        <label>
          URL de la Imagen:
          <input type="text" value={formData.image} onChange={(e) => setFormData(prevState => ({ ...prevState, image: e.target.value }))} />
        </label>
        <br />
        {/* Botones para guardar y cancelar */}
        <button type="button" onClick={handleGuardar}>Guardar</button>
        <button type="button" onClick={handleCancelar}>Cancelar</button>
      </form>
    </div>
  );
};

// Función para generar un ID único
const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9); // Genera un identificador único de 9 caracteres
};

// Exportación del componente PlatilloForm
export default PlatilloForm;
