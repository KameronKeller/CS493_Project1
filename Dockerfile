FROM node
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8086
CMD [ "npm", "start" ]