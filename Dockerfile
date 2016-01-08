FROM node:4.2.4

RUN mkdir -p /Users/sophiecheong/Sites/bootcamp
WORKDIR /Users/sophiecheong/Sites/bootcamp

COPY package.json ./
RUN npm install

COPY . ./

EXPOSE 8080

CMD ["node", "app.js"]