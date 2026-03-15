# ── Stage 1: Install deps ──
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ── Stage 2: Build ──
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ── Stage 3: Grab ngrok binary from official image ──
FROM ngrok/ngrok:alpine AS ngrok

# ── Stage 4: Run (app + ngrok in one container) ──
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8888

RUN apk add --no-cache supervisor

COPY --from=ngrok /bin/ngrok /usr/local/bin/ngrok

COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY supervisord.conf /etc/supervisord.conf

EXPOSE 8888

CMD ["supervisord", "-c", "/etc/supervisord.conf"]
