# Build
FROM node:20-alpine
WORKDIR /app/backend
COPY package*.json  ./
RUN yarn
COPY . .
RUN yarn build 
# RUN yarn run seed

# Specify the command to run your application
CMD [ "node", "dist/main.js" ]
