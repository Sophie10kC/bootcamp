FROM node:4.2.4

RUN mkdir -p /usr/src/app
WORKDIR /Users/sophiecheong/Sites/bootcamp

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app

EXPOSE 8080

CMD["npm", "start"]