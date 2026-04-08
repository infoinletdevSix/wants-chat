# Self-Hosting Guide

Deploy Wants AI on your own infrastructure.

## Requirements

- **Server**: 2+ CPU cores, 4GB+ RAM
- **Docker**: 20.10+ with Docker Compose v2
- **Domain**: With DNS configured (optional but recommended)
- **Database**: PostgreSQL 15+ (included in Docker Compose)

## Quick Start with Docker Compose

```bash
# Clone the repository
git clone https://github.com/wants-chat/wants-chat.git
cd wants-chat

# Copy and configure environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit backend/.env with your configuration:
# - Set a strong JWT_SECRET (any long random string)
# - Add your OPENROUTER_API_KEY for AI features
# - Set CORS_ORIGIN to your frontend domain (e.g. https://your-domain.com)
#
# Note: when running via docker compose you do NOT need to set DB_HOST,
# DB_USER, DB_PASSWORD, or DB_NAME in backend/.env — the compose file
# injects them automatically so the backend connects to the postgres
# service. If you want to customize the DB credentials, set
# POSTGRES_USER / POSTGRES_PASSWORD / POSTGRES_DB at the repo root .env
# (not backend/.env) and compose will pick them up.

# Edit frontend/.env if you're using a custom domain:
# - VITE_API_URL should point at your backend (default: http://localhost:3001)
# - VITE_SOCKET_URL should match (used for real-time features)

# Start in production mode
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Environment Configuration

### Required Variables (backend/.env)

| Variable | Description |
|----------|-------------|
| `JWT_SECRET` | Secret for JWT token signing (use a long random string) |
| `OPENROUTER_API_KEY` | API key from [OpenRouter](https://openrouter.ai); required for all AI chat features |
| `CORS_ORIGIN` | Your frontend origin(s), comma-separated (e.g., `https://your-domain.com`) |
| `FRONTEND_URL` | Your frontend URL — used for email links and redirects |

When running the full stack through `docker compose`, the database and Redis
connection settings (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`,
`REDIS_HOST`, `REDIS_PORT`) are set automatically by the compose file —
you do not need to set them in `backend/.env`.

If you want to override the default database credentials, set these in a
`.env` file at the **repo root** (compose reads this automatically):

| Variable | Default | Description |
|----------|---------|-------------|
| `POSTGRES_USER` | `wants` | Postgres superuser for the container |
| `POSTGRES_PASSWORD` | `wants_secret` | Postgres password — **change this for any public deploy** |
| `POSTGRES_DB` | `wants` | Database name |

### Required Variables (frontend/.env)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend HTTP URL (default `http://localhost:3001`, or your backend domain) |
| `VITE_SOCKET_URL` | Backend WebSocket URL — usually same origin as `VITE_API_URL` |
| `VITE_SITE_URL` | Your frontend's own URL (used in SEO tags and share links) |

### Optional Variables

These unlock additional features; the app runs without them but the
corresponding feature will be disabled:

| Variable | Unlocks |
|----------|---------|
| `RUNWARE_API_KEY` | AI image & video generation (FLUX, SDXL, KlingAI, Vidu) |
| `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` | Paid plans / billing UI |
| `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` | Transactional email via Amazon SES |
| `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_R2_*` | File uploads & storage on Cloudflare R2 |
| `TAVILY_API_KEY`, `EXA_API_KEY`, `JINA_API_KEY`, `FIRECRAWL_API_KEY` | Research mode / deep web search |
| `GITHUB_APP_ID`, `GITHUB_APP_CLIENT_ID`, `GITHUB_PRIVATE_KEY`, etc. | GitHub sync for generated apps |

See `backend/.env.example` for the complete list and inline documentation.

## Architecture

```
                    ┌──────────────┐
                    │    Nginx     │ :80/:443
                    │  (optional)  │
                    └──────┬───────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
     ┌──────┴───────┐              ┌──────┴───────┐
     │  Frontend    │              │   Backend    │
     │    :5173     │              │    :3001     │
     │ (Vite/React) │              │   (NestJS)   │
     └──────────────┘              └──┬────────┬──┘
                                      │        │
                             ┌────────┴─┐   ┌──┴───────┐
                             │ Postgres │   │  Redis   │
                             │  :5433   │   │  :6379   │
                             └──────────┘   └──────────┘
```

Container ports differ from host ports. In `docker-compose.yml`:

| Service | Container port | Host port |
|---------|---------------|-----------|
| Frontend (Vite dev server) | 3000 | **5173** |
| Backend (NestJS) | 3000 | **3001** |
| Postgres | 5432 | **5433** (to avoid clashing with a local postgres) |
| Redis | 6379 | 6379 |

## Reverse Proxy (Nginx)

If deploying behind a reverse proxy, configure Nginx:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:5173;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # WebSocket
    location /socket.io/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

## SSL/TLS

We recommend using [Certbot](https://certbot.eff.org/) with Let's Encrypt:

```bash
sudo certbot --nginx -d your-domain.com
```

## Updating

```bash
cd wants-chat
git pull origin main
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

## Monitoring

Check service health:

```bash
# Service status
docker compose ps

# View logs
docker compose logs -f backend
docker compose logs -f frontend

# Health check endpoint
curl http://localhost:3001/health
```

## Backup

```bash
# Backup PostgreSQL (defaults: user=wants, db=wants)
docker compose exec postgres pg_dump -U wants wants > backup.sql

# Restore
docker compose exec -T postgres psql -U wants wants < backup.sql
```

If you customized `POSTGRES_USER` / `POSTGRES_DB` at the repo root `.env`,
substitute those values into the commands above.

## Troubleshooting

### Backend can't connect to the database
- Check postgres logs: `docker compose logs postgres`
- If running under docker compose, leave `DB_HOST`, `DB_USER`, `DB_PASSWORD`,
  `DB_NAME` **unset** in `backend/.env` — compose injects them. Having stale
  values in `backend/.env` is harmless (compose overrides them), but older
  guides may tell you to set `DB_HOST=postgres` manually — that's no longer
  required.
- If running the backend directly on the host (no docker), set `DB_HOST`,
  `DB_PORT=5433` (the exposed host port), `DB_USER=wants`, `DB_PASSWORD=wants_secret`,
  `DB_NAME=wants` in `backend/.env`.

### Frontend can't reach the API
- Confirm `VITE_API_URL` in `frontend/.env` points at the backend. When using
  the provided `docker-compose.yml`, this is set to `http://localhost:3001`
  automatically via the compose `environment` block.
- Verify `CORS_ORIGIN` in `backend/.env` includes the frontend origin.
- If you see 404s on `/api/...`, remember the backend's `API_PREFIX` defaults
  to `api/v1` — check your reverse proxy's location block.

### WebSocket disconnects
- Ensure your reverse proxy passes the `Upgrade` and `Connection` headers
  (see the Nginx snippet above).
- `VITE_SOCKET_URL` should share a scheme and host with `VITE_API_URL`.

### `docker compose up` exits immediately with "permission denied"
- On Linux, your user needs to be in the `docker` group:
  `sudo usermod -aG docker $USER && newgrp docker`.

### Postgres port 5433 is already in use
- You have something else on host port 5433. Either stop it, or change the
  mapping in `docker-compose.yml` (`"5433:5432"` → `"5434:5432"` etc).
