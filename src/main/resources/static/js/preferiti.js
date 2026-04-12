caricaPreferiti();

async function caricaPreferiti() {
  const container = document.getElementById("lista-preferiti");
  container.innerHTML = "<p>Caricamento in corso...</p>";

  try {
    const response = await fetch("/api/preferiti");

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.message || `Errore ${response.status}`;
      mostraToast(`Impossibile caricare i preferiti: ${message}`, "error");
      container.innerHTML = `<p class='text-center text-danger'>${message}</p>`;
      return;
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("Risposta non è un array:", data);
      mostraToast("Errore: dati preferiti non validi", "error");
      container.innerHTML = "<p class='text-center text-danger'>Errore durante il caricamento.</p>";
      return;
    }

    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "<p class='text-center text-secondary'>Nessun film nei preferiti.</p>";
      return;
    }

    data.forEach(film => {
      const div = document.createElement("div");
      div.className = "col-md-4";

      div.innerHTML = `
        <div class="card h-100 bg-dark text-light border-warning shadow-sm">
          <img src="${film.poster}" class="card-img-top" alt="Poster non disponibile">
          <div class="card-body">
            <h5 class="card-title">${film.titolo}</h5>
            <p class="card-text text-secondary">${film.anno}</p>
            <button type="button" class="btn btn-outline-danger btn-sm" data-id="${film.imdbID}">🗑 Rimuovi</button>
          </div>
        </div>
      `;
      container.appendChild(div);
    });

    // Listener per i bottoni di rimozione
    document.querySelectorAll(".btn-outline-danger").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        if (confirm("Vuoi rimuovere questo film dai preferiti?")) {
          await eliminaPreferito(id);
          caricaPreferiti();
        }
      });
    });

  } catch (error) {
    console.error("Errore nel caricamento dei preferiti:", error);
    mostraToast("Errore di connessione o server non raggiungibile", "error");
    container.innerHTML = "<p class='text-center text-danger'>Errore durante il caricamento.</p>";
  }
}

async function eliminaPreferito(imdbID) {
  try {
    const endpoint = '/api/preferiti/' + encodeURIComponent(imdbID);
    const csrfToken = getCsrfToken();

    const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
           "X-XSRF-TOKEN": csrfToken
        }
    });

    if (response.ok) {
      mostraToast("Film rimosso dai preferiti!", "warning");
    } else {
      mostraToast("Errore nella rimozione!", "error");
    }
  } catch (error) {
    console.error("Errore eliminando il preferito:", error);
    mostraToast("Errore di connessione", "error");
  }
}



fetch('/utenti/me')
  .then(res => res.text())
  .then(username => {
      document.getElementById('usernameDisplay').textContent = username;
});