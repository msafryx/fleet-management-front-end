# =========================
# Base image
# =========================
FROM node:20-alpine AS base
WORKDIR /app

# =========================
# Install dependencies
# =========================
FROM base AS deps

# Copy only package files from the Next.js app folder
COPY fleet-management-app/package*.json ./

# Install dependencies (you can change to `npm ci` if you use package-lock.json)
RUN npm install

# =========================
# Build the Next.js app
# =========================
FROM deps AS build

# Copy the rest of the Next.js app source
COPY fleet-management-app/. .

# Disable Next telemetry (optional)
ENV NEXT_TELEMETRY_DISABLED=1

# Build for production (uses Turbopack under the hood in Next 15)
RUN npm run build

# =========================
# Production runtime image
# =========================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security (optional but good)
RUN addgroup -g 1001 nodejs \
  && adduser -D -G nodejs nextjs
USER nextjs

# Copy necessary files from build stage
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Next.js default port
EXPOSE 3000

# Start the production server
CMD ["npm", "run", "start"]
