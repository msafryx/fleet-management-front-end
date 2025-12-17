# =========================
# 1) Dependencies
# =========================
FROM node:20-alpine AS deps
WORKDIR /app

COPY fleet-management-app/package*.json ./
RUN npm install

# =========================
# 2) Build
# =========================
FROM node:20-alpine AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY fleet-management-app/. .

# ---------------------------------------------------------
# IGNORE KEYCLOAK / NEXTAUTH for now:
# Provide safe dummy values so "npm run build" does not fail.
# ---------------------------------------------------------
ENV KEYCLOAK_ID="disabled"
ENV KEYCLOAK_SECRET="disabled"
ENV KEYCLOAK_ISSUER="http://disabled.local"
ENV NEXTAUTH_URL="http://localhost:3000"
ENV NEXTAUTH_SECRET="disabled-disabled-disabled-disabled-disabled"

# Optional dummy backend URLs (adjust later when backend is ready)
ENV NEXT_PUBLIC_VEHICLE_SERVICE_URL="http://localhost:7001"
ENV NEXT_PUBLIC_DRIVER_SERVICE_URL="http://localhost:6001"
ENV NEXT_PUBLIC_MAINTENANCE_SERVICE_URL="http://localhost:5001"

RUN npm run build

# =========================
# 3) Runner
# =========================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
