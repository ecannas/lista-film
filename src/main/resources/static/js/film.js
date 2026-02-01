async function cercaFilm() {
    const titolo = document.getElementById("titolo").value.trim();
    if (!titolo) {
        alert("Inserisci un titolo per la ricerca!");
        return;
    }

    sessionStorage.setItem("ultimaRicerca", titolo);

    const url = "/api/film/cercare-film?titolo=" + encodeURIComponent(titolo);
    console.log("Richiesta a:", url);

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Data ricevuta dal server:", data);

        const container = document.getElementById("risultati");

        container.innerHTML = "";

        if (data.Response === "True" && data.Search?.length > 0) {
            for (const film of data.Search) {
                const responseEsistePreferito = await fetch(`/api/preferiti/esiste/${film.imdbID}`);
                const siPreferito = await responseEsistePreferito.json();

                const divCerca = document.createElement("div");
                divCerca.className = "col-md-4 film-col mb-4";

                divCerca.innerHTML = `
                  <div class="card h-100 bg-dark text-light shadow-sm">
                    <img src="${film.Poster}" class="card-img-top poster" alt="Poster non disponibile">
                    <div class="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 class="card-title">${film.Title || "NO TITLE"}</h5>
                        <p class="card-text text-secondary mb-2">${film.Year || "NO YEAR"}</p>
                      </div>
                      <div class="mt-3 text-center">
                        <button class="btn btn-outline-light btn-sm btn-dettagli mb-2" data-id="${film.imdbID}">Dettagli</button>
                        <br><br>
                        <button class="btn ${siPreferito ? 'btn-success' : 'btn-outline-warning'} btn-sm btn-preferiti"
                                data-id="${film.imdbID}" data-titolo="${film.Title}" data-anno="${film.Year}" data-poster="${film.Poster}">
                          <i class="bi ${siPreferito ? 'bi-star-fill' : 'bi-star'}"></i>
                          ${siPreferito ? 'Preferito' : 'Aggiungi ai Preferiti'}
                        </button>
                      </div>
                    </div>
                  </div>
                `;

                container.appendChild(divCerca);
            }


            // i listener dopo che i bottoni sono nel DOM
            document.querySelectorAll(".btn-dettagli").forEach(btn => {
                btn.addEventListener("click", () => dettagliFilm(btn.dataset.id));
            });

            document.querySelectorAll(".btn-preferiti").forEach(btn => {
              btn.addEventListener("click", () => {
                const film = {
                      imdbID: btn.dataset.id,
                      titolo: btn.dataset.titolo,
                      anno: btn.dataset.anno,
                      poster: btn.dataset.poster
                    };
                aggiungiAiPreferiti(film);
              });
            });


        } else {
            container.innerHTML = "<p class='text-center fs-5 mt-4'>Nessun film trovato.</p>";
        }

    } catch (error) {
        console.error("Errore nella ricerca:", error);
        document.getElementById("risultati").innerHTML = "<p>Errore durante la ricerca.</p>";
    }
}

async function dettagliFilm(id) {

    const url = "/api/film/" + encodeURIComponent(id);
    console.log("Richiesta dettagli a:", url);

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Dettagli ricevuti:", data);

        const modalBody = document.getElementById("filmModalBody");
        const modalTitle = document.getElementById("filmModalLabel");

         modalTitle.textContent = data.Title;
            modalBody.innerHTML = `
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-4 text-center">
                    <img src="${data.Poster}" alt="Poster" class="img-fluid rounded mb-3">
                  </div>
                  <div class="col-md-8">
                    <p><strong>Anno:</strong> ${data.Year}</p>
                    <p><strong>Regista:</strong> ${data.Director}</p>
                    <p><strong>Attori:</strong> ${data.Actors}</p>
                    <p><strong>Genere:</strong> ${data.Genre}</p>
                    <p><strong>Durata:</strong> ${data.Runtime}</p>
                    <p><strong>Valutazione IMDb:</strong> ${data.imdbRating}</p>
                    <p><strong>Trama:</strong> ${data.Plot}</p>
                  </div>
                </div>
              </div>
            `;

    const filmModal = new bootstrap.Modal(document.getElementById("filmModal"));
    filmModal.show();


    } catch (error) {
        console.error("Errore nel recupero dettagli:", error);
        mostraToast("Errore durante il caricamento dei dettagli.", "error");
    }
}

async function aggiungiAiPreferiti(film) {
  try {
    // Creo un nuovo oggetto da inviare al backend (senza id lato client)
    const filmDaInviare = {
      imdbID: film.imdbID,
      titolo: film.titolo,
      anno: film.anno,
      poster: film.poster
    };

    const response = await fetch("/api/preferiti", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filmDaInviare)
    });

    const btn = document.querySelector(`.btn-preferiti[data-id='${film.imdbID}']`);

    if (response.ok) {
      mostraToast("Film aggiunto ai preferiti!", "success");
      btn.classList.remove("btn-outline-warning");
      btn.classList.add("btn-success");
      btn.innerHTML = `<i class="bi bi-star-fill"></i> Preferito`;
    } else if (response.status === 409) {
      mostraToast("Questo film è già nei preferiti.", "warning");
    } else {
      mostraToast("Errore durante l'aggiunta!", "error");
    }

  } catch (error) {
    console.error("Errore:", error);
    mostraToast("Errore di connessione", "error");
  }
}


function mostraToast(messaggio, tipo = "info") {
  const toastEl = document.getElementById("toastMessage");
  const toastText = document.getElementById("toastText");

  if (!toastEl || !toastText) {
    console.error("Toast elements not found!");
    return;
  }

  toastEl.className = "toast align-items-center border-0 text-bg-" +
    (tipo === "success" ? "success" :
     tipo === "error" ? "danger" :
     tipo === "warning" ? "warning" : "dark");

  toastText.textContent = messaggio;

  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

const ultimaRicerca = sessionStorage.getItem("ultimaRicerca");
 if (ultimaRicerca) {
   document.getElementById("titolo").value = ultimaRicerca;
   cercaFilm();
 }


// Recupera l'username dell'utente loggato dalla sessione
 fetch('/utenti/me')
     .then(res => res.text())
     .then(username => {
         const messaggioBenvenuto = document.getElementById('messaggioBenvenuto');

         if (username && username.trim() !== "") {
             messaggioBenvenuto.innerHTML  = `Benvenuto, <strong>${username}</strong>!`;
         }
     });


