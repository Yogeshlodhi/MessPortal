FROM  node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# COPY .env .

EXPOSE 4000

CMD ["node", "index.js"]