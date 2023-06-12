import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
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
       </div>
     </section>
     <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        Derechos reservados por los desarrolladores &copy; {new Date().getFullYear()}
        <br></br>
        <b>@Alexis-Caratar</b>-<b>@Edwin-jojoa</b>
      </div>
   </footer>
  );
};

export default Footer;
