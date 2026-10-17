# AarogyaCare frontend

React, TypeScript, Vite, and Tailwind CSS client for AarogyaCare.

## Run locally

```bash
npm install
npm run dev
```

The application is served at `http://localhost:5173` by default.

## API configuration

Copy `.env.example` to `.env` and set the API address when it differs from the local default:

```env
VITE_API_URL=http://localhost:5000
```

The backend must be running with MongoDB configured for registration, sign-in, password reset, and Health Guide conversations. Health Guide additionally requires a valid Gemini API key on the backend; no browser-side key is used.

## Quality checks

```bash
npm run build
npm run lint
```

## Routes

- `/` — public product landing page
- `/products` — Health Guide product overview
- `/register`, `/login`, `/forgot-password`, `/reset-password` — account flows
- `/dashboard` — authenticated workspace
- `/chat` — authenticated Health Guide

The UI includes responsive navigation, keyboard-visible focus states, a not-found page, an application error boundary, request timeouts, and human-readable service errors.
