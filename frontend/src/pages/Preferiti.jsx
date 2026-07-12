import { useState, useEffect } from 'react';
import FilmCard from '../components/FilmCard';

function Preferiti({ isLogged }) {
  const [listaPreferiti, setListaPreferiti] = useState([]);
  const [caricamento, setCaricamento] = useState(true);

  useEffect(() => {
    const caricaPreferiti = async () => {
      try {
        const response = await fetch('/api/preferiti', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setListaPreferiti(data);
        }
      } catch (error) {
        console.error("Errore nel caricamento dei preferiti:", error);
      } finally {
        setCaricamento(false);
      }
    };

    if (isLogged) {
      caricaPreferiti();
    }
  }, [isLogged]);

  if (!isLogged) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-warning">Devi effettuare l'accesso per vedere i tuoi preferiti.</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-warning text-center mb-4">
        <i className="bi bi-star-fill"></i> I Miei Film Preferiti
      </h1>

      {caricamento && (
        <div className="text-center my-5">
          <div className="spinner-border text-warning" role="status"></div>
          <p className="mt-2 text-warning">Recupero della tua lista dal database...</p>
        </div>
      )}

      {!caricamento && listaPreferiti.length === 0 && (
        <p className="text-center text-secondary fs-5 mt-5">Non hai ancora salvato nessun film nei preferiti.</p>
      )}

      <div className="row gy-4 mt-2">
        {listaPreferiti.map((film) => (
          <FilmCard key={film.imdbID} film={film} isLogged={isLogged} />
        ))}
      </div>
    </div>
  );
}

export default Preferiti;