import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import logo from './../../logo.png';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <div className="login-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="image-container"></div>
          </div>
          <div className="col-lg-6 d-flex align-items-center text-center">
            <div className="card w-100">
              <br />
              <div className="row">
                <div className="col-lg-4">
                  <img src={logo} alt="Logo" width="100" height="60" />
                </div>
                <div className="col-lg-8">
                  <label>SISTEMA DE INFORMACIÓN PARA <br /><b>GANADERIA</b></label>
                </div>
              </div>
              <hr />
              <div className="card-body d-flex flex-column justify-content-center">
                <h2 className="card-title">Inicio de Sesión</h2><br/>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      <FaUser className="me-2" />
                      Usuario:
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Ingrese usuario"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      <FaLock className="me-2" />
                      Contraseña:
                    </label>
                    <input
                      type="password"
                      placeholder="Ingrese contraseña"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-success">Ingresar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
