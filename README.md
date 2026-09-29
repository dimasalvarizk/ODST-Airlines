# ODST Airlines

Official web application and digital platform for **PT. ODST Airlines Indonesia** in strategic partnership with **Manazil Al Mokhtara Group**.

---

## 📁 Repository Structure

```text
ODST-Airlines/
├── odstairlines-frontend/      # Vite + React + Tailwind CSS Web Application
│   ├── src/                    # Components (layout, sections, ui), Pages, Context
│   ├── public/                 # Static assets, sitemaps, icons
│   ├── server.mjs              # Production lightweight server
│   ├── Dockerfile              # Production multi-stage Dockerfile
│   └── package.json            # Frontend dependencies
│
├── docker-compose.yml          # Root multi-container orchestration
├── .env.example                # Global environment variables template
└── .gitignore                  # Security rules (protects all .env files)
```

---

## 🚀 Deployment with Coolify (VPS)

1. Connect this repository to Coolify: `https://github.com/dimasalvarizk/ODST-Airlines.git`.
2. Choose **Build Pack**: `Docker Compose` or `Dockerfile` (with Base Directory: `/odstairlines-frontend`).
3. Set your environment variables in Coolify (`MAILCHIMP_API_KEY`, etc.).
4. Click **Deploy**.
