📘 README.md — Spring Boot Film App (OMDb + Preferiti)

🎬 Ricerca Film (OMDb) + Preferiti

Applicazione Spring Boot che permette di:

🔍 Cercare film tramite API OMDb

⭐ Aggiungere film ai preferiti

👤 Registrarsi / effettuare login

🔐 Gestione dell'autenticazione e dell'autorizzazione tramite Spring Security 6, con salvataggio sicuro delle password (BCrypt) e protezione attiva contro vulnerabilità CSRF.

💾 Salvare utenti e preferiti su database

🖥️ Usare interfaccia web realizzata con HTML, JavaScript e Bootstrap

🐳 Avviare l'intero ambiente in modo automatizzato e isolato tramite Docker (con database persistente)

Progetto realizzato per esercitarsi con Spring Boot, REST API, Autenticazione, JPA, Docker, e integrazione con API esterne.

---
## 🗂️ Struttura del Progetto
```text
Film/
├── src/
│    └── main/
│       ├── java/
│       │   └── com/lista/film/
│       │       ├── config/
│       │       │   ├── SecurityConfig.java
│       │       │   └── WebClientConfig.java
│       │       ├── controllers/
│       │       │   ├── MovieRestController.java
│       │       │   ├── PreferitiController.java
│       │       │   └── UtenteController.java
│       │       ├── dto/
│       │       │   ├── DettagliMovie.java
│       │       │   ├── Movie.java
│       │       │   └── RicercaMovie.java
│       │       ├── entities/
│       │       │   ├── PreferitiEntity.java
│       │       │   └── UtenteEntity.java
│       │       ├── repositories/
│       │       │   ├── PreferitiRepository.java
│       │       │   └── UtenteRepository.java
│       │       ├── services/
│       │       │   ├── CustomUserDetailsService.java
│       │       │   ├── MovieService.java
│       │       │   ├── PreferitiService.java
│       │       │   └── UtenteService.java
│       │       └── FilmApplication.java
│       └── resources/
│           └── static/
│               ├── js/
│               │   ├── film.js
│               │   ├── preferiti.js
│               │   └── utils.js
│               ├── index.html
│               ├── login.html
│               ├── preferiti.html
│               └── register.html
├── Dockerfile
├── docker-compose.yml
└── pom.xml



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
- Docker & Docker Compose (Containerizzazione, Healthcheck, Volumi persistenti)

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

Hai due opzioni per avviare l'applicazione: in modo completamente automatizzato tramite Docker, oppure tramite configurazione manuale.

🐳 Opzione 1: Avvio rapido con Docker (Consigliato)   
Requisiti: Avere Docker Desktop installato e avviato.

Non devi installare alcun database o configurare le porte localmente. L'infrastruttura crea automaticamente un container MySQL isolato con volume persistente per i dati.

1. Apri il file `docker-compose.yml` nella root del progetto.
2. Inserisci la tua chiave alla riga: ` OMDB_API_KEY=YOUR_API_KEY`
3. Compila il progetto per generare il file eseguibile. Apri il terminale nella root del progetto e lancia:
   ```bash
   ./mvnw clean package -DskipTests 
   ```
(Nota per Windows: usa .\mvnw clean package -DskipTests)  

4. Una volta terminata la compilazione, avvia i container con:
   ```bash
   docker-compose up --build 
   ```
5. Attendi che i servizi siano "Healthy" e apri il browser su: http://localhost:8080/

(Per spegnere in modo pulito mantenendo i dati salvati: docker-compose down)

⚙️ Opzione 2: Avvio Manuale (Senza Docker)

Se preferisci non usare Docker, dovrai configurare l'ambiente locale manualmente.

1. Crea un database MySQL chiamato filmdb sulla porta 3306 e assicurati che sia in esecuzione.

2. Configura il file src/main/resources/application.properties:

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
➡️ **Nota sulle tabelle:** Hibernate crea automaticamente le tabelle al primo avvio.
Se vuoi rigenerare lo schema da zero, puoi cambiare il parametro in:
   ```properties
   spring.jpa.hibernate.ddl-auto=create
```
(Poi riportalo a update per non perdere i dati ai riavvii successivi).  

3. Importa il progetto nell'IDE come progetto Maven.   

4. Esegui la classe principale `FilmApplication`.

Apri nel browser:
http://localhost:8080/

📄 Licenza

Progetto open source realizzato per scopi didattici.  
Creato come esercizio personale per apprendere Spring Boot, API REST, autenticazione tramite sessione e integrazione con API esterne.  
Libero utilizzo e modifica.