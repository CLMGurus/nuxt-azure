FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy only the built application from the build stage
COPY --from=build /app/.output /app

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Start the application
CMD ["node", "/app/server/index.mjs"]