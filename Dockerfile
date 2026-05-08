# Etapa de build
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Etapa de producción
FROM node:24-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/jsconfig.json ./
COPY --from=builder /app/src ./src

EXPOSE 3002

ENV NODE_ENV=production

CMD ["npm", "start"]
