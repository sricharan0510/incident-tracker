# Incident Tracker

A simple full-stack app to track, manage, and resolve production incidents.

Tech stack
- **Backend:** Node.js, Express, Sequelize
- **Database:** PostgreSQL
- **Frontend:** React (Vite) with Tailwind CSS

Quick start

1. Backend

```bash
cd backend
npm install
# create a .env with your Postgres credentials (DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_DIALECT)
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npx nodemon index.js
# server runs on http://localhost:50003
```

2. Frontend

```bash
cd frontend
npm install
npm run dev
# app runs on http://localhost:5173
```

API (basic)
- `GET /api/incidents` — list incidents (supports pagination, sorting, filtering, search)
- `POST /api/incidents` — create incident
- `GET /api/incidents/:id` — incident details
- `PATCH /api/incidents/:id` — update status, severity, or summary

Notes & future ideas
- Server-side pagination is used for performance with larger datasets.
- Improvements to consider: authentication (JWT), unit/integration tests, real-time updates (Socket.io), and audit logs.

Submitting this project

- Commit and push your final changes: `git add . && git commit -m "Final submission" && git push`
- Create a simple PDF with your name, email, and the repo link before submission.

