package com.lista.film.services;

import com.lista.film.entities.PreferitiEntity;
import com.lista.film.entities.UtenteEntity;
import com.lista.film.repositories.PreferitiRepository;
import com.lista.film.repositories.UtenteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PreferitiService {

    private final PreferitiRepository repo;
    private final UtenteRepository utenteRepo;

    public PreferitiService(PreferitiRepository repo, UtenteRepository utenteRepo) {
        this.repo = repo;
        this.utenteRepo = utenteRepo;
    }

    public List<PreferitiEntity> getPreferitiPerUtente(String username) {
        UtenteEntity utente = utenteRepo.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utente non trovato"));
        return repo.findByUtente(utente);
    }

    @Transactional
    public PreferitiEntity aggiungiPreferito(PreferitiEntity film, String username) {
        UtenteEntity utente = utenteRepo.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utente non trovato"));

        if (repo.findByImdbIDAndUtente(film.getImdbID(), utente).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Film già nei preferiti");
        }

        // Creo un nuovo oggetto per evitare di usare un eventuale ID proveniente dal client
        PreferitiEntity nuovoPreferito = new PreferitiEntity();
        nuovoPreferito.setImdbID(film.getImdbID());
        nuovoPreferito.setTitolo(film.getTitolo());
        nuovoPreferito.setAnno(film.getAnno());
        nuovoPreferito.setPoster(film.getPoster());
        nuovoPreferito.setUtente(utente);

        return repo.save(nuovoPreferito);
    }


    @Transactional
    public void eliminaPreferito(String imdbID, String username) {
        UtenteEntity utente = utenteRepo.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utente non trovato"));

        repo.findByImdbIDAndUtente(imdbID, utente)
                .ifPresent(repo::delete);
    }

    public boolean esisteNeiPreferiti(String imdbID, String username) {
        UtenteEntity utente = utenteRepo.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utente non trovato"));
        return repo.existsByImdbIDAndUtente(imdbID, utente);
    }
}

