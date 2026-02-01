package com.lista.film.repositories;

import com.lista.film.entities.PreferitiEntity;
import com.lista.film.entities.UtenteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PreferitiRepository extends JpaRepository <PreferitiEntity, Long>{

    void deleteByImdbID(String imdbID);
    boolean existsByImdbIDAndUtente(String imdbID,UtenteEntity utente);
    Optional<PreferitiEntity> findByImdbIDAndUtente(String imdbID, UtenteEntity utente);
    List<PreferitiEntity> findByUtente(UtenteEntity utente);

}
