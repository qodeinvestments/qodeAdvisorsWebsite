#!/bin/bash

echo "Navigating to project directory..."
cd /var/www/www.qodeinvestments.com/frontend || exit

echo "Stashing local changes..."
git stash

echo "Pulling latest changes..."
git pull origin main || exit

echo "Installing dependencies..."
npm install || exit

echo "Building the React project..."
npm run build || exit

echo "Restarting the application with PM2..."
pm2 restart react-app || pm2 start server.js --name "react-app" || exit

echo "Reapplying stashed changes..."
git stash pop

echo "Deployment script completed."
