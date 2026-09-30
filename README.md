# ODST Airlines — Official Digital Platform & Admin Audit Portal

Official web application and digital audit platform for **PT. ODST Airlines Indonesia** in strategic partnership with **Manazil Al Mokhtara Group**.

---

## 📁 Repository Structure

```text
ODST-Airlines/
├── backend/                        # Express + MySQL + JWT + Audit Service
│   ├── config/                     # Database pool & environment config
│   ├── controllers/                # Auth, Countdown, Contact, Audit, Dashboard
│   ├── middleware/                 # JWT Auth protection, Error handling
│   ├── models/                     # Auto schema migrations & seeds
│   ├── routes/                     # REST API endpoints
│   ├── services/                   # Audit & notification services
│   ├── utils/                      # JWT, Bcrypt password hash, Response helpers
│   ├── uploads/                    # Uploads directory
│   ├── Dockerfile                  # Backend Docker container
│   ├── package.json
│   └── server.js                   # Main API Server Entrypoint
│
├── odstairlines-frontend/          # Vite + React + Tailwind CSS Web Application & Admin Portal
│   ├── src/
│   │   ├── components/admin/       # OverviewTab, CountdownTab, InquiriesTab, ContactInfoTab, AuditLogsTab
│   │   ├── pages/                  # LandingPage, ContactPage, AdminLoginPage, AdminDashboardPage
│   │   ├── services/               # API client, Axios interceptors, Auth/Countdown/Contact services
│   │   ├── context/                # Language (AR, EN, ID), Toast notifications
│   │   └── data/                   # Multilingual translations
│   ├── server.mjs                  # Production lightweight server with Reverse Proxy
│   ├── Dockerfile                  # Production multi-stage Dockerfile
│   └── package.json                # Frontend dependencies
│
├── docker-compose.yml              # Multi-container orchestration (MySQL + Backend + Frontend)
├── .env.example                    # Global environment variables template
└── .gitignore                      # Security rules (protects all .env files)
```

---

## 🔐 Environment Variables & Security

Seluruh kredensial dan kunci rahasia (Database password, JWT Secret, Admin credentials) dikonfigurasi melalui file environment `.env` di VPS / Server Anda dan tidak pernah disimpan di repository.

1. Salin file template:
   ```bash
   cp .env.example .env
   ```
2. Isi nilai kredensial di dalam file `.env`:
   - `MYSQL_ROOT_PASSWORD`
   - `DB_PASSWORD`
   - `JWT_SECRET`
   - `ADMIN_DEFAULT_EMAIL`
   - `ADMIN_DEFAULT_PASSWORD`

---

## 🚀 Menjalankan dengan Docker Compose (VPS / Production)

Untuk menjalankan seluruh stack (MySQL + Backend + Frontend) secara otomatis:

```bash
docker compose up -d --build
```

Setelah berjalan:
- **Frontend & Public Site**: `http://localhost:3000`
- **Backend REST API**: `http://localhost:5000`
- **MySQL Container**: `localhost:3307` (atau internal `mysql:3306`)

---

## 💻 Menjalankan Secara Lokal (Development)

### 1. Menjalankan Backend:
```bash
cd backend
npm install
npm run dev
```

### 2. Menjalankan Frontend:
```bash
cd odstairlines-frontend
npm install
npm run dev
```
Buka browser di `http://localhost:3000`.
