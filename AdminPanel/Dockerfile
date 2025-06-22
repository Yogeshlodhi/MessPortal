FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

EXPOSE 5174
CMD ["npm", "run", "dev", "--", "--host", "--port", "5174"]