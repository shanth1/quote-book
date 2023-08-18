FROM node:19.2.0

WORKDIR /server

COPY ./package.json ./package.json
COPY ./server ./server
# COPY ./.env ./.env

RUN npm install 

EXPOSE 4040
CMD ["npm", "start"]