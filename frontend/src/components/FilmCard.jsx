import { useState,useEffect } from "react";

function FilmCard({ film, isLogged }) {

  const [showModal, setShowModal] = useState(false);
  const [dettagli, setDettagli] = useState(null);
  const [caricamentoDettagli, setCaricamentoDettagli] = useState(false);
  const [isPreferito, setIsPreferito] = useState(false);

 useEffect(() => {
    if (isLogged) {
      const controllaSePreferito = async () => {
        try {
          const response = await fetch(`/api/preferiti/esiste/${film.imdbID}`, {
            credentials: 'include'
          });
          if (response.ok) {
            const esiste = await response.json();
            setIsPreferito(esiste);
          }
        } catch (error) {
          console.error("Errore nel controllo preferiti:", error);
        }
      };
      controllaSePreferito();
    } else {
      setIsPreferito(false);
    }
  }, [isLogged, film.imdbID]);

  const handleTogglePreferito = async () => {
    try {
      if (isPreferito) {
        const response = await fetch(`/api/preferiti/${film.imdbID}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        
        if (response.ok) setIsPreferito(false);
        
      } else {
        const datiFilm = {
          imdbID: film.imdbID,
          titolo: film.Title || film.titolo, // per gestire sia i dati di OMDb che del mio DB
          anno: film.Year || film.anno,
          poster: film.Poster || film.poster
        };

        const response = await fetch('/api/preferiti', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(datiFilm)
        });

        if (response.ok) setIsPreferito(true);
      }
    } catch (error) {
      console.error("Errore durante l'aggiornamento dei preferiti", error);
    }
  };

  const apriDettagli = async () => {
    setShowModal(true);
    
    // Se sono stati scaricati i dettagli in precedenza, non c'è bisogno di rifare la chiamata
    if (dettagli) return;

    setCaricamentoDettagli(true);
    try {
      const response = await fetch(`/api/film/${film.imdbID}`);
      const data = await response.json();
      setDettagli(data);
    } catch (error) {
      console.error("Errore nel recupero dei dettagli:", error);
    } finally {
      setCaricamentoDettagli(false);
    }
  };

  return (
    <div className="col-md-4 film-col mb-4">
      <div className="card h-100 bg-dark text-light shadow-sm">
        <img 
          src={(film.Poster && film.Poster !== "N/A") ? film.Poster : (film.poster && film.poster !== "N/A") ? film.poster : "https://via.placeholder.com/300x450?text=No+Poster"} 
          className="card-img-top" 
          alt="Locandina" 
          style={{ height: '380px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title text-warning">{film.Title || film.titolo || "Senza Titolo"}</h5>
            <p className="card-text text-secondary mb-2">{film.Year || film.anno}</p>
          </div>
          <div className="mt-3 text-center">
            <button className="btn btn-outline-light btn-sm mb-2 w-100" onClick={apriDettagli}>
              Dettagli
            </button>
            {isLogged &&(
                <button 
                     className={`btn btn-sm w-100 fw-bold ${isPreferito ? 'btn-warning text-dark' : 'btn-outline-warning'}`} 
                     onClick={handleTogglePreferito}
                >
                  {isPreferito? (
                      <><i className="bi bi-star-fill"></i> Rimuovi Preferito</>
                  ):(
                      <><i className="bi bi-star"></i> Aggiungi ai Preferiti</>
                  )}
                </button>
            )}         
          </div>
        </div>
      </div>
      {showModal && (
              <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.7)' }} role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content bg-dark text-light border-secondary">
                    
                    <div className="modal-header border-secondary">
                      <h5 className="modal-title text-warning">{film.Title || film.titolo}</h5>
                      <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                    </div>

                    <div className="modal-body">
                      {caricamentoDettagli ? (
                        <div className="text-center my-4">
                          <div className="spinner-border text-warning" role="status"></div>
                          <p className="mt-2">Caricamento dettagli...</p>
                        </div>
                      ) : dettagli ? (
                        <div className="row">
                          <div className="col-md-4 mb-3 text-center">
                            <img 
                                  src={(film.Poster && film.Poster !== "N/A") ? film.Poster : (film.poster && film.poster !== "N/A") ? film.poster : "https://via.placeholder.com/300x450?text=No+Poster"} 
                                  className="img-fluid rounded shadow border border-secondary" 
                                  alt="Poster"
                            />
                          </div>
                          <div className="col-md-8">
                            <p><strong><i className="bi bi-calendar-event text-primary"></i> Anno:</strong> {dettagli.Year || film.Year || film.anno}</p>
                            <p><strong><i className="bi bi-person-badge text-primary"></i> Regia:</strong> {dettagli.Director || 'N/A'}</p>
                            <p><strong><i className="bi bi-people text-primary"></i> Attori:</strong> {dettagli.Actors || 'N/A'}</p>
                            <p><strong><i className="bi bi-hourglass-split text-primary"></i> Durata:</strong> {dettagli.Runtime || 'N/A'}</p>
                            <p><strong><i className="bi bi-star-fill text-warning"></i> Rating IMDb:</strong> {dettagli.imdbRating || 'N/A'}</p>
                            <hr className="border-secondary" />
                            <h5>Trama</h5>
                            <p className="text-secondary" style={{ lineHeight: '1.6' }}>{dettagli.Plot || 'Nessuna trama disponibile.'}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-danger text-center">Impossibile caricare i dettagli del film.</p>
                      )}
                    </div>

                    <div className="modal-footer border-secondary">
                      <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Chiudi</button>
                    </div>

                  </div>
                </div>
              </div>
      )}
    </div>
  );
}

export default FilmCard;