# Use the official Node.js 18 Alpine image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# --- Production stage ---
FROM node:18-alpine

# Install only the lightweight HTTP server
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy build files from previous stage
COPY --from=build /app/dist ./dist

# Expose desired port
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "dist", "-l", "3000"]
