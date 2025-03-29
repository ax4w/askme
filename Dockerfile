FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


RUN npm run build

FROM node:20-alpine AS production


WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./

RUN npm install --omit=dev
RUN mkdir -p /data

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000


CMD ["node", "build"] 