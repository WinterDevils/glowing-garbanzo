FROM node:16-alpine

ENV FIRESTORE_EMULATOR_HOST="host.docker.internal:8080"
WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY ./pi.js .
COPY ./docker/start.sh /usr/local/bin/start
RUN chmod u+x /usr/local/bin/start

CMD [ "start" ]