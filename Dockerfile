# syntax=docker/dockerfile:1

# ---- Base ----
FROM node:22-alpine AS base
RUN npm install -g pnpm --loglevel=error

# ---- Production dependencies ----
FROM base AS prod-deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# ---- Build ----
FROM base AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# ---- Runtime ----
FROM node:22-alpine AS runtime
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 --ingroup nodejs astro

COPY --from=prod-deps --chown=astro:nodejs /app/node_modules ./node_modules
COPY --from=build     --chown=astro:nodejs /app/dist         ./dist
COPY --chown=astro:nodejs server.mjs package.json ./

USER astro

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321

EXPOSE 4321

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:$PORT/ || exit 1

CMD ["node", "server.mjs"]
