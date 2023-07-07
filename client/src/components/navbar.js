import '../custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from '../assets/logo-branco.png';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/user";

const NavItem = ({ icon, text, to }) => {
  return (
    <li className="nav-item p-2 border">
      <Link className="nav-link text-white" to={to}>
        {icon && <i className={`bi ${icon} icon-left`}></i>}
        {text}
        <i className="bi bi-caret-right-fill icon-right"></i>
      </Link>
    </li>
  );
};

const NavItemDrop = ({ icon, text, subItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);

  const toggleSubMenu = () => {
    if (isOpen) {
      setIsAnimationVisible(true);
      setTimeout(() => {
        setIsAnimationVisible(false);
        setTimeout(() => {
          setIsOpen(false);
        }, 150);
      }, 0);
    } else {
      setIsOpen(true);
      setIsAnimationVisible(true);
    }
  };

  return (<div>
    <li className="nav-item p-2 border" onClick={toggleSubMenu} aria-expanded={isOpen}>
      <Link className="nav-link text-white">
        {icon && <i className={`bi ${icon} icon-left`}></i>}
        {text}
        <i className={`bi ${isAnimationVisible ? ' bi-caret-down-fill rotate-icon ' : 'bi-caret-right-fill rotate-icon unrotate'} icon-right`}></i>
      </Link>

    </li>
    {subItems && isOpen && (
      <ul className={`subItems bg-secondary list-unstyled ${isAnimationVisible ? 'sub-nav-item-animation' : 'sub-nav-item-animation-reverse'}`}>
        {subItems}
      </ul>
    )}
  </div>

  );
};

const SubNavItem = ({ icon, text, to }) => {
  return (
    <li className="px-2 nav-item border">
      <Link className="subNav nav-link text-white" to={to}>
        {icon && <i className={`bi ${icon} icon-left`}></i>}
        {text}
        <i className="bi bi-caret-right-fill icon-right"></i>
      </Link>
    </li>
  );
};

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);
  const [cargo, setCargo] = useState("");
  
  function logout() {
    try {
      localStorage.removeItem('userId');
      console.log('Logout successful');
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  }

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    setIsAnimationVisible(true);
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const url = baseURL + '/get/' + userId;
    axios.get(url)
      .then(res => {
        setCargo(res.data.data.cargo.cargoId);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const AdministradorNavbar = ({ isNavOpen, isAnimationVisible, toggleNav }) => {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary position-fixed top-0 start-0" style={{ width: "100%" }}>
          <button
            className="navbar-toggler border-0 shadow-none ps-3"
            type="button"
            onClick={toggleNav}
            aria-expanded={isNavOpen}
            aria-label="Toggle Navigation"
          >
            {isNavOpen ? (
              <img src={logo} alt="Logo Softinsa" className={`img-fluid logo ${isAnimationVisible ? "nav-item-animation" : "nav-item-animation-reverse"} `} style={{ height: "40px" }} />
            ) : (
              <span className="bi-list h2 text-white"></span>
            )}
          </button>
          <div><i className="bi bi-bell-fill text-white p-3"></i></div>
        </nav>
        <div className={`overlay${isNavOpen ? " overlay-open" : "overlay-closed"}`} onClick={toggleNav}></div>
        <aside
          className={`sidebar position-fixed top-0 start-0 d-flex flex-column justify-content-between bg-primary${isNavOpen ? " sidebar-open" : ""}`}
        >
          <div className="nav-item-container" style={{ marginTop: isNavOpen ? '65px' : '0' }}>
            <ul className="nav flex-column ">
              <NavItem icon="bi-house-door-fill" text="Início" to="/homepage" />
              <NavItemDrop icon="bi-people-fill" text="Utilizadores" subItems={[
                <ul key="subitem1" className='list-unstyled'>
                  <SubNavItem icon="bi-book-fill" text="Consultar" to="/user" />
                </ul>,
                <ul key="subitem2" className='list-unstyled'>
                  <SubNavItem icon="bi-plus-circle-fill" text="Adicionar" to="/user/create" />
                </ul>,
              ]} />
              <NavItemDrop icon="bi-building" text="Filiais" subItems={[
                <ul key="subitem1" className='list-unstyled'>
                  <SubNavItem icon="bi-book-fill" text="Consultar" to="/filial" />
                </ul>,
                <ul key="subitem2" className='list-unstyled'>
                  <SubNavItem icon="bi-plus-circle-fill" text="Adicionar" to="/filial/create" />
                </ul>,
              ]} />
              <NavItemDrop icon="bi-collection" text="Departamentos" subItems={[
                <ul key="subitem1" className='list-unstyled'>
                  <SubNavItem icon="bi-book-fill" text="Consultar" to="/departamento" />
                </ul>,
                <ul key="subitem2 " className='list-unstyled'>
                  <SubNavItem icon="bi-plus-circle-fill" text="Adicionar" to="/departamento/create" />
                </ul>,
              ]} />
              <NavItem icon="bi-briefcase-fill" text="Oportunidades" to="/oportunidade" />
              <NavItemDrop icon="bi-search" text="Vagas/Ofertas" subItems={[
                <ul key="subitem1" className='list-unstyled'>
                  <SubNavItem icon="bi-book-fill" text="Consultar" to="/vaga" />
                </ul>,
                <ul key="subitem2" className='list-unstyled'>
                  <SubNavItem icon="bi-plus-circle-fill" text="Adicionar" to="/vaga/create" />
                </ul>,
              ]} />
              <NavItem icon="bi-clipboard2-fill" text="Candidaturas" to={"/candidatura"} />
              <NavItemDrop icon="bi-lightbulb" text="Ideias" subItems={[
                <ul key="subitem1" className='list-unstyled'>
                  <SubNavItem icon="bi-book-fill" text="Consultar" to="/ideia" />
                </ul>,
                <ul key="subitem2" className='list-unstyled'>
                  <SubNavItem icon="bi-plus-circle-fill" text="Adicionar" to="/ideia/create" />
                </ul>,
              ]} />
              <NavItemDrop icon="bi-plus-circle-fill" text="Benefícios" subItems={[
                <ul key="subitem1" className='list-unstyled'>
                  <SubNavItem icon="bi-book-fill" text="Consultar" to="/beneficio" />
                </ul>,
                <ul key="subitem2" className='list-unstyled'>
                  <SubNavItem icon="bi-plus-circle-fill" text="Adicionar" to="/beneficio/create" />
                </ul>,
              ]} />
              <NavItem icon="bi-graph-up-arrow" text="Reporting" to="/reporting" />
              <NavItem icon="bi-calendar2-week-fill" text="Calendário" to="/calendario" />
              <NavItem icon="bi-person-fill" text="Os meus dados" to="/conta" />
              <NavItem icon="bi-info-circle" text="Sobre" to="/about" />
              <NavItem icon="bi-envelope-fill" text="Contactos" to="/contact" />
              <NavItem icon="bi-door-open-fill" text="Logout" onClick={logout} to="/login" />
            </ul>
          </div>
          <div className="nav-item-container flex-grow-1"></div>
          <div className="nav-item-container" style={{ bottom: "0" }}>
            <ul className="nav flex-column">

            </ul>
          </div>
        </aside>
      </div>
    );
  };

  const GestorNavbar = ({ isNavOpen, isAnimationVisible, toggleNav }) => {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary position-fixed top-0 start-0" style={{ width: "100%" }}>
          <button
            className="navbar-toggler border-0 shadow-none ps-3"
            type="button"
            onClick={toggleNav}
            aria-expanded={isNavOpen}
            aria-label="Toggle Navigation"
          >
            {isNavOpen ? (
              <img src={logo} alt="Logo Softinsa" className={`img-fluid logo ${isAnimationVisible ? "nav-item-animation" : "nav-item-animation-reverse"} `} style={{ height: "40px" }} />
            ) : (
              <span className="bi-list h2 text-white"></span>
            )}
          </button>
          <div><i className="bi bi-bell-fill text-white p-3"></i></div>
        </nav>
        <div className={`overlay${isNavOpen ? " overlay-open" : "overlay-closed"}`} onClick={toggleNav}></div>
        <aside
          className={`sidebar position-fixed top-0 start-0 d-flex flex-column justify-content-between bg-primary${isNavOpen ? " sidebar-open" : ""}`}
        >
          <div className="nav-item-container" style={{ marginTop: isNavOpen ? '65px' : '0' }}>
            <ul className="nav flex-column ">
              <NavItem icon="bi-house-door-fill" text="Início" to="/homepage" />
              <NavItem icon="bi-building" text="Filiais" to="/filial" />
              <NavItem icon="bi-collection" text="Departamentos" to="/departamento" />
              <NavItem icon="bi-briefcase-fill" text="Oportunidades" to="/oportunidade" />
              <NavItem icon="bi-search" text="Vagas/Ofertas" to="/vaga" />
              <NavItemDrop icon="bi-lightbulb" text="Ideias" subItems={[
                <ul key="subitem1" className='list-unstyled'>
                  <SubNavItem icon="bi-book-fill" text="Consultar" to="/ideia" />
                </ul>,
                <ul key="subitem2" className='list-unstyled'>
                  <SubNavItem icon="bi-plus-circle-fill" text="Adicionar" to="/ideia/create" />
                </ul>,
              ]} />
              <NavItem icon="bi-plus-circle-fill" text="Benefícios" to="/beneficio" />
              <NavItem icon="bi-calendar2-week-fill" text="Calendário" to="/calendario" />
              <NavItem icon="bi-person-fill" text="Os meus dados" to="/conta" />
              <NavItem icon="bi-info-circle" text="Sobre" to="/about" />
              <NavItem icon="bi-envelope-fill" text="Contactos" to="/contact" />
              <NavItem icon="bi-door-open-fill" text="Logout" onClick={logout} to="/login" />
            </ul>
          </div>
        </aside>
      </div>
    );
  };

  const ColaboradorNavbar = ({ isNavOpen, isAnimationVisible, toggleNav }) => {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary position-fixed top-0 start-0" style={{ width: "100%" }}>
          <button
            className="navbar-toggler border-0 shadow-none ps-3"
            type="button"
            onClick={toggleNav}
            aria-expanded={isNavOpen}
            aria-label="Toggle Navigation"
          >
            {isNavOpen ? (
              <img src={logo} alt="Logo Softinsa" className={`img-fluid logo ${isAnimationVisible ? "nav-item-animation" : "nav-item-animation-reverse"} `} style={{ height: "40px" }} />
            ) : (
              <span className="bi-list h2 text-white"></span>
            )}
          </button>
          <div><i className="bi bi-bell-fill text-white p-3"></i></div>
        </nav>
        <div className={`overlay${isNavOpen ? " overlay-open" : "overlay-closed"}`} onClick={toggleNav}></div>
        <aside
          className={`sidebar position-fixed top-0 start-0 d-flex flex-column justify-content-between bg-primary${isNavOpen ? " sidebar-open" : ""}`}
        >
          <div className="nav-item-container" style={{ marginTop: isNavOpen ? '65px' : '0' }}>
            <ul className="nav flex-column ">
              <NavItem icon="bi-house-door-fill" text="Início" to="/homepage" />
              <NavItem icon="bi-building" text="Filiais" to="/filial" />
              <NavItem icon="bi-collection" text="Departamentos" to="/departamento" />
              <NavItem icon="bi-briefcase-fill" text="Oportunidades" to="/oportunidade" />
              <NavItem icon="bi-search" text="Vagas/Ofertas" to="/vaga" />
              <NavItem icon="bi-lightbulb" text="Fornecer uma ideia" to="/ideia/create" />
              <NavItem icon="bi-plus-circle-fill" text="Benefícios" to="/beneficio" />
              <NavItem icon="bi-calendar2-week-fill" text="Calendário" to="/calendario" />
              <NavItem icon="bi-person-fill" text="Os meus dados" to="/conta" />
              <NavItem icon="bi-info-circle" text="Sobre" to="/about" />
              <NavItem icon="bi-envelope-fill" text="Contactos" to="/contact" />
              <NavItem icon="bi-door-open-fill" text="Logout" onClick={logout} to="/login" />
            </ul>
          </div>
        </aside>
      </div>
    );
  };

  const CandidatoNavbar = ({ isNavOpen, isAnimationVisible, toggleNav }) => {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary position-fixed top-0 start-0" style={{ width: "100%" }}>
          <button
            className="navbar-toggler border-0 shadow-none ps-3"
            type="button"
            onClick={toggleNav}
            aria-expanded={isNavOpen}
            aria-label="Toggle Navigation"
          >
            {isNavOpen ? (
              <img src={logo} alt="Logo Softinsa" className={`img-fluid logo ${isAnimationVisible ? "nav-item-animation" : "nav-item-animation-reverse"} `} style={{ height: "40px" }} />
            ) : (
              <span className="bi-list h2 text-white"></span>
            )}
          </button>
          <div><i className="bi bi-bell-fill text-white p-3"></i></div>
        </nav>
        <div className={`overlay${isNavOpen ? " overlay-open" : "overlay-closed"}`} onClick={toggleNav}></div>
        <aside
          className={`sidebar position-fixed top-0 start-0 d-flex flex-column justify-content-between bg-primary${isNavOpen ? " sidebar-open" : ""}`}
        >
          <div className="nav-item-container" style={{ marginTop: isNavOpen ? '65px' : '0' }}>
            <ul className="nav flex-column ">
              <NavItem icon="bi-house-door-fill" text="Início" to="/homepage" />
              <NavItem icon="bi-building" text="Filiais" to="/filial" />
              <NavItem icon="bi-collection" text="Departamentos" to="/departamento" />
              <NavItem icon="bi-briefcase-fill" text="Oportunidades" to="/oportunidade" />
              <NavItem icon="bi-search" text="Vagas/Ofertas" to="/vaga" />
              <NavItem icon="bi-lightbulb" text="Fornecer uma ideia" to="/ideia/create" />
              <NavItem icon="bi-plus-circle-fill" text="Benefícios" to="/beneficio" />
              <NavItem icon="bi-calendar2-week-fill" text="Calendário" to="/calendario" />
              <NavItem icon="bi-person-fill" text="Os meus dados" to="/conta" />
              <NavItem icon="bi-info-circle" text="Sobre" to="/about" />
              <NavItem icon="bi-envelope-fill" text="Contactos" to="/contact" />
              <NavItem icon="bi-door-open-fill" text="Logout" onClick={logout} to="/login" />
            </ul>
          </div>
        </aside>
      </div>
    );
  };

  const VisitanteNavbar = ({ isNavOpen, isAnimationVisible, toggleNav }) => {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary position-fixed top-0 start-0" style={{ width: "100%" }}>
          <button
            className="navbar-toggler border-0 shadow-none ps-3"
            type="button"
            onClick={toggleNav}
            aria-expanded={isNavOpen}
            aria-label="Toggle Navigation"
          >
            {isNavOpen ? (
              <img src={logo} alt="Logo Softinsa" className={`img-fluid logo ${isAnimationVisible ? "nav-item-animation" : "nav-item-animation-reverse"} `} style={{ height: "40px" }} />
            ) : (
              <span className="bi-list h2 text-white"></span>
            )}
          </button>
          <div><i className="bi bi-bell-fill text-white p-3"></i></div>
        </nav>
        <div className={`overlay${isNavOpen ? " overlay-open" : "overlay-closed"}`} onClick={toggleNav}></div>
        <aside
          className={`sidebar position-fixed top-0 start-0 d-flex flex-column justify-content-between bg-primary${isNavOpen ? " sidebar-open" : ""}`}
        >
          <div className="nav-item-container" style={{ marginTop: isNavOpen ? '65px' : '0' }}>
            <ul className="nav flex-column ">
              <NavItem icon="bi-house-door-fill" text="Início" to="/homepage" />
              <NavItem icon="bi-building" text="Filiais" to="/filial" />
              <NavItem icon="bi-collection" text="Departamentos" to="/departamento" />
              <NavItem icon="bi-briefcase-fill" text="Oportunidades" to="/oportunidade" />
              <NavItem icon="bi-search" text="Vagas/Ofertas" to="/vaga" />
              <NavItem icon="bi-lightbulb" text="Fornecer uma ideia" to="/ideia/create" />
              <NavItem icon="bi-plus-circle-fill" text="Benefícios" to="/beneficio" />
              <NavItem icon="bi-calendar2-week-fill" text="Calendário" to="/calendario" />
              <NavItem icon="bi-person-fill" text="Os meus dados" to="/conta" />
              <NavItem icon="bi-info-circle" text="Sobre" to="/about" />
              <NavItem icon="bi-envelope-fill" text="Contactos" to="/contact" />
              <NavItem icon="bi-door-open-fill" text="Logout" onClick={logout} to="/login" />
            </ul>
          </div>
        </aside>
      </div>
    );
  };

  return (
    <div>
      {cargo === 1 && (
        <AdministradorNavbar
          isNavOpen={isNavOpen}
          isAnimationVisible={isAnimationVisible}
          toggleNav={toggleNav}
        />
      )}
      {cargo === 2 && (
        <GestorNavbar
          isNavOpen={isNavOpen}
          isAnimationVisible={isAnimationVisible}
          toggleNav={toggleNav}
        />
      )}
      {cargo === 3 && (
        <ColaboradorNavbar
          isNavOpen={isNavOpen}
          isAnimationVisible={isAnimationVisible}
          toggleNav={toggleNav}
        />
      )}
      {cargo === 4 && (
        <CandidatoNavbar
          isNavOpen={isNavOpen}
          isAnimationVisible={isAnimationVisible}
          toggleNav={toggleNav}
        />
      )}
      {cargo === 5 && (
        <VisitanteNavbar
          isNavOpen={isNavOpen}
          isAnimationVisible={isAnimationVisible}
          toggleNav={toggleNav}
        />
      )}
    </div>
  );
};

export default Navbar;
