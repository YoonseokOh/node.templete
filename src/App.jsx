import { useEffect, useState } from 'react';

const cards = [
  {
    label: 'Frontend',
    value: 'React',
  },
  {
    label: 'Bundler',
    value: 'Vite',
  },
  {
    label: 'Backend',
    value: 'Express',
  },
];

export default function App() {
  const [apiState, setApiState] = useState('Checking');

  useEffect(() => {
    let active = true;

    fetch('/ping')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        if (active) {
          setApiState(data?.message || data?.msg || 'Connected');
        }
      })
      .catch(() => {
        if (active) {
          setApiState('Unavailable');
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="brand-mark" aria-hidden="true">
          T
        </div>
        <div>
          <p className="eyebrow">node.templete</p>
          <h1>templete</h1>
          <p className="summary">
            The Express app now serves a compiled React front end while keeping the
            existing backend routes available.
          </p>
        </div>
      </section>

      <section className="status-grid" aria-label="Runtime status">
        {cards.map((card) => (
          <article className="status-card" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
        <article className="status-card status-card--wide">
          <span>API</span>
          <strong>{apiState}</strong>
        </article>
      </section>
    </main>
  );
}
