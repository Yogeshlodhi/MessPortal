# Mess Portal

A **Mess Portal** built on the **MERN stack** (MongoDB, Express, React, Node.js). Students can apply for leave, post feedback, raise complaints, check their rebate status, and view the mess menu. Admins (Warden, Mess Secretary, Mess Owner) get role-based tools to manage all of the above.

The project is split into two services:

| Folder | Description |
| --- | --- |
| [`FE-MESS-PORTAL`](FE-MESS-PORTAL) | React + TypeScript + Vite single-page app. Hosts **both** the Student and Admin experiences behind role-based routing. |
| [`BE-MESS-PORTAL`](BE-MESS-PORTAL) | Express + MongoDB REST API. Serves both `/api/student` and `/api/admin` endpoints. |

> The earlier `AdminPanel`, `StudentsPanel`, and `Backend` folders have been consolidated into these two services and removed.

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start (Docker)](#quick-start-docker)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Deployment](#deployment)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## Live Demo

- **Frontend (GitHub Pages):** https://yogeshlodhi.github.io/MessPortal/
- **Backend (Render):** https://messportal-71ri.onrender.com/api

## Features

### Student
- **Leave Application** — apply for leave and view your leaves.
- **Feedback** — submit feedback on mess services.
- **Complaints** — raise complaints about the mess.
- **Mess Menu** — view the day's menu.
- **Announcements & Mess Info** — stay up to date.

### Admin (role-based: Warden / Mess Secretary / Mess Owner)
- **Leave Management** — view all and today's leaves.
- **Feedback & Complaints** — review feedback, view/resolve complaints, take action.
- **Menu Management** — add, update, and view menu items.
- **Student Management** — list students, view profiles, register/remove students.
- **Dashboard Stats** — at-a-glance mess statistics.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Redux Toolkit (RTK Query), MUI + Mantine, React Router, React Hook Form + Yup.
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth (httpOnly cookies), bcryptjs, Cloudinary, Helmet, rate limiting.
- **Tooling:** Docker, ESLint, Prettier, Jest, Husky + commitlint, GitHub Actions.

## Quick Start (Docker)

Runs the full stack (frontend on `:8080`, backend on `:4000`).

1. Create the backend env file:

   ```bash
   cp BE-MESS-PORTAL/.env.example BE-MESS-PORTAL/.env   # then fill in your secrets
   ```

   (Or copy `docker-compose.example.yml` to `docker-compose.yml` and edit the inline values.)

2. Build and run:

   ```bash
   docker compose up --build
   ```

   - Frontend: http://localhost:8080
   - Backend:  http://localhost:4000/api

## Local Development

### Backend

```bash
cd BE-MESS-PORTAL
npm install
# create a .env file (see Environment Variables below)
npm run dev          # nodemon, hot reload
```

### Frontend

```bash
cd FE-MESS-PORTAL
npm install
# point the app at your backend, e.g. in a .env file:
#   VITE_API_BASE_URL=http://localhost:4000/api
npm run dev          # Vite dev server on http://localhost:5173
```

Other useful frontend scripts: `npm run build`, `npm run preview`, `npm run lint`, `npm run test`.

## Environment Variables

### Backend (`BE-MESS-PORTAL/.env`)

```bash
NODE_ENV=development            # development | production
NODE_PORT=4000
CORS_ORIGINS=http://localhost:5173   # comma-separated allowed origins

# MongoDB
DB_AUTH_USER=<your_db_user>
DB_AUTH_PASSWORD=<your_db_password>
DB_URL=<yourcluster.xxxxx.mongodb.net>
DB_NAME=<your_db_name>

# Auth
JWT_SECRET=<a_long_random_secret>
JWT_EXPIRES_TIME=24h
COOKIE_EXPIRES_TIME=7           # days

# Cloudinary (image uploads)
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
```

### Frontend (`FE-MESS-PORTAL/.env`)

```bash
VITE_API_BASE_URL=http://localhost:4000/api   # backend API base
# VITE_BASE_PATH=/MessPortal/                 # only needed for GitHub Pages builds
```

## API Overview

Base URL: `/api`. Auth is via an httpOnly `token` cookie set on login.

### Student (`/api/student`)
| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| POST | `/login` | — | Student login |
| GET  | `/logout` | — | Logout |
| GET  | `/messInfo` | — | Public mess info |
| GET  | `/getMenu` | ✓ | View menu |
| POST | `/submitFeedback` | ✓ | Submit feedback |
| POST | `/raise_complaint` | ✓ | Raise a complaint |
| GET  | `/announcements` | ✓ | View announcements |
| GET  | `/leaves` | ✓ | View own leaves |
| POST | `/leaveApplication` | ✓ | Apply for leave |

### Admin (`/api/admin`)
| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| POST | `/login` | — | Admin login |
| GET  | `/logout` | — | Logout |
| POST | `/addAdmin` | Warden | Add an admin |
| GET  | `/stats` | ✓ | Dashboard stats |
| GET  | `/students_list` | ✓ | List students |
| GET  | `/student_profile` | ✓ | Student profile by email |
| GET  | `/leaves_list` / `/filtered_leaves` | ✓ | All / today's leaves |
| GET/POST/PUT | `/menu`, `/menu/:id` | Mess Secretary / Mess Owner | Manage menu |
| GET  | `/feedback_list` / `/filtered_feedbacks` | ✓ | Feedback |
| GET  | `/getComplaints`, `/complaints/:id` | ✓ | Complaints |
| PUT  | `/complaint/takeAction/:id` | Warden | Resolve a complaint |
| PUT  | `/messInfo/:id` | Warden | Update mess info |

## Deployment

- **Frontend** is deployed to **GitHub Pages** via [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). The workflow builds `FE-MESS-PORTAL` and publishes the static `build/` output on every push to `main`. Assets resolve under the `/MessPortal/` sub-path (`VITE_BASE_PATH`), and `public/404.html` enables SPA client-side routing on Pages.
- **Backend** runs on Render. The Pages build bakes in `VITE_API_BASE_URL` (defaults to the Render URL; override via the `VITE_API_BASE_URL` repo variable).

## Authentication

The API uses **stateless JWTs delivered in an httpOnly cookie**:

- On login the server signs a JWT (`JWT_SECRET`) and sets it as an `httpOnly`, `Secure`, `SameSite=None` cookie in production (`SameSite=Lax` in dev). Being httpOnly, it is inaccessible to JavaScript, which protects against token theft via XSS.
- Each protected request verifies the cookie and loads the user (`isAuthenticatedUser` for students, `authenticateUser` + `authorizeRoles` for admin roles).
- Passwords are hashed with **bcrypt** (12 rounds).

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (commits follow [Conventional Commits](https://www.conventionalcommits.org/), enforced by commitlint).
4. Push and open a pull request.

## License

Licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
