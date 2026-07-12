import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import FilmCard from '../components/FilmCard';

function Home({ isLogged }) {
  const [ricercaAttuale, setRicercaAttuale] = useState('');
  const [risultati, setRisultati] = useState([]);
  const [caricamento, setCaricamento] = useState(false);

  const eseguiRicerca = async (titoloCercato) => {
    setRicercaAttuale(titoloCercato);
    setCaricamento(true);
    setRisultati([]);

    try {
      const response = await fetch(`/api/film/cercare-film?titolo=${encodeURIComponent(titoloCercato)}`);
      const data = await response.json();
      
      if (data.Response === "True" && data.Search?.length > 0) {
        setRisultati(data.Search);
      } else {
        setRisultati([]);
      }
    } catch (error) {
      console.error("Errore nella ricerca:", error);
    } finally {
      setCaricamento(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-primary text-center mb-4">
        <i className="bi bi-film"></i> Ricerca Film
      </h1>

      <SearchBar onSearch={eseguiRicerca} />

      {caricamento && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Caricamento...</span>
          </div>
          <p className="mt-3 text-primary fw-bold fs-5">Ricerca in corso...</p>
        </div>
      )}

      <div className="row gy-4 mt-2">
        {risultati.map((film) => (
          <FilmCard key={film.imdbID} film={film} isLogged={isLogged} />
        ))}
      </div>

      {!caricamento && ricercaAttuale && risultati.length === 0 && (
        <p className="text-center text-danger fs-5 mt-4">Nessun film trovato per "{ricercaAttuale}".</p>
      )}
    </div>
  );
}

export default Home;