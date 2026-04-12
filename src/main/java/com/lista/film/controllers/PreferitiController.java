package com.lista.film.controllers;

import com.lista.film.entities.PreferitiEntity;
import com.lista.film.entities.UtenteEntity;
import com.lista.film.services.PreferitiService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

@RestController
@RequestMapping("/api/preferiti")
public class PreferitiController {

    private final PreferitiService service;

    public PreferitiController(PreferitiService service) {
        this.service = service;
    }

    @GetMapping
    public List<PreferitiEntity> getTutti(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            throw new RuntimeException("Utente non loggato");
        }
        return service.getPreferitiPerUtente(userDetails.getUsername());
    }

    @PostMapping
    public PreferitiEntity aggiungiPreferito(@RequestBody PreferitiEntity film, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            throw new RuntimeException("Utente non loggato");
        }
        return service.aggiungiPreferito(film, userDetails.getUsername());
    }

    @DeleteMapping("/{imdbID}")
    public void eliminaPreferito(@PathVariable String imdbID, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            throw new RuntimeException("Utente non loggato");
        }
        service.eliminaPreferito(imdbID, userDetails.getUsername());
    }

    @GetMapping("/esiste/{imdbID}")
    public boolean esisteNeiPreferiti(@PathVariable String imdbID, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            throw new RuntimeException("Utente non loggato");
        }
        return service.esisteNeiPreferiti(imdbID, userDetails.getUsername());
    }
}
