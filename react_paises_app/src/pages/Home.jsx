import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <section className="row align-items-center g-4">
        <div className="col-12 col-md-6">
          <h1 className="fw-bold display-5">Datos de países en un vistazo</h1>
          <p className="text-muted">Consulta nombres, capitales, banderas y población. Explora vistas compactas y detalladas.</p>
          <div className="d-flex flex-wrap gap-2 mt-3">
            <Link to="/countries" className="btn btn-primary btn-lg">Explorar países</Link>
            <Link to="/countries-table" className="btn btn-outline-success btn-lg">Vista compacta</Link>
            <Link to="/countries-data" className="btn btn-outline-warning btn-lg">Vista detallada</Link>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="row g-3">
            <div className="col-12">
              <div className="card">
                <img src="https://placehold.co/800x360/EEE/333?text=Pa%C3%ADses" className="card-img-top" alt="Países" />
                <div className="card-body">
                  <h5 className="card-title">Explora por tarjetas</h5>
                  <p className="card-text">Visualización sencilla con filtros por nombre.</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">Tabla compacta</h6>
                  <p className="card-text">Lista ordenada con datos clave.</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">Tabla detallada</h6>
                  <p className="card-text">Información ampliada de cada país.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
