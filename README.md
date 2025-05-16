# NxtVideoGamesHUD

A modern web app to discover, search, and save video games using the RAWG API.
_This project was created as part of my frontend developer training project work._

## Features

- Search games by title, genre, tag or platform
- Random game of the day (with daily rotation)
- Game details with screenshots, ratings and additional information
- "Guess the Game" mini-game
- Watchlist saved via `localStorage`
- GitHub login via `next-auth`

## Tech Stack

- Next.js (App Router, Server Actions)
- TypeScript
- RAWG Video Games API
- next-auth

## Development Notes

- Data fetching is currently split between client and server due to a temporary CORS issue
- A second API key/account was used to resolve it during development

## Getting Started

```bash
npm install
npm run dev
```
