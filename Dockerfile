FROM node:16-alpine as builder

USER node
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:16-alpine as server

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

USER node
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

COPY --from=builder /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod"]
