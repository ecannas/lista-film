package com.lista.film.controllers;

import com.lista.film.dto.DettagliMovie;
import com.lista.film.dto.RicercaMovie;
import com.lista.film.services.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/film")
public class MovieRestController {

    private final MovieService movieService;

    public MovieRestController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/cercare-film")
    public ResponseEntity<RicercaMovie> cercareMovie(@RequestParam String titolo){
        return ResponseEntity.ok(movieService.cercareMovie(titolo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DettagliMovie> getMovieById(@PathVariable String id){
        return ResponseEntity.ok(movieService.getMovieById(id));
    }

}
