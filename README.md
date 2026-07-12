🎬 Film App - Full-Stack REST Architecture

[![Spring Boot CI](https://github.com/ecannas/lista-film/actions/workflows/ci.yml/badge.svg)](https://github.com/ecannas/lista-film/actions/workflows/ci.yml)

Applicazione Web Full-Stack per la ricerca e la gestione di film preferiti, costruita con un'architettura disaccoppiata (Backend REST API + Frontend SPA).

L'applicazione permette di:

🔍 **Cercare film** interfacciandosi con l'API esterna di OMDb.

⭐ **Salvare e gestire** una lista personale di film preferiti.

👤 **Registrarsi ed effettuare il login** in totale sicurezza.

💾 **Salvare utenti e preferiti** su database relazionale.

🔐 **Gestire l'autenticazione** tramite Spring Security 6 (Sessioni persistenti, BCrypt, Cookie JSESSIONID).

🐳 **Avviare l'intero ambiente** in modo automatizzato e isolato tramite Docker (con database persistente)

Progetto realizzato per esercitarsi con Spring Boot, React, REST API, Autenticazione, JPA, Docker, e integrazione con API esterne.

---
## 🗂️ Struttura del Progetto

Il progetto è organizzato in un singolo repository contenente due ambienti isolati:

```text
Film-App/
│
├── backend/                
│   ├── src/
│   │    └── main/
│   │       ├── java/
│   │       │   └── com/lista/film/
│   │       │       ├── config/
│   │       │       │   ├── SecurityConfig.java
│   │       │       │   └── WebClientConfig.java
│   │       │       ├── controllers/
│   │       │       │   ├── AuthController.java
│   │       │       │   ├── MovieRestController.java
│   │       │       │   ├── PreferitiController.java
│   │       │       │   └── UtenteController.java
│   │       │       ├── dto/
│   │       │       │   ├── DettagliMovie.java
│   │       │       │   ├── LoginRequest.java
│   │       │       │   ├── Movie.java
│   │       │       │   └── RicercaMovie.java
│   │       │       ├── entities/
│   │       │       │   ├── PreferitiEntity.java
│   │       │       │   └── UtenteEntity.java
│   │       │       ├── repositories/
│   │       │       │   ├── PreferitiRepository.java
│   │       │       │   └── UtenteRepository.java
│   │       │       ├── services/
│   │       │       │   ├── CustomUserDetailsService.java
│   │       │       │   ├── MovieService.java
│   │       │       │   ├── PreferitiService.java
│   │       │       │   └── UtenteService.java
│   │       │       └── FilmApplication.java
│   │       └── resources/
│   │           └── application.properties
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── pom.xml
│
└── frontend/
    ├── src/
    │   ├── components/  
    │   │    ├── FilmCard.jsx
    │   │    ├── Navbar.jsx
    │   │    └── SearchBar.jsx
    │   ├── pages/  
    │   │    ├── Home.jsx
    │   │    ├── Login.jsx
    │   │    ├── Preferiti.jsx
    │   │    └── Register.jsx        
    │   ├── App.jsx         
    │   └── main.jsx
    ├── index.html       
    ├── package.json        
    └── vite.config.js                  
```


🚀 Tecnologie utilizzate

Backend (API Server)
- Java 17

- Spring Boot 3.5.6 (Spring Web, Spring Data JPA)

- MySQL

- Spring Security 6 (Gestione manuale del SecurityContextRepository, BCrypt)

- WebClient (per chiamate all’API OMDb)

- Docker & Docker Compose (Containerizzazione, Healthcheck, Volumi persistenti)

Frontend (Client)

- React.js (Hooks, Functional Components)

- Vite (Bundler e Proxy server locale)

- React Router DOM (Navigazione lato client)

- Bootstrap 5.3.3 & Bootstrap Icons


🔌 Endpoint API Principali

Il backend espone esclusivamente dati in formato JSON tramite la rotta base /api.

```markdown
🎬 Film (/api/film)

| Metodo | Endpoint                          | Descrizione                         |
|--------|-----------------------------------|-------------------------------------|
| GET    | /api/film/cercare-film?titolo=... | Cerca film tramite OMDb             |
| GET    | /api/film/{id}                    | Dettagli film tramite OMDb          |


⭐ Preferiti (/api/preferiti)

| Metodo | Endpoint                       | Descrizione                             |
|--------|--------------------------------|-----------------------------------------|
| GET    | /api/preferiti                 | Lista dei preferiti dell’utente loggato |
| POST   | /api/preferiti                 | Aggiunge un film ai preferiti           |
| DELETE | /api/preferiti/{imdbID}        | Rimuove un film dai preferiti           |
| GET    | /api/preferiti/esiste/{imdbID} | Verifica se un film è nei preferiti     |


👤 Autenticazione e Utenti (/api/auth e /api/utenti)

| Metodo | Endpoint                  | Descrizione                                      |
|--------|---------------------------|--------------------------------------------------|
| POST   | /api/auth/login           | Login utente (genera JSESSIONID)                 |
| POST   | /api/auth/logout          | Logout (invalida sessione gestita da Spring)     |
| POST   | /api/utenti/register      | Registrazione nuovo utente                       |
| GET    | /api/utenti/me            | Verifica sessione attiva all'avvio dell'app      |

```

> ⚠️ Architettura di Sicurezza e Comunicazione
>
> Il progetto implementa una comunicazione sicura tra due server locali in sviluppo (Vite su porta 5173 e Spring su porta 8080).
> - **CORS e Proxy**: In sviluppo, il frontend utilizza il proxy di Vite per instradare le chiamate ad /api verso Spring Boot, bypassando i blocchi CORS del browser e simulando un ambiente di produzione.
> - **Gestione Sessione**: L'autenticazione usa cookie HttpOnly. Tutte le richieste del frontend a rotte protette includono credentials: 'include' per trasmettere il JSESSIONID a Spring Security.
> - **SecurityContextRepository**: Data la natura REST del backend, in Spring Security 6 il contesto di sicurezza è esplicitamente salvato nel repository delle sessioni (HttpSessionSecurityContextRepository) per garantire la persistenza dell'utente tra diverse chiamate HTTP.


▶️ Avvio del progetto

Essendo un'architettura disaccoppiata, dovrai avviare separatamente il motore Database/Backend e il server Frontend.

**STEP 1**: Avviare il Backend (Spring Boot + MySQL)

**Opzione Consigliata**: Tramite Docker

1. Entra nella cartella del backend: `cd backend`
2. Apri il file `docker-compose.yml` e inserisci la tua chiave OMDb alla riga: ` OMDB_API_KEY=YOUR_API_KEY`
3. Compila il progetto Maven:
   ```bash
   ./mvnw clean package -DskipTests 
   ```
(Nota per Windows: usa .\mvnw clean package -DskipTests)  

4. Una volta terminata la compilazione, costruisci e avvia i container con:
   ```bash
   docker-compose up --build 
   ```
(Il server backend sarà in ascolto silenzioso sulla porta 8080).

**Opzione alternativa**: Avvio Manuale (Senza Docker)

Se preferisci non usare Docker, dovrai configurare l'ambiente locale manualmente.

1. Crea un database MySQL chiamato `filmdb` sulla porta 3306 e assicurati che sia in esecuzione.

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

**STEP 2**: Avviare il Frontend (React)

1. Apri una nuova finestra del terminale.
2. Entra nella cartella del frontend: `cd frontend`
3. Installa le dipendenze Node.js:
   ```bash
   npm install 
   ```
4. Avvia il server di sviluppo Vite:
   ```bash
   npm run dev 
   ```
5. Apri il browser all'indirizzo indicato dal terminale (solitamente `http://localhost:5173/`).

📄 Licenza

Progetto open source realizzato per scopi didattici.  
Creato come esercizio personale per approfondire l'integrazione Full-Stack tra React.js e Spring Boot, gestione dello stato, sicurezza API REST e containerizzazione Docker.  
Libero utilizzo e modifica.