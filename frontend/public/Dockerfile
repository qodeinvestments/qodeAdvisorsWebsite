# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Serve the application using a lightweight HTTP server
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to start the app
CMD ["serve", "-s", "dist"]
