### Builder Stage
FROM node:22-alpine AS builder

# settings
ARG PNPM_VERSION=10.11.1
ENV NEXT_TELEMETRY_DISABLED=1 \
    PATH="/root/.local/share/pnpm:$PATH"

# packages
RUN apk add --no-cache bash curl && \
    curl -fsSL "https://get.pnpm.io/install.sh" | SHELL=bash sh - && \
    apk del curl

# copy
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

# run
RUN pnpm build


### Development Stage
FROM node:22-alpine AS development

# settings
ARG PNPM_VERSION=10.11.1
ENV NEXT_TELEMETRY_DISABLED=1 \
    CI=true \
    PATH="/root/.local/share/pnpm:$PATH" \
    NODE_ENV=development

# packages
RUN apk add --no-cache bash curl && \
    curl -fsSL "https://get.pnpm.io/install.sh" | env SHELL=bash PNPM_VERSION="${PNPM_VERSION}" sh - && \
    apk del curl

# copy
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

# run dev
EXPOSE 3000
CMD ["pnpm", "dev"]


### Production Stage
FROM node:22-alpine AS production

# settings
ARG PNPM_VERSION=10.11.1
ENV NEXT_TELEMETRY_DISABLED=1 \
    CI=true \
    PATH="/root/.local/share/pnpm:$PATH" \
    NODE_ENV=production

# packages
RUN apk add --no-cache bash curl && \
    curl -fsSL "https://get.pnpm.io/install.sh" | env SHELL=bash PNPM_VERSION="${PNPM_VERSION}" sh - && \
    apk del curl

# copy
WORKDIR /app
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod && \
    pnpm store prune
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# run prod
EXPOSE 60808
CMD ["pnpm", "start"]
