import React, { useEffect, useReducer, useMemo } from 'react';

const initial = { data: [], loading: true, q: '', error: '' };

function reducer(state, action) {
  switch (action.type) {
    case 'ok':
      return { ...state, data: action.payload, loading: false };
    case 'fail':
      return { ...state, error: 'Error cargando países', loading: false };
    case 'q':
      return { ...state, q: action.payload };
    default:
      return state;
  }
}

const CountryListTable = () => {
  const [state, dispatch] = useReducer(reducer, initial);

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
      'cca2',
      'cca3',
      'flags',
      'continents',
      'tld',
      'idd',
      'status',
      'unMember',
      'startOfWeek'
    ].join(',');

    fetch(`https://restcountries.com/v3.1/all?fields=${fields}`)
      .then((r) => r.json())
      .then((d) => dispatch({ type: 'ok', payload: Array.isArray(d) ? d : [] }))
      .catch(() => dispatch({ type: 'fail' }));
  }, []);

  const nameEs = (c) => c?.translations?.spa?.common || c?.name?.common || '';
  const iddText = (idd) => {
    const root = idd?.root || '';
    const suff = Array.isArray(idd?.suffixes) ? idd.suffixes.join(', ') : '';
    return root && suff ? `${root}${suff}` : root || suff;
  };
  const langsText = (langs) => Object.values(langs || {}).join(', ');
  const currText = (currs) =>
    Object.entries(currs || {})
      .map(([code, info]) => `${code}${info?.name ? ` ${info.name}` : ''}${info?.symbol ? ` ${info.symbol}` : ''}`.trim())
      .join(', ');

  const rows = useMemo(() => {
    const q = state.q.trim().toLowerCase();
    const list = state.data.slice();
    list.sort((a, b) => nameEs(a).localeCompare(nameEs(b)));
    if (!q) return list;
    return list.filter((c) => nameEs(c).toLowerCase().includes(q));
  }, [state.data, state.q]);

  if (state.loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando países...</p>
      </div>
    );
  }

  if (state.error) {
    return <div className="alert alert-danger m-4">{state.error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Países (Vista Detallada)</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar país"
          value={state.q}
          onChange={(e) => dispatch({ type: 'q', payload: e.target.value })}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th>Bandera</th>
              <th>Nombre</th>
              <th>Oficial</th>
              <th>CCA2</th>
              <th>CCA3</th>
              <th>Capital</th>
              <th>Continentes</th>
              <th>TLD</th>
              <th>Teléfono</th>
              <th>Región</th>
              <th>Subregión</th>
              <th>Población</th>
              <th>Área</th>
              <th>Idiomas</th>
              <th>Monedas</th>
              <th>ONU</th>
              <th>Inicio Semana</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c, i) => (
              <tr key={i}>
                <td>{c.flags?.png && (<img src={c.flags.png} alt={nameEs(c)} width={36} height={24} style={{ objectFit: 'cover' }} />)}</td>
                <td>{nameEs(c)}</td>
                <td>{c.name?.official || ''}</td>
                <td>{c.cca2 || ''}</td>
                <td>{c.cca3 || ''}</td>
                <td>{c.capital?.join(', ') || ''}</td>
                <td>{(c.continents || []).join(', ')}</td>
                <td>{(c.tld || []).join(', ')}</td>
                <td>{iddText(c.idd)}</td>
                <td>{c.region || ''}</td>
                <td>{c.subregion || ''}</td>
                <td>{(c.population ?? 0).toLocaleString()}</td>
                <td>{(c.area ?? 0).toLocaleString()}</td>
                <td>{langsText(c.languages)}</td>
                <td>{currText(c.currencies)}</td>
                <td>{c.unMember ? 'Sí' : 'No'}</td>
                <td>{c.startOfWeek || ''}</td>
                <td>{c.status || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && (
        <div className="alert alert-warning text-center">Sin resultados</div>
      )}
    </div>
  );
};

export default CountryListTable;
