package com.lista.film.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table( name = "preferiti",
        uniqueConstraints = @UniqueConstraint(columnNames = {"utente_id", "imdbID"}) //un utente non può avere lo stesso preferito più di una volta
)

public class PreferitiEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String imdbID;
    @Column(nullable = false)
    private String titolo;
    private String anno;
    private String poster;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "utente_id")
    @JsonBackReference
    private UtenteEntity utente;

    public PreferitiEntity() {
    }

    public PreferitiEntity(Long id, String imdbID, String titolo, String anno, String poster) {
        this.id = id;
        this.imdbID = imdbID;
        this.titolo = titolo;
        this.anno = anno;
        this.poster = poster;
    }

    public PreferitiEntity(Long id, String imdbID, String titolo, String anno, String poster, UtenteEntity utente) {
        this.id = id;
        this.imdbID = imdbID;
        this.titolo = titolo;
        this.anno = anno;
        this.poster = poster;
        this.utente = utente;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImdbID() {
        return imdbID;
    }

    public void setImdbID(String imdbID) {
        this.imdbID = imdbID;
    }

    public String getTitolo() {
        return titolo;
    }

    public void setTitolo(String titolo) {
        this.titolo = titolo;
    }

    public String getAnno() {
        return anno;
    }

    public void setAnno(String anno) {
        this.anno = anno;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public UtenteEntity getUtente() {
        return utente;
    }

    public void setUtente(UtenteEntity utente) {
        this.utente = utente;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof PreferitiEntity that)) return false;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }
}
