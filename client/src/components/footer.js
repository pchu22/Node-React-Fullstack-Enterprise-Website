import '../custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-primary text-light py-4 mt-auto">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-auto"><p>Políticas de Privacidade</p></div>
          <div className="col-auto"><p>Site Softinsa</p></div>
          <div className="col-auto"><p>© Softinsa 2023. Todos os direitos reservados</p></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


