FROM node:19.2.0 as build

WORKDIR /client

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./public ./public
COPY ./tailwind.config.js ./tailwind.config.js
COPY ./src ./src

RUN npm install
RUN npm run build

FROM nginx:alpine
 
COPY /.nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build ./client/build /usr/share/nginx/html

RUN apk update && apk add bash

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]