
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-semibold" to="/">🌎 InfoPaíses</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-1">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'bg-primary text-white' : ''}`} to="/" end>Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'bg-primary text-white' : ''}`} to="/countries">Países</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'bg-success text-white' : ''}`} to="/countries-table">Compacta</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'bg-warning text-dark' : ''}`} to="/countries-data">Detallada</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
