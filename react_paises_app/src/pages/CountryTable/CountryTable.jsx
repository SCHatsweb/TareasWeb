import React, { useEffect, useMemo, useState } from 'react';

const CountryTable = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fields = [
      'name',
      'translations',
      'capital',
      'population',
      'area',
      'region',
      'subregion',
      'languages',
      'currencies',
      'timezones',
      'cca2',
      'cca3',
      'flags',
      'tld'
    ].join(',');

    fetch(`https://restcountries.com/v3.1/all?fields=${fields}`)
      .then((r) => r.json())
      .then((data) => {
        setCountries(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((e) => {
        setError('Error cargando países');
        setLoading(false);
      });
  }, []);

  const normalizeName = (c) => c?.translations?.spa?.common || c?.name?.common || '';

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = countries.slice();
    list.sort((a, b) => normalizeName(a).localeCompare(normalizeName(b)));
    if (!q) return list;
    return list.filter((c) => normalizeName(c).toLowerCase().includes(q));
  }, [countries, search]);

  const formatLangs = (langs) => Object.values(langs || {}).join(', ');
  const formatCurrencies = (currs) => {
    const entries = Object.entries(currs || {});
    return entries
      .map(([code, info]) => {
        const name = info?.name ? ` ${info.name}` : '';
        const symbol = info?.symbol ? ` ${info.symbol}` : '';
        return `${code}${name}${symbol}`.trim();
      })
      .join(', ');
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando países...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger m-4">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Países (vista renovada compacta)</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Buscar país"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
            <tr>
              <th>País</th>
              <th>Códigos</th>
              <th>Capital</th>
              <th>Región</th>
              <th>Demografía</th>
              <th>Idiomas</th>
              <th>Monedas</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => {
              const langs = Object.values(c.languages || {}).slice(0, 3);
              const currs = Object.entries(c.currencies || {}).slice(0, 3);
              return (
                <tr key={i}>
                  <td>
                    <div className="d-flex align-items-center">
                      {c.flags?.png && (
                        <img src={c.flags.png} alt={normalizeName(c)} width={40} height={26} style={{ objectFit: 'cover' }} className="me-2 rounded border" />
                      )}
                      <div>
                        <div className="fw-semibold">{normalizeName(c)}</div>
                        <div className="text-muted small">{c.name?.official || ''}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark me-1">{c.cca2 || ''}</span>
                    <span className="badge bg-light text-dark">{c.cca3 || ''}</span>
                  </td>
                  <td>{c.capital?.join(', ') || ''}</td>
                  <td>
                    <div>{c.region || ''}</div>
                    <div className="text-muted small">{c.subregion || ''}</div>
                  </td>
                  <td>
                    <div className="small">Pob: {(c.population ?? 0).toLocaleString()}</div>
                    <div className="small">Área: {(c.area ?? 0).toLocaleString()}</div>
                  </td>
                  <td>
                    {langs.length === 0 ? (
                      <span className="text-muted">—</span>
                    ) : (
                      langs.map((l, idx) => (
                        <span key={idx} className="badge bg-secondary me-1">{l}</span>
                      ))
                    )}
                  </td>
                  <td>
                    {currs.length === 0 ? (
                      <span className="text-muted">—</span>
                    ) : (
                      currs.map(([code, info], idx) => (
                        <span key={idx} className="badge bg-info text-dark me-1">{code}</span>
                      ))
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="alert alert-warning text-center">No se encontraron países</div>
      )}
    </div>
  );
};

export default CountryTable;
