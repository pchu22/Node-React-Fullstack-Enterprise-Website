import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
import './sidebar.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import logo from '../../assets/logo-branco.png';

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/user";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  const [cargo, setCargo] = useState("");

  useEffect(() => {
    loadUserCargo();
  }, []);

  function loadUserCargo() {
    const userId = localStorage.getItem('userId');
    const url = `${baseURL}/get/${userId}`;
    axios.get(url)
      .then(res => {
        setCargo(res.data.data.cargo.cargoId);
      }).catch(err => {
        console.error(err);
      });
  }

  const logout = () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      console.log("Logout efetuado com sucesso!");
    } catch (error) {
      console.error("Erro enquanto tentava efetuar o logout: ", error);
    }
  };

  return (
    <div className={sidebarOpen ? 'sidebar-responsive' : ''} id='sidebar'>
      <div className='sidebar-title'>
        <div className='sidebar-img'>
          <img src={logo} alt='Softinsa-Logo'></img>
        </div>
        <span
          onClick={closeSidebar}
          className='bi bi-x-lg'
          id='sidebar-icon'
          aria-hidden='true'
        />
      </div>
      <div className='sidebar-menu'>
        {cargo === 1 ? (
          <>
            <div className='sidebar-link active-menu-link'>
              <span className='bi-house-door-fill' />
              <a href='/homepage'>Página Principal</a>
            </div>
            <h2>Área Administrativa</h2>
            <div className='sidebar-link'>
              <span className='bi bi-person-fill-gear' />
              <a href='/area-administrativa'>Gestão</a>
            </div>
            <div className='sidebar-link'>
              <span className='bi bi-folder2-open' />
              <a href='/tipo-projeto'>Adicionar Tipo de Projeto</a>
            </div>
            <div className='sidebar-link'>
              <span className='bi bi-building-fill-add' />
              <a href='/area-negocio'>Adicionar Área de Negócio</a>
            </div>
            <div className='sidebar-link'>
              <span className='bi bi-bar-chart-line-fill' />
              <a href='/reporting'>Reporting</a>
            </div>
            <h2><br/></h2>
            <div className='sidebar-link'>
              <span className='bi bi-briefcase-fill' />
              <a href='/oportunidade'>Oportunidades</a>
            </div>
            <div className='sidebar-link'>
              <span className='bi bi-file-code-fill' />
              <a href='/vaga'>Vagas/Ofertas</a>
            </div>
            <div className='sidebar-link'>
              <span className='bi bi-clipboard2-fill' />
              <a href='/candidatura'>Candidaturas</a>
            </div>
            <div className='sidebar-link'>
              <span className='bi bi-lightbulb-fill' />
              <a href='/ideia'>Ideias</a>
            </div>
            <div className='sidebar-link'>
              <span className='bi bi-hand-thumbs-up-fill' />
              <a href='/beneficio'>Benefícios</a>
            </div>
            <div className='sidebar-link'>
              <span className='bi bi-calendar2-week-fill' />
              <a href='/calendario'>Calendário</a>
            </div>
            <div className='sidebar-logout' onClick={logout}>
              <span className='bi bi-door-open-fill' />
              <a href='/login'>Sair</a>
            </div>
          </>
        ) : (
          <>
            <div className='sidebar-link active-menu-link'>
              <span className='bi-house-door-fill' />
              <a href='/homepage'>Página Principal</a>
            </div>
            <h2><br /></h2>
            <div className='sidebar-link'>
              <span className='bi bi-folder-fill' />
              <a href='/area-administrativa'>Filiais/Departamentos</a>
            </div>
            <h2><br /></h2>
            <div className='sidebar-link'>
              <span className='bi bi-briefcase-fill' />
              <a href='/oportunidade'>Oportunidades</a>
            </div>
            <div className='sidebar-link'>
              <span className='bi bi-file-code-fill' />
              <a href='/vaga'>Vagas/Ofertas</a>
            </div>
            <div className='sidebar-link'>
              <span className='bi bi-clipboard2-fill' />
              <a href='/candidatura'>Candidaturas</a>
            </div>
            <div className='sidebar-link'>
              <span className='bi bi-lightbulb-fill' />
              <a href='/ideia'>Ideias</a>
            </div>
            <div className='sidebar-link'>
              <span className='bi bi-hand-thumbs-up-fill' />
              <a href='/beneficio'>Benefícios</a>
            </div>
            <div className='sidebar-link'>
              <span className='bi bi-calendar2-week-fill' />
              <a href='/calendario'>Calendário</a>
            </div>
            <div className='sidebar-logout' onClick={logout}>
              <span className='bi bi-door-open-fill' />
              <a href='/login'>Sair</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;