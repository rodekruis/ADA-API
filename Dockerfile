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

ARG ADMIN_CODE
ENV ADMIN_CODE=$ADMIN_CODE

ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET

USER node
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY --chown=node:node . .

COPY --from=builder /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod"]
