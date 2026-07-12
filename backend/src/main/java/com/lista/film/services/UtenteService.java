package com.lista.film.services;

import com.lista.film.entities.UtenteEntity;
import com.lista.film.repositories.UtenteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UtenteService {

    private final UtenteRepository repo;
    private final PasswordEncoder encoder; //BCrypt

    public UtenteService(UtenteRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    @Transactional
    public UtenteEntity registra(String username, String password) {
        if (repo.findByUsername(username).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username già esistente");
        }
        UtenteEntity nuovo = new UtenteEntity(username, encoder.encode(password));
        return repo.save(nuovo);
    }

    public UtenteEntity trovaPerUsername(String username) {
        return repo.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utente non trovato"));
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return encoder.matches(rawPassword, encodedPassword);
    }
}

