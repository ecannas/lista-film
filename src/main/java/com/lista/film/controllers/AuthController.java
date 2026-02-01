package com.lista.film.controllers;

import com.lista.film.entities.UtenteEntity;
import com.lista.film.repositories.UtenteRepository;
import com.lista.film.services.UtenteService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
public class AuthController {

    private final UtenteRepository utenteRepository;
    private final UtenteService utenteService;

    public AuthController(UtenteRepository utenteRepository, UtenteService utenteService) {
        this.utenteRepository = utenteRepository;
        this.utenteService = utenteService;
    }

    @PostMapping("/login")
    public String login(@RequestParam String username,
                        @RequestParam String password,
                        HttpSession session) {


        Optional<UtenteEntity> utenteOpt = utenteRepository.findByUsername(username);

        if (utenteOpt.isPresent()) {
            boolean passwordOk = utenteService.checkPassword(password, utenteOpt.get().getPassword());

            if (passwordOk) {
                session.setAttribute("utente", utenteOpt.get());
                return "redirect:/index.html";
            }
        }

        return "redirect:/login.html?error=true";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        if (session != null) {
            session.invalidate();
        }
        return "redirect:/login.html?logout=true";
    }
}
