📘 README.md — Spring Boot Film App (OMDb + Preferiti)

🎬 Ricerca Film (OMDb) + Preferiti

Applicazione Spring Boot che permette di:

🔍 Cercare film tramite API OMDb

⭐ Aggiungere film ai preferiti

👤 Registrarsi / effettuare login

🔐 Gestione dell’autenticazione tramite sessione HTTP e filtro personalizzato (AuthFilter), senza usare Spring Security.

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
        │       │   ├── AuthFilter.java
        │       │   └── WebClientConfig.java
        │       ├── controllers/
        │       │   ├── AuthController.java
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
        │       │   ├── MovieService.java
        │       │   ├── PreferitiService.java
        │       │   └── UtenteService.java
        │       └── FilmApplication.java
        ├── resources/
        │   └── static/
        │       ├── js/
        │       │   ├── film.js
        │       │   └── preferiti.js
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
- Filtro personalizzato (AuthFilter) per la gestione dell’autenticazione e la protezione delle pagine, senza usare Spring Security


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

# Disabilito Spring Security: autenticazione gestita con AuthFilter e sessione HTTP
spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration


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


🔐 Autenticazione Web (sessione)

| Metodo | Endpoint  | Descrizione                    |
|--------|-----------|--------------------------------|
| POST   | /login    | Login con sessione HTTP        |
| GET    | /logout   | Logout (invalida la sessione)  |

```

> ⚠️ Importante  
> Questo progetto distingue tra:
> - **API REST** (`/api/**`) che restituiscono JSON
> - **Endpoint di autenticazione web** (`/login`, `/logout`) che gestiscono la sessione HTTP e fanno redirect alle pagine HTML
> - **Sessione utente**, gestita tramite `HttpSession` e protetta da un filtro personalizzato (`AuthFilter`)
>
> Non viene utilizzato Spring Security.



🖥️ Interfaccia Web

L’applicazione espone un’interfaccia web semplice realizzata con **HTML, JavaScript e Bootstrap**.

Le pagine statiche si trovano in:
src/main/resources/static/

Pagine principali:
- index.html → ricerca film e visualizzazione dettagli
- login.html → login utente
- register.html → registrazione utente
- preferiti.html → lista dei film preferiti

Le chiamate al backend vengono effettuate tramite **fetch API** verso le API REST dell’applicazione.
L’accesso alle pagine protette è gestito tramite **sessione HTTP** e **AuthFilter**.

▶️ Avvio del progetto

Da IDE (IntelliJ / Eclipse):
- Importa il progetto come Maven Project
- Esegui la classe: FilmApplication

Apri nel browser:
http://localhost:8080/login.html

📄 Licenza

Progetto open source realizzato per scopi didattici.  
Creato come esercizio personale per apprendere Spring Boot, API REST, autenticazione tramite sessione e integrazione con API esterne.  
Libero utilizzo e modifica.
