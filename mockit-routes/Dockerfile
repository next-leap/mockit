FROM node:11.4.0-alpine

RUN mkdir -p /usr/src/mockit-routes
WORKDIR /usr/src/mockit-routes

COPY package.json .
COPY package-lock.json .

RUN npm i --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "start"]