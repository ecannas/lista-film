package com.lista.film.services;

import com.lista.film.dto.DettagliMovie;
import com.lista.film.dto.RicercaMovie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class MovieService {

    private final WebClient webClient;

    @Value("${omdb.api.key}")
    private String apiKey;

    public MovieService(WebClient webClient) {
        this.webClient = webClient;
    }

    public RicercaMovie cercareMovie(String titolo) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("apikey", apiKey)
                        .queryParam("s", titolo) //OMDb usa questo parametro per la ricerca
                        .build())
                .retrieve()
                .bodyToMono(RicercaMovie.class)
                .block();  //blocca l'esecuzione finché non c'è una risposta
    }

    public DettagliMovie getMovieById(String id){
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("apikey", apiKey)
                        .queryParam("i", id)
                        .build())
                .retrieve()
                .bodyToMono(DettagliMovie.class)
                .block();
    }




}
