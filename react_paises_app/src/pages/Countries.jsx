import React, { useEffect, useState } from 'react';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,translations,flags,capital,population')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando países:", err);
        setLoading(false);
      });
  }, []);

  const filteredCountries = countries.filter(country => {
    const name = country.translations?.spa?.common || country.name?.common || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando países...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Países</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="list-group">
        {filteredCountries.map((country, index) => (
          <li className="list-group-item d-flex align-items-center" key={index}>
            {country.flags?.png && (
              <img
                src={country.flags.png}
                alt={`Bandera de ${country.name.common}`}
                width={48}
                height={32}
                style={{ objectFit: 'cover' }}
                className="me-3 rounded border"
              />
            )}
            <div className="flex-grow-1">
              <div className="fw-semibold">
                {country.translations?.spa?.common || country.name.common}
              </div>
              <div className="text-muted small">
                Capital: {country.capital ? country.capital.join(', ') : 'N/A'} • Población: {country.population.toLocaleString()}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {filteredCountries.length === 0 && (
        <div className="alert alert-warning text-center mt-3">Sin resultados</div>
      )}
    </div>
  );
};

export default Countries;
