import React from 'react';

const TimesTable = ({ factor, max }) => {
  const a = parseInt(factor, 10);
  const m = parseInt(max, 10);

  if (!Number.isFinite(a) || !Number.isFinite(m) || a <= 0 || m <= 0) {
    return <div className="alert alert-warning">Ingrese números positivos</div>;
  }

  const items = Array.from({ length: m }, (_, i) => i + 1);

  return (
    <div>
      <h4 className="mb-3">Multiplicación de {a}</h4>
      <ul className="list-group">
        {items.map((n) => (
          <li key={n} className="list-group-item d-flex justify-content-between align-items-center">
            {a} × {n}
            <span className="badge bg-primary rounded-pill">{a * n}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimesTable;
