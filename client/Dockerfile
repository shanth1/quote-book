FROM node:19.2.0

WORKDIR /client

COPY ./package.json ./package.json
COPY ./public ./public
COPY ./tailwind.config.js ./tailwind.config.js

COPY ./src ./src

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]