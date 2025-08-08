# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy workspace files
COPY package*.json ./
COPY tsconfig*.json ./
COPY eslint.config.js ./
COPY .prettierrc.js ./

# Copy packages
COPY packages ./packages

# Copy app source
COPY apps/web ./apps/web

# Install dependencies
RUN npm ci

# Build the Angular app
RUN npm run build -w @bookmarker/web

# Production stage
FROM nginx:alpine

# Copy built app to nginx
COPY --from=build /app/apps/web/dist/web/browser /usr/share/nginx/html

# Copy nginx config for SPA routing
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]