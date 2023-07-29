FROM node:18-alpine as base

FROM base as dev

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci

FROM base as builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci

# Bundle app source
COPY . .

# Generate prisma client
RUN npx prisma generate

# Build app
RUN npm run build

FROM base as prod

# Create app directory
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules 

COPY package*.json ./
RUN npm install --ignore-scripts --omit=dev
RUN npx prisma generate
COPY --from=builder /app/dist ./

RUN addgroup -g 1001 -S nodejs
RUN adduser -S apprunner -u 1001

RUN chown -R apprunner:nodejs /usr
USER apprunner

# Expose port
EXPOSE 8080

# Start app
CMD [ "node", "/app/index.js" ]


