FROM node:22

WORKDIR /app

COPY ./package*.json .
COPY ./backend/package*.json .
COPY ./frontend/package*.json .
COPY ./backend/prisma .

COPY . .

RUN npm install


RUN npm run build

CMD node backend/dist/src/main.js
