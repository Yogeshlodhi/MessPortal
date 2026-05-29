# ─── Stage 1: build the Vite static bundle ───────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Install all deps (dev deps are needed for tsc + vite build).
COPY package*.json ./
RUN npm ci

COPY . .

# Backend URL is baked into the bundle at build time. Override with:
#   docker build --build-arg VITE_API_BASE_URL=https://api.example.com/api .
ARG VITE_API_BASE_URL=http://localhost:4000/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
# Served at root in containers, so leave VITE_BASE_PATH unset ("/").

RUN npm run build

# ─── Stage 2: serve with nginx ───────────────────────────────────────────
FROM nginx:1.27-alpine AS runtime

# SPA-aware config (history fallback to index.html).
COPY nginx.conf /etc/nginx/conf.d/default.conf

# vite.config.mts sets build.outDir to "build".
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
