import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function Ganado() {
  const [ganados, setGanados] = useState([]);
  const [raza, setRaza] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [creado, setCreado] = useState('');
  const [editado, setEditado] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ganadoToDelete, setGanadoToDelete] = useState(null);
  const [ganadoId, setGanadoId] = useState(null); // Nuevo estado para almacenar el ID del ganado a editar
  const [searchQuery, setSearchQuery] = useState('');



  

  useEffect(() => {
    cargarGanados();
  }, []);

  function handleModalOpen(id) {
    if (id) {
      const ganado = ganados.find((g) => g.id === id);
      if (ganado) {
        setRaza(ganado.raza);
        setDescripcion(ganado.descripcion);
        setCreado(ganado.creado);
        setEditado(ganado.editado);

        setGanadoId(id);
        setShowModal(true);
      }
    } else {
      resetForm();
      setShowModal(true);
    }
  }

  function handleModalClose() {
    setShowModal(false);
  }

  function handleCancelar() {
    resetForm();
    setShowModal(false);
  }

  const cargarGanados = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/razas/');
      setGanados(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const buscarGanados = async (query) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/razas/?search=${query}`);
      setGanados(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const crearGanado = async (e) => {
    e.preventDefault();
    try {
      const nuevoGanado = {
        raza:raza,
        descripcion:descripcion,
        creado:creado,
        editado:editado,
      };
      await axios.post('http://localhost:8081/api/razas/', nuevoGanado);
      cargarGanados();
      resetForm();
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };


 

  const editarGanado = async (e) => {
    console.log(e);
    e.preventDefault();
    try {
      const ganadoModificado = {
        raza:raza,
        descripcion:descripcion,
        creado:creado,
        editado:editado,
      };
      console.log(ganadoModificado)
      await axios.put(`http://localhost:8081/api/razas/${ganadoId}/`, ganadoModificado);
      cargarGanados();
      resetForm();
      handleModalClose();
    } catch (error) {
      console.error("error de conexion",error);
    }
  };

  const eliminarGanado = (ganado) => {
    setGanadoToDelete(ganado);
    setShowDeleteModal(true);
  };

  const handleEliminarConfirmado = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/razas/${id}/delete/`);
      cargarGanados();
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  const resetForm = () => {
        setRaza('');
        setDescripcion('');
        setCreado('');
        setEditado('');

    setGanadoId(null);
  };

  return (
    <div className="container">
      <div className="container">
        <h1 className="mt-4 text-center h2">LISTA DE RAZA</h1> <br />
        
        <button
  type="button"
  className="btn btn-success"
  onClick={() => {
    handleModalOpen();
    setGanadoId(null);
  }}
>
  Crear la raza
</button>
        <br></br><br></br><br></br>
         <form className="mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar ganado"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => buscarGanados(searchQuery)}
              >
                Buscar
              </button>
            </div>
          </div>
        </form>
 
        <br></br><br></br>

        <table className="table table-responsive-sm table-striped table-bordered">
  <thead className="thead-dark">
    <tr>
      <th>Categoría</th>
      <th>Descripción</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {ganados.map((ganado) => (
      <tr key={ganado.id}>
        <td>{ganado.raza}</td>
        <td>{ganado.descripcion}</td>
        <td>
          <div className="d-flex flex-column flex-sm-row">
            <button className="btn btn-primary mb-2 mb-sm-0 mr-sm-2" onClick={() => handleModalOpen(ganado.id)}>Editar</button>
            <button className="btn btn-danger" onClick={() => eliminarGanado(ganado)}>Eliminar</button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {ganadoId ? 'Editar Raza' : 'Crear Raza'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={ganadoId ? editarGanado : crearGanado}>
          
            
            
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="raza"
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
                required
              />
            </div>
           
            
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>
            
           
            <Button variant="secondary" onClick={handleCancelar}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </form>
        </Modal.Body>
      </Modal>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Raza</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar la raza?</p>
          <p>Nombre: {ganadoToDelete?.raza}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleEliminarConfirmado(ganadoToDelete?.id)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>


     
    </div>
  );
}

export default Ganado;
