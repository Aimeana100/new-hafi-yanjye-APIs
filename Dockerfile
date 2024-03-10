# Build
FROM node:20-alpine AS build
WORKDIR /app/backend
COPY package*.json  ./
RUN yarn
COPY . .
RUN yarn build 
# RUN yarn run seed


# Production
FROM node:20-alpine AS production
WORKDIR /app/backend


# Copy built files and node_modules from the build stage
COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/node_modules ./node_modules

# Expose the port if needed (not necessary in most cases)
EXPOSE 3000


# Specify the command to run your application
CMD [ "node", "dist/main.js" ]
