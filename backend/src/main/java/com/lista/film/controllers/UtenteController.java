package com.lista.film.controllers;

import com.lista.film.entities.UtenteEntity;
import com.lista.film.services.UtenteService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;

@RestController
@RequestMapping("/api/utenti")
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
    public ResponseEntity<?> getNomeUtente(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            return ResponseEntity.ok(Map.of("username", userDetails.getUsername()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
