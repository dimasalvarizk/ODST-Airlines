# =================================================================
# ODST AIRLINES - PRODUCTION DOCKERFILE FOR COOLIFY / VPS HOSTINGER
# =================================================================

# -----------------------------------------------------------------
# STAGE 1: Builder
# -----------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies with clean cache
COPY package*.json ./
RUN npm ci

# Copy source code (Secrets & .env are excluded via .dockerignore)
COPY . .

# Build the optimized production bundle (TypeScript check + Vite build)
RUN npm run build

# -----------------------------------------------------------------
# STAGE 2: Production Runner (Ultra-Lightweight & Secure)
# -----------------------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment defaults
ENV NODE_ENV=production
ENV PORT=3000

# Copy compiled static assets and server script
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.mjs ./server.mjs

# Use non-root node user for container security
USER node

# Expose application port for Coolify / Docker proxy
EXPOSE 3000

# Built-in Healthcheck for Coolify container monitoring (Alpine BusyBox compatible)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q -O - http://127.0.0.1:3000/health || exit 1

# Start production server
CMD ["node", "server.mjs"]
