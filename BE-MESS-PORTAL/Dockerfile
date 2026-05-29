FROM node:20-alpine

WORKDIR /app

# Install production dependencies first to leverage Docker layer caching
COPY package*.json ./
RUN npm install --omit=dev

COPY . .

ENV NODE_ENV=production
EXPOSE 4000

CMD ["node", "index.js"]
