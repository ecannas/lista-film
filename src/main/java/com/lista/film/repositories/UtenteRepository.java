package com.lista.film.repositories;

import com.lista.film.entities.UtenteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UtenteRepository extends JpaRepository<UtenteEntity,Long> {
    Optional<UtenteEntity> findByUsername(String username);
}

