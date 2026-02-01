package com.lista.film.controllers;

import com.lista.film.entities.PreferitiEntity;
import com.lista.film.entities.UtenteEntity;
import com.lista.film.services.PreferitiService;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/preferiti")
public class PreferitiController {

    private final PreferitiService service;

    public PreferitiController(PreferitiService service) {
        this.service = service;
    }

    @GetMapping
    public List<PreferitiEntity> getTutti(HttpSession session) {
        UtenteEntity utente = (UtenteEntity) session.getAttribute("utente");
        if (utente == null) {
            throw new RuntimeException("Utente non loggato");
        }
        return service.getPreferitiPerUtente(utente.getUsername());
    }

    @PostMapping
    public PreferitiEntity aggiungiPreferito(@RequestBody PreferitiEntity film, HttpSession session) {
        UtenteEntity utente = (UtenteEntity) session.getAttribute("utente");
        if (utente == null) {
            throw new RuntimeException("Utente non loggato");
        }
        return service.aggiungiPreferito(film, utente.getUsername());
    }

    @DeleteMapping("/{imdbID}")
    public void eliminaPreferito(@PathVariable String imdbID, HttpSession session) {
        UtenteEntity utente = (UtenteEntity) session.getAttribute("utente");
        if (utente == null) {
            throw new RuntimeException("Utente non loggato");
        }
        service.eliminaPreferito(imdbID, utente.getUsername());
    }

    @GetMapping("/esiste/{imdbID}")
    public boolean esisteNeiPreferiti(@PathVariable String imdbID, HttpSession session) {
        UtenteEntity utente = (UtenteEntity) session.getAttribute("utente");
        if (utente == null) {
            throw new RuntimeException("Utente non loggato");
        }
        return service.esisteNeiPreferiti(imdbID, utente.getUsername());
    }
}
