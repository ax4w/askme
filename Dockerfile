FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN echo "DEEPSEEK_API_KEY=placeholder_for_build_only" > .env && \
    echo "GEMINI_API_KEY=placeholder_for_build_only" >> .env && \
    echo "ADMIN_PW=placeholder_for_build_only" >> .env


RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./

RUN npm install

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["node", "build"] 