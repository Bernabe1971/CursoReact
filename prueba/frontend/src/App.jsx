import { useEffect, useState } from 'react';

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/tareas').then(r => r.json()).then(setTareas);
  }, []);

  const agregar = async (e) => {
    e.preventDefault();
    const r = await fetch('/api/tareas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto })
    });
    const data = await r.json();
    if (!r.ok) return setError(data.error);
    setTareas([...tareas, data]);
    setTexto('');
    setError('');
  };

  return (
    <div>
      <h1>Mis tareas</h1>
      <form onSubmit={agregar}>
        <input value={texto} onChange={e => setTexto(e.target.value)} placeholder="Nueva tarea" />
        <button type="submit">Guardar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tareas.map(t => <li key={t.id}>{t.texto}</li>)}
      </ul>
    </div>
  );
}
