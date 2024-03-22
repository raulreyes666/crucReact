//App.jsx 
import React, { useState } from 'react';
import PlatilloForm from './PlatilloComponent/PlatilloForm';
import PlatillosList from './PlatilloComponent/PlatillosList'; // Importa el componente PlatillosList

// Definición del componente App
function App() {
  // Estado para almacenar la lista de platillos y el ID del platillo en edición
  const [platillos, setPlatillos] = useState([]);
  const [editPlatilloId, setEditPlatilloId] = useState(null); // Cambio aquí

  // Función para guardar un platillo (nuevo o editado)
  const handleSavePlatillo = (nuevoPlatillo) => {
    if (editPlatilloId !== null) { // Si estamos editando un platillo existente
      const updatedPlatillos = platillos.map(platillo => {
        if (platillo.id === editPlatilloId) {
          return nuevoPlatillo;
        }
        return platillo;
      });
      setPlatillos(updatedPlatillos);
      setEditPlatilloId(null); // Restablece editPlatilloId a null después de guardar
    } else { // Si estamos creando un nuevo platillo
      setPlatillos([...platillos, nuevoPlatillo]);
    }
  };

  // Función para cancelar la edición o creación de un platillo
  const handleCancelEdit = () => {
    setEditPlatilloId(null);
  };

  // Función para manejar la edición de un platillo
  const handleEditPlatillo = (id) => {
    setEditPlatilloId(id);
  };

  // Función para manejar la eliminación de un platillo
  const handleDeletePlatillo = (id) => {
    const updatedPlatillos = platillos.filter(platillo => platillo.id !== id);
    setPlatillos(updatedPlatillos);
  };

  // Renderizado del componente App
  return (
    <div>
      <h1>Gestión de Platillos</h1>
      {/* Renderizar PlatilloForm */}
      <PlatilloForm 
        onSave={handleSavePlatillo} 
        onCancel={handleCancelEdit} 
        platillo={editPlatilloId !== null ? platillos.find(platillo => platillo.id === editPlatilloId) : null} 
      />
      
      {/* Renderizar PlatillosList y pasar las propiedades necesarias */}
      <PlatillosList 
        platillos={platillos} 
        onEditPlatillo={handleEditPlatillo} 
        onDeletePlatillo={handleDeletePlatillo} 
      />
    </div>
  );
}

export default App;
