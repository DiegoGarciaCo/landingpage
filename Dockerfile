# Base image (glibc)
FROM node:20-bookworm AS base
WORKDIR /app

# ------------------------
# Dependencies stage
# ------------------------
FROM base AS deps

RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN npm ci

# ------------------------
# Builder stage
# ------------------------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Build with secrets
RUN --mount=type=secret,id=X-API-KEY,env=X-API-KEY \
    --mount=type=secret,id=NEXT_PUBLIC_BASE_URL,env=NEXT_PUBLIC_BASE_URL \
    --mount=type=secret,id=PORT,env=PORT \
    --mount=type=secret,id=NEXT_PUBLIC_CLARITY_ID,env=NEXT_PUBLIC_CLARITY_ID \
    npm run build

# ------------------------
# Runner stage
# ------------------------
FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN useradd -m ghost

COPY --from=builder /app/public ./public
COPY --from=builder --chown=ghost:ghost /app/.next/standalone ./
COPY --from=builder --chown=ghost:ghost /app/.next/static ./.next/static

USER ghost

EXPOSE 3005
ENV PORT=3005
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
