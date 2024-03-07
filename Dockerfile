# Build
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json  ./
RUN yarn
COPY . .
RUN yarn build 
# RUN yarn run seed


# Production
FROM node:20-alpine AS production
WORKDIR /usr/src/app


# Copy built files and node_modules from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

# Expose the port if needed (not necessary in most cases)
EXPOSE 3000


# Specify the command to run your application
CMD [ "node", "dist/main.js" ]
