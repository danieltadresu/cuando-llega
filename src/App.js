import React, { useCallback, useState } from 'react'
import { fetchNextArrivals } from './utils'
import LastSearch from './LastSearch'
import ArrivalsResult from './ArrivalsResult'
import NotFound from './NotFound'
import SearchForm from './SearchForm'

function App() {
  const [stop, setStop] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedOnce, setSubmittedOnce] = useState(false);
  const [error, setError] = useState(false);
  const [arrivals, setArrivals] = useState([]);
  const [lastUpdated, setLastUpdated] = useState();

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setSubmitting(true);

    fetchNextArrivals(stop)
      .then(arrivals => {
        setArrivals(arrivals);
        setSubmittedOnce(true);
        setSubmitting(false);
        setLastUpdated(new Date());
        setError(false);
      })
      .catch(() => {
        setSubmitting(false);
        setSubmittedOnce(true);
        setError(true);
      })
  });

  return (
    <section>
      <article>
        <h1 style={{ marginTop: '18px' }}>{'🚌 Cuándo llega'}</h1>
        <SearchForm
          stop={stop}
          submitting={submitting}
          onSubmit={handleSubmit}
          onStopChange={(event) => setStop(event.target.value)}
          buttonText={submittedOnce ? 'Actualizar' : '🔎 buscar'}
        />
        {error && <NotFound stop={stop} />}
        <section id='results'>
          {arrivals.length > 0 && <ArrivalsResult arrivals={arrivals} />}
        </section>
        {submittedOnce && <LastSearch lastUpdated={lastUpdated} />}
      </article>
    </section>
  )
}

export default App
