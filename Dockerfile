# Use Node.js 20 Alpine as base image
FROM node:20-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM node:20-alpine AS production

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies including dev dependencies needed for runtime
RUN pnpm install --frozen-lockfile

# Copy built application from base stage
COPY --from=base /app/build build/
COPY --from=base /app/package*.json .

# Expose port 3002
EXPOSE 3002

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3002
ENV HOST=0.0.0.0

# Start the application
CMD ["node", "build"]
