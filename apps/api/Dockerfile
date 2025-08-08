# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy workspace files
COPY package*.json ./
COPY tsconfig*.json ./

# Copy packages
COPY packages ./packages

# Copy app source
COPY apps/api ./apps/api

# Install dependencies
RUN npm ci

# Build the NestJS app
RUN npm run build -w @bookmarker/api

# Production stage
FROM node:22-alpine

WORKDIR /app

# Copy workspace package files
COPY package*.json ./

# Copy built app and dependencies
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api/dist ./dist
COPY --from=build /app/packages ./packages

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]