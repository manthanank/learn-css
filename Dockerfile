# Build stage
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src/ ./src/
RUN npm run build

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY src/index.html ./src/index.html
COPY src/styles.css ./src/styles.css

EXPOSE 3000

CMD ["node", "dist/server.js"]