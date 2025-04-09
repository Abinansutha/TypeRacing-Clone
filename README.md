
# TypeRacer

<p align="center">
  <img src="typerace-logo.jpeg" alt="TypeRace Logo" width="200"/>
</p>

## Overview
This application is a typing game inspired by TypeRacer that allows users to practice their typing skills in both solo and multiplayer modes. It features a clean, modern interface built with Vue.js for the frontend and a Node.js/Express backend with PostgreSQL database support.

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Multiplayer System](#multiplayer-system)
- [Contributing](#contributing)

## Features
- **Solo Typing Practice**: Practice typing with random text passages from a database of stories
- **Multiplayer Racing**: Compete against other players in real-time typing races
- **Real-time Progress Tracking**: See your progress and compare with others during races
- **WPM (Words Per Minute) Calculation**: Track your typing speed
- **Interactive UI**: Character-by-character feedback on typing accuracy

## Architecture

### Backend
- **Language/Framework**: Node.js with Express
- **Database**: PostgreSQL
- **Real-time Communication**: Socket.IO for multiplayer functionality
- **Structure**:
  - `src/api`: API controllers for handling HTTP requests
  - `src/config`: Database and application configuration
  - `src/migrations`: SQL schema files for database setup
  - `src/models`: Data models for interacting with the database
  - `src/routes`: Express route definitions
  - `src/sockets`: Socket.IO event handlers for real-time functionality

### Frontend
- **Framework**: Vue 3 with Composition API
- **Routing**: Vue Router
- **Styling**: TailwindCSS
- **Structure**:
  - `src/components`: Reusable UI components
  - `src/composables`: Shared logic and state management
  - `src/pages`: Main application pages
  - `src/router`: Route configuration
  - `src/icons`: SVG icons used throughout the application

## Installation

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following environment variables:
   ```
   PORT=3000
   DATABASE_URL=postgres://username:password@localhost:5432/typeracer
   ```

4. Set up the database:
   ```
   node src/config/migrate.js
   node src/config/randomStories.js
   ```

5. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup
#### The backend will run a production version. The steps below are for development purposes, for running the frontend on a different terminal using vite.
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Usage

### Solo Mode
1. Navigate to the home page
2. The application will load a random text passage from the database
3. Start typing in the input field to begin the test
4. The application provides real-time feedback on your typing accuracy
5. You can request a new text passage by clicking the refresh button

### Multiplayer Mode
1. Navigate to the Race page
2. Click "Join Queue" to enter a waiting room
3. When the room fills with 4 players (or the timeout is reached), a countdown will begin
4. Race against other players by typing the provided text as quickly and accurately as possible
5. View real-time progress of all participants
6. Results are displayed after all players complete the race

## API Documentation

### Endpoints

#### GET /api/stories?type=${type}
Returns a random story from the database. Depending on the type. Options are multiplayer, time, or no type

**Response:**
```json
{
  "id": "uuid",
  "title": "Story Title",
  "content": "Story content...",
  "created_at": "timestamp"
}
```

### WebSocket Events

#### Client to Server
- `joinQueue`: Join the multiplayer queue
- `updateProgress`: Send current progress to the server
- `disconnect`: Handle player disconnection

#### Server to Client
- `playerJoined`: Notifies when a new player joins the room
- `playerLeft`: Notifies when a player leaves
- `countdown`: Countdown before race starts
- `gameStart`: Sends the text for the race
- `progressUpdate`: Updates on other players' progress
- `gameText`: Sends the typing text to newly joined players

## Multiplayer System

The application implements a room-based multiplayer system:
1. Players join a queue via WebSocket
2. The server places them in available rooms (up to 4 players per room)
3. When a room is full, a countdown begins
4. All players in the room receive the same text to type
5. Progress is synchronized in real-time
6. Players can see their position relative to others

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

# Youtube Video
https://youtu.be/tTCXgEk2V3E
