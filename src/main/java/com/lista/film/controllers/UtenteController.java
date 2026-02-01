package com.lista.film.controllers;

import com.lista.film.entities.UtenteEntity;
import com.lista.film.services.UtenteService;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/utenti")
public class UtenteController {

    private final UtenteService service;

    public UtenteController(UtenteService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public UtenteEntity registra(@RequestBody UtenteEntity user) {
        return service.registra(user.getUsername(), user.getPassword());
    }

    @GetMapping("/me")
    public String getNomeUtente(HttpSession session) {
        Object utente = session.getAttribute("utente");
        if (utente != null) {
            return ((UtenteEntity) utente).getUsername();
        } else {
            return "";
        }
    }

}
