# =========================
# 1) Dependencies
# =========================
FROM node:20-alpine AS deps
WORKDIR /app

# If your Next.js app is inside fleet-management-app/ (as your log shows)
COPY fleet-management-app/package*.json ./
RUN npm install

# =========================
# 2) Build
# =========================
FROM node:20-alpine AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY fleet-management-app/. .

# ---- Build-time env (required by your auth config check) ----
ARG KEYCLOAK_ID
ARG KEYCLOAK_SECRET
ARG KEYCLOAK_ISSUER
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG NEXT_PUBLIC_VEHICLE_SERVICE_URL
ARG NEXT_PUBLIC_DRIVER_SERVICE_URL
ARG NEXT_PUBLIC_MAINTENANCE_SERVICE_URL

ENV KEYCLOAK_ID=$KEYCLOAK_ID
ENV KEYCLOAK_SECRET=$KEYCLOAK_SECRET
ENV KEYCLOAK_ISSUER=$KEYCLOAK_ISSUER
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXT_PUBLIC_VEHICLE_SERVICE_URL=$NEXT_PUBLIC_VEHICLE_SERVICE_URL
ENV NEXT_PUBLIC_DRIVER_SERVICE_URL=$NEXT_PUBLIC_DRIVER_SERVICE_URL
ENV NEXT_PUBLIC_MAINTENANCE_SERVICE_URL=$NEXT_PUBLIC_MAINTENANCE_SERVICE_URL

RUN npm run build

# =========================
# 3) Runner
# =========================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy Next build output
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
