# Simple Ticket System

Il **Simple Ticket System** è un'applicazione semplice per la gestione dei ticket, sviluppata in Node.js.

## Prerequisiti

- Node.js (>= 14.0.0)
- npm (>= 6.0.0)

## Installazione

1. Clona il repository:
    ```bash
    git clone https://github.com/ImElio/simple-ticket-system.git
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
DISCORD_TOKEN="null" # Inserici il token del tuo bot
GUILD_ID="null" # Inserici l'id del tuo Server
TICKETS_CHANNEL_ID="null" # Inserici l'id della stanza dove verrà inviato l'embed per i Ticket
LOG_CHANNEL_ID="null" # Inserici l'id della stanza dove verranno inviati i log dei Ticket
REJECT_ROLE_ID="null" # Inserici l'id del ruolo rejected
```

1. Avvia l'applicazione:
    ```bash
    npm start
    ```

## Struttura del progetto

- `index.js`: Il file principale che avvia l'applicazione.
- `package.json`: Contiene le dipendenze e gli script di npm.
- `.env`: File di configurazione delle variabili di ambiente (da creare).
- `.git`: Directory che contiene i file di configurazione di Git.
- `.gitattributes`: File per configurare gli attributi di Git.
- `node_modules`: Directory che contiene le dipendenze del progetto (generata automaticamente da npm).
