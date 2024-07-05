# Simple Ticket System

Il **Simple Ticket System** è un'applicazione semplice per la gestione dei ticket, sviluppata in Node.js.

## Prerequisiti

- Node.js (>= 14.0.0)
- npm (>= 6.0.0)

## Installazione

1. Clona il repository:
    ```bash
    git clone https://github.com/tuo-username/simple-ticket-system.git
    ```
2. Vai nella directory del progetto:
    ```bash
    cd simple-ticket-system
    ```
3. Installa le dipendenze:
    ```bash
    npm install
    ```

## Configurazione

1. Crea un file `.env` nella root del progetto e aggiungi le seguenti variabili di ambiente:
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=username
    DB_PASS=password
    DB_NAME=simple_ticket_system
    ```

## Uso

1. Avvia l'applicazione:
    ```bash
    npm start
    ```
2. L'applicazione sarà disponibile su `http://localhost:3000`.

## Struttura del progetto

- `index.js`: Il file principale che avvia l'applicazione.
- `package.json`: Contiene le dipendenze e gli script di npm.
- `.env`: File di configurazione delle variabili di ambiente (da creare).
- `.git`: Directory che contiene i file di configurazione di Git.
- `.gitattributes`: File per configurare gli attributi di Git.
- `node_modules`: Directory che contiene le dipendenze del progetto (generata automaticamente da npm).
