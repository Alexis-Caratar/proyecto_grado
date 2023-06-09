import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram,FaHome, FaCentos, FaChartLine, FaSignOutAlt } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import logo from './logo.png';



function App() {
  const [ganados, setGanados] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [numeroMarca, setNumeroMarca] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState('');
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
        setCodigo(ganado.codigo);
        setNombre(ganado.nombre);
        setRaza(ganado.raza);
        setCategoria(ganado.categoria);
        setFechaNacimiento(ganado.fechaNacimiento);
        setNumeroMarca(ganado.numeroMarca);
        setDescripcion(ganado.descripcion);
        setFoto(ganado.foto);
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
      const response = await axios.get('http://localhost:8081/api/ganados/');
      setGanados(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const buscarGanados = async (query) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/ganados/?search=${query}`);
      setGanados(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const crearGanado = async (e) => {
    e.preventDefault();
    try {
      const nuevoGanado = {
        codigo:codigo,
        nombre: nombre,
        raza: raza,
        categoria:categoria,
        fechaNacimiento:fechaNacimiento,
        numeroMarca:numeroMarca,
        descripcion:descripcion,
        foto:foto,
        creado:creado,
        editado:editado,
      };
      await axios.post('http://localhost:8081/api/ganados/', nuevoGanado);
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
        codigo:codigo,
        nombre: nombre,
        raza: raza,
        categoria:categoria,
        fechaNacimiento:fechaNacimiento,
        numeroMarca:numeroMarca,
        descripcion:descripcion,
        foto:foto,
        creado:creado,
        editado:editado,
      };
      console.log(ganadoModificado)
      await axios.put(`http://localhost:8081/api/ganados/${ganadoId}/`, ganadoModificado);
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
      await axios.delete(`http://localhost:8081/api/ganados/${id}/delete/`);
      cargarGanados();
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  const resetForm = () => {
        setCodigo('');
        setNombre('');
        setRaza('');
        setCategoria('');
        setFechaNacimiento('');
        setNumeroMarca('');
        setDescripcion('');
        setFoto('');
        setCreado('');
        setEditado('');

    setGanadoId(null);
  };

  return (
    <div className="container">
     <header>
      <br />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container d-flex justify-content-end">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" width="100" height="100" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <FaHome /> INICIO
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <FaCentos />GANADERIA
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <FaChartLine />GRAFICOS
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <FaSignOutAlt />SALIR
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>


      <div className="container">
        <h1 className="mt-4 text-center h2">LISTA DE GANADO</h1> <br />
        
        <button
  type="button"
  className="btn btn-success"
  onClick={() => {
    handleModalOpen();
    setGanadoId(null);
  }}
>
  Crear Ganado
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
      <th>Fecha Nacimiento</th>
      <th>Código</th>
      <th>Nombre</th>
      <th>Raza</th>
      <th>Categoría</th>
      <th>Número Marca</th>
      <th>Foto</th>
      <th>Descripción</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {ganados.map((ganado) => (
      <tr key={ganado.id}>
        <td>{ganado.fechaNacimiento}</td>
        <td>{ganado.codigo}</td>
        <td>{ganado.nombre}</td>
        <td>{ganado.raza}</td>
        <td>{ganado.categoria}</td>
        <td>{ganado.numeroMarca}</td>
        <td>{ganado.foto}</td>
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
            {ganadoId ? 'Editar Ganado' : 'Crear Ganado'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={ganadoId ? editarGanado : crearGanado}>
          <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Codigo"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Raza"
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="datetime-local"
                className="form-control"
                placeholder="Fecha Nacimiento"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Numero de marca"
                value={numeroMarca}
                onChange={(e) => setNumeroMarca(e.target.value)}
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
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="foto"
                value={foto}
                onChange={(e) => setFoto(e.target.value)}
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
          <Modal.Title>Eliminar Ganado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar el ganado?</p>
          <p>Nombre: {ganadoToDelete?.nombre}</p>
          <p>Raza: {ganadoToDelete?.raza}</p>
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


      <footer className="text-center text-lg-start bg-light text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Conéctate con nosotros en redes sociales:</span>
          </div>
          <div>
            <a href="#" className="me-4 text-reset">
              <FaFacebook />
            </a>
            <a href="#" className="me-4 text-reset">
              <FaTwitter />
            </a>
            <a href="#" className="me-4 text-reset">
              <FaInstagram />
            </a>
          </div>
        </section>
        <section className="p-4 pt-0">
          <div className="container text-center text-md-start">
            <div className="row">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Ganadero</h6>
                <p>
                  Esta aplicación es un sistema de gestión de ganado que te
                  permite crear, editar y eliminar registros de ganado de una
                  manera sencilla.
                </p>
              </div>
            </div>
            <label>Derechos resevados por los desarolladores <b>@Alexis-Caratar</b>-<b>@Edwin-jojoa</b></label>
          </div>
        </section>
      </footer>
    </div>
  );
}

export default App;
