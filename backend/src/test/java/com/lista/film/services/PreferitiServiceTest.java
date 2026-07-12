package com.lista.film.services;

import com.lista.film.entities.PreferitiEntity;
import com.lista.film.entities.UtenteEntity;
import com.lista.film.repositories.PreferitiRepository;
import com.lista.film.repositories.UtenteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class) // Abilita Mockito in JUnit 5
class PreferitiServiceTest {

    @Mock
    private PreferitiRepository preferitiRepository;

    @Mock
    private UtenteRepository utenteRepository;

    @InjectMocks
    private PreferitiService preferitiService;

    private UtenteEntity utenteMock;
    private PreferitiEntity filmMock;

    @BeforeEach
    void setUp() {
        utenteMock = new UtenteEntity();
        utenteMock.setId(1L);
        utenteMock.setUsername("mario");

        filmMock = new PreferitiEntity();
        filmMock.setImdbID("tt1234567");
        filmMock.setTitolo("Inception");
        filmMock.setAnno("2010");
    }

    @Test
    void aggiungiPreferito_Successo() {
        when(utenteRepository.findByUsername("mario")).thenReturn(Optional.of(utenteMock));
        when(preferitiRepository.findByImdbIDAndUtente("tt1234567", utenteMock)).thenReturn(Optional.empty());
        when(preferitiRepository.save(any(PreferitiEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        PreferitiEntity risultato = preferitiService.aggiungiPreferito(filmMock, "mario");

        assertNotNull(risultato);
        assertEquals("tt1234567", risultato.getImdbID());
        assertEquals(utenteMock, risultato.getUtente());

        verify(preferitiRepository, times(1)).save(any(PreferitiEntity.class));
    }

    @Test
    void aggiungiPreferito_FilmGiaPresente_LanciaEccezione() {
        when(utenteRepository.findByUsername("mario")).thenReturn(Optional.of(utenteMock));
        when(preferitiRepository.findByImdbIDAndUtente("tt1234567", utenteMock)).thenReturn(Optional.of(filmMock));

        ResponseStatusException eccezione = assertThrows(ResponseStatusException.class, () -> preferitiService.aggiungiPreferito(filmMock, "mario"));

        assertEquals(HttpStatus.CONFLICT, eccezione.getStatusCode());
        assertEquals("Film già nei preferiti", eccezione.getReason());

        verify(preferitiRepository, never()).save(any());
    }
    @Test
    void esisteNeiPreferiti_successo(){
        when(utenteRepository.findByUsername("mario")).thenReturn(Optional.of(utenteMock));
        when(preferitiRepository.existsByImdbIDAndUtente("tt1234567", utenteMock)).thenReturn(true);

        boolean risultato = preferitiService.esisteNeiPreferiti("tt1234567", "mario");

        assertTrue(risultato);
    }
    @Test
    void esisteNeiPreferiti_UtenteNonTrovato_LanciaEccezione() {
        when(utenteRepository.findByUsername("mario")).thenReturn(Optional.empty());

        ResponseStatusException eccezione = assertThrows(ResponseStatusException.class, () -> preferitiService.esisteNeiPreferiti("tt1234567", "mario"));

        assertEquals(HttpStatus.NOT_FOUND, eccezione.getStatusCode());
    }


}