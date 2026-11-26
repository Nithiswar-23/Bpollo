# Bpollo

Bpollo is a full-stack doctor appointment booking platform built with the MERN stack. It gives patients a simple way to find doctors and book appointments, gives doctors a dashboard to manage their schedule, and gives administrators a panel to manage doctors, patients, and bookings.

---

## Features

### For patients
- Register and log in securely with JWT authentication
- Browse doctors by speciality
- View doctor profiles, fees, and availability
- Book appointments by date and time slot
- View booking history and cancel appointments
- Update personal profile details

### For doctors
- Secure doctor login
- Dashboard with appointment and earnings summary
- View upcoming appointments
- Mark appointments as completed or cancelled
- Update profile and clinic details

### For administrators
- Secure admin login
- Dashboard with doctors, patients, and appointment statistics
- Add doctors and manage their availability
- View all appointments and cancel bookings
- View the complete doctor list

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Patient portal | React 19, Vite, Tailwind CSS |
| Admin and doctor panel | React 19, Vite, Tailwind CSS |
| Backend API | Node.js, Express 5 |
| Database | MongoDB with Mongoose |
| Authentication | JWT |
| File storage | Cloudinary |
| HTTP client | Axios |

---

## Project structure

```text
Bpollo/
├── admin/       Admin and doctor dashboard (React + Vite)
├── backend/     Express API, models, controllers, and routes
├── frontend/    Patient portal (React + Vite)
└── README.md
```

---

## Getting started

### Prerequisites
- Node.js 18 or newer
- npm
- MongoDB running locally, or a MongoDB Atlas connection string

### 1. Clone the repository

```bash
git clone https://github.com/Nithiswar-23/Bpollo.git
cd Bpollo
```

### 2. Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
```

### 3. Configure environment variables

Each app has an `.env.example` file. Copy it to `.env` and fill in your own values. Never commit `.env` files.

**backend/.env**

| Variable | Description |
| --- | --- |
| `PORT` | API port (default `3000`) |
| `MONGOOSE_URL` | MongoDB connection string |
| `JWT_SECRET` | Long random string used to sign tokens |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `CLOUD_NAME` | Cloudinary cloud name |
| `API_kEY` | Cloudinary API key (note the project's existing key name) |
| `API_SECRET` | Cloudinary API secret |

**frontend/.env** and **admin/.env**

| Variable | Description |
| --- | --- |
| `VITE_BACKEND_URL` | Base URL of the backend API, for example `http://localhost:3000` |

### 4. Seed demo data (optional)

The seed script creates sample doctors so the patient portal has content to display. It requires a demo password through an environment variable and will not run without one.

```bash
cd backend
# PowerShell
$env:SEED_DOCTOR_PASSWORD="choose-a-demo-password"
node --env-file=.env seed-dev.mjs
```

```bash
# macOS / Linux
SEED_DOCTOR_PASSWORD="choose-a-demo-password" node --env-file=.env seed-dev.mjs
```

### 5. Run the apps

Start each app in its own terminal:

```bash
cd backend && npm run dev     # API on http://localhost:3000
cd frontend && npm run dev    # Patient portal on http://localhost:5173
cd admin && npm run dev       # Admin panel on http://localhost:5174
```

Vite automatically chooses the next free port if the configured port is already in use.

---

## Available scripts

| Location | Command | Description |
| --- | --- | --- |
| `backend` | `npm run dev` | Start the API with nodemon |
| `frontend` | `npm run dev` | Start the patient portal |
| `frontend` | `npm run build` | Build for production |
| `admin` | `npm run dev` | Start the admin panel |
| `admin` | `npm run build` | Build for production |

---

## Security notes

- `.env` files, build output, logs, and `node_modules` are excluded from version control.
- Use a strong, unique `JWT_SECRET` and change the admin credentials before deploying.
- JWT tokens are stored in the browser's local storage in this version. For a production deployment, consider HttpOnly cookies and token expiry/refresh handling.
- Add rate limiting and input validation hardening before exposing the API publicly.

---

## Known limitations

- Doctor image uploads require valid Cloudinary credentials.
- Razorpay is imported in the backend but online payments are not implemented yet; appointments are booked without payment.
- The project does not include automated tests.

---

## Deployment

- The patient portal and admin panel can be deployed to Vercel. Both include `vercel.json` rewrites for client-side routing.
- The backend can be deployed to any Node.js host (Render, Railway, Fly.io, and similar) with the environment variables above.
- Use MongoDB Atlas for a managed production database.
