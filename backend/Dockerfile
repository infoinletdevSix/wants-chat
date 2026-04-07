# wants.chat Backend Dockerfile
# Multi-stage build for different environments
#
# We use Debian (bookworm-slim) instead of Alpine because many of our native
# dependencies (sharp, puppeteer) ship prebuilt binaries for glibc but not for
# musl, and Alpine's package mirrors have been unreliable in CI.

# =============================================
# Base stage - Common dependencies
# =============================================
FROM node:20-bookworm-slim AS base

# Install system dependencies
# - dumb-init, curl: runtime
# - python3, make, g++: node-gyp fallback for any package without prebuilts
# - ca-certificates: TLS for HTTPS calls from the app
RUN apt-get update && apt-get install -y --no-install-recommends \
    dumb-init \
    curl \
    ca-certificates \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Create non-root user
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs --shell /bin/false nestjs

# Copy package files
COPY package*.json .npmrc* ./

# =============================================
# Dependencies stage - Install all dependencies
# =============================================
FROM base AS deps

# Install only production dependencies (deterministic via lockfile)
RUN npm ci --omit=dev --no-audit --no-fund && npm cache clean --force

# =============================================
# Build stage - Build the application
# =============================================
FROM base AS build

# Copy all dependencies (including dev) for the build
COPY package*.json .npmrc* ./
RUN npm ci --no-audit --no-fund

# Copy source code
COPY . .

# Build the application
RUN npm run build

# =============================================
# Development stage - For development environment
# =============================================
FROM base AS development

# Install all dependencies (including dev) for the watch-mode dev server
RUN npm ci --no-audit --no-fund

# Copy source code
COPY . .

# Change ownership to nodejs user
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application in development mode
CMD ["dumb-init", "npm", "run", "start:dev"]

# =============================================
# Production stage - For production environment
# =============================================
FROM base AS production

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy built application from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Copy necessary runtime files
COPY --from=build /app/src/database ./src/database

# Change ownership to nodejs user
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application in production mode
CMD ["dumb-init", "node", "dist/main"]