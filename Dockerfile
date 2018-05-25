FROM node:alpine

COPY . /dashboard
WORKDIR /dashboard
RUN npm install

CMD ["npm", "start"]
