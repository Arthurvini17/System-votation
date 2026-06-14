# Stage 1: Install dependencies
FROM node:20-slim AS deps
# Install build dependencies for native modules (like bcrypt) and openssl for Prisma
RUN apt-get update && apt-get install -y openssl python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build the application
FROM node:20-slim AS builder
# Install openssl needed for Prisma engine during build
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 3: Runner stage
FROM node:20-slim AS runner
# Install openssl for Prisma runtime database connection
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 nextjs

# Copy built application and required dependencies
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Adjust permissions for non-root user
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Execute Prisma migrations and start the Next.js server
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
