FROM node:19.2.0

WORKDIR /server

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./src ./src

RUN npm install 

EXPOSE 4040
CMD ["npm", "start"]