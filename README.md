📘 README.md — Spring Boot Film App (OMDb + Preferiti)

🎬 Ricerca Film (OMDb) + Preferiti

Applicazione Spring Boot che permette di:

🔍 Cercare film tramite API OMDb

⭐ Aggiungere film ai preferiti

👤 Registrarsi / effettuare login

🔐 Gestione dell'autenticazione e dell'autorizzazione tramite Spring Security 6, con salvataggio sicuro delle password (BCrypt) e protezione attiva contro vulnerabilità CSRF.

💾 Salvare utenti e preferiti su database

🖥️ Usare interfaccia web realizzata con HTML, JavaScript e Bootstrap

Progetto realizzato per esercitarsi con Spring Boot, REST API, Autenticazione, JPA, Services, e integrazione con API esterne.

---
## 🗂️ Struttura del Progetto
```text
Film/
└── src/
    └── main/
        ├── java/
        │   └── com/lista/film/
        │       ├── config/
        │       │   ├── SecurityConfig.java
        │       │   └── WebClientConfig.java
        │       ├── controllers/
        │       │   ├── MovieRestController.java
        │       │   ├── PreferitiController.java
        │       │   └── UtenteController.java
        │       ├── dto/
        │       │   ├── DettagliMovie.java
        │       │   ├── Movie.java
        │       │   └── RicercaMovie.java
        │       ├── entities/
        │       │   ├── PreferitiEntity.java
        │       │   └── UtenteEntity.java
        │       ├── repositories/
        │       │   ├── PreferitiRepository.java
        │       │   └── UtenteRepository.java
        │       ├── services/
        │       │   ├── CustomUserDetailsService.java
        │       │   ├── MovieService.java
        │       │   ├── PreferitiService.java
        │       │   └── UtenteService.java
        │       └── FilmApplication.java
        ├── resources/
        │   └── static/
        │       ├── js/
        │       │   ├── film.js
        │       │   ├── preferiti.js
        │       │   └── utils.js
        │       ├── index.html
        │       ├── login.html
        │       ├── preferiti.html
        │       └── register.html
pom.xml



```


🚀 Tecnologie utilizzate
- Java 17
- Spring Boot 3.5.6
- Spring Web
- Spring Data JPA
- MySQL
- Vanilla JavaScript
- Bootstrap 5.3.3
- WebClient (per chiamate all’API OMDb)
- Spring Security 6 (Protezione API, Gestione Sessioni, CookieCsrfTokenRepository, BCrypt)


⚙️ Configurazione del database

Crea un database MySQL, ad esempio: filmdb

Assicurati che MySQL sia in esecuzione.  
Se necessario, aggiorna i parametri di connessione nel file `application.properties`.

Configura `src/main/resources/application.properties`:


```properties
spring.application.name=Film

# --- Database ---
spring.datasource.url=jdbc:mysql://localhost:3306/filmdb
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# --- JPA / Hibernate ---
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# --- OMDb API ---
omdb.api.url=https://www.omdbapi.com/
omdb.api.key=YOUR_API_KEY
```
➡️ Hibernate crea automaticamente le tabelle al primo avvio.

Se vuoi rigenerare lo schema da zero:
```properties
spring.jpa.hibernate.ddl-auto=create
```

(Poi riportalo a update.)


🔌 Endpoint API Principali
```markdown
🎬 Film (/api/film)

| Metodo | Endpoint                          | Descrizione                         |
|--------|-----------------------------------|-------------------------------------|
| GET    | /api/film/cercare-film?titolo=... | Cerca film tramite OMDb             |
| GET    | /api/film/{imdbID}                | Dettagli film tramite OMDb          |


⭐ Preferiti (/api/preferiti)

| Metodo | Endpoint                       | Descrizione                             |
|--------|--------------------------------|-----------------------------------------|
| GET    | /api/preferiti                 | Lista dei preferiti dell’utente         |
| POST   | /api/preferiti                 | Aggiunge un film ai preferiti           |
| DELETE | /api/preferiti/{imdbID}        | Rimuove un film dai preferiti           |
| GET    | /api/preferiti/esiste/{imdbID} | Verifica se un film è nei preferiti     |


👤 Utenti (/utenti)

| Metodo | Endpoint           | Descrizione                          |
|--------|--------------------|--------------------------------------|
| POST   | /utenti/register   | Registrazione nuovo utente           |
| GET    | /utenti/me         | Username dell’utente loggato         |

Nota: Gli endpoint /login (POST) e /logout (POST) non sono mappati nei controller, ma sono gestiti automaticamente in modo sicuro dai filtri nativi di Spring Security.
```

> ⚠️ Architettura di Sicurezza  
> Il progetto implementa una netta separazione tra frontend e backend RESTful, protetta da Spring Security:
> - **API REST** (/api/**): Protette da accesso non autorizzato. Le chiamate che modificano lo stato (POST, PUT, DELETE) richiedono un token CSRF.
> - **Gestione Utenti**: Le password sono hashate tramite BCryptPasswordEncoder prima del salvataggio su database.
> - **Integrazione Frontend**: Il frontend (Vanilla JS) comunica con Spring Security leggendo il cookie XSRF-TOKEN e allegandolo agli header delle chiamate di mutazione, permettendo un'architettura sicura senza l'uso di template engine server-side.


🖥️ Interfaccia Web

L’applicazione espone un’interfaccia web semplice realizzata con **HTML, JavaScript e Bootstrap**.

Le pagine statiche si trovano in:
src/main/resources/static/

Pagine principali:
- index.html → ricerca film e visualizzazione dettagli
- login.html → login utente
- register.html → registrazione utente
- preferiti.html → lista dei film preferiti

Le chiamate al backend vengono effettuate tramite fetch API asincrone. L'accesso alle risorse è validato automaticamente dalla SecurityFilterChain di Spring Security. Per le operazioni di scrittura (come l'aggiunta o la rimozione di preferiti), il frontend JavaScript recupera dinamicamente il token CSRF dai cookie e lo inietta negli header HTTP per superare i controlli di sicurezza del server.

▶️ Avvio del progetto

Da IDE (IntelliJ / Eclipse):
- Importa il progetto come Maven Project
- Esegui la classe: FilmApplication

Apri nel browser:
http://localhost:8080/

📄 Licenza

Progetto open source realizzato per scopi didattici.  
Creato come esercizio personale per apprendere Spring Boot, API REST, autenticazione tramite sessione e integrazione con API esterne.  
Libero utilizzo e modifica.
