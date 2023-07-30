FROM node:18-alpine AS base

FROM base AS dev

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci --ignore-scripts
COPY . .
# Generate prisma client
RUN npx prisma generate

FROM base AS builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci --ignore-scripts
COPY . .
# Generate prisma client
RUN npx prisma generate

# Build app
RUN npm run build

FROM base AS prod

# Create app directory
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules 

COPY package*.json ./
RUN npm install --ignore-scripts --omit=dev

COPY --from=builder /app/dist ./

RUN addgroup -g 1001 -S nodejs
RUN adduser -S apprunner -u 1001

RUN chown -R apprunner:nodejs /usr
USER apprunner

# Expose port
EXPOSE 8080

ENTRYPOINT ["node"]

CMD [ "/app/src/index.js" ]


