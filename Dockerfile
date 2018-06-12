FROM node:alpine

COPY . /dashboard
WORKDIR /dashboard
RUN yarn install

CMD ["yarn", "start"]
