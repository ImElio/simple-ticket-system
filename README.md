# Simple Ticket System

The **Simple Ticket System** is a simple ticket management application developed in Node.js.

## Prerequisites

- Node.js (>= 14.0.0)
- npm (>= 6.0.0)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/simple-ticket-system.git
    ```
2. Navigate to the project directory:
    ```bash
    cd simple-ticket-system
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Configuration

1. Create a `.env` file in the root of the project and add the following environment variables:
    ```env
    DISCORD_TOKEN="null" # Insert your bot token
    GUILD_ID="null" # Insert your Server ID
    TICKETS_CHANNEL_ID="null" # Insert the ID of the channel where the Ticket embed will be sent
    LOG_CHANNEL_ID="null" # Insert the ID of the channel where Ticket logs will be sent
    REJECT_ROLE_ID="null" # Insert the ID of the rejected role
    ```

## Usage

1. Start the application:
    ```bash
    npm start
    ```
2. The application will be available at `http://localhost:3000`.

## Project Structure

- `index.js`: The main file that starts the application.
- `package.json`: Contains the project dependencies and npm scripts.
- `.env`: Environment variables configuration file (to be created).
- `.git`: Directory containing Git configuration files.
- `.gitattributes`: File to configure Git attributes.
- `node_modules`: Directory containing project dependencies (automatically generated by npm).
- `LICENSE`: Project license file.
- `readme.md`: This file.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.