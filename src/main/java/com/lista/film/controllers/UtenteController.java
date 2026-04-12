package com.lista.film.controllers;

import com.lista.film.entities.UtenteEntity;
import com.lista.film.services.UtenteService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

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
    public String getNomeUtente(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            return userDetails.getUsername();
        } else {
            return "";
        }
    }

}
