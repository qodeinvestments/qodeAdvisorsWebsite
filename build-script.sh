#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status.

echo "Deploying frontend..."
cd /var/www/www.qodeinvestments.com/frontend

git fetch origin
git stash
git pull origin main

npm ci  # Use 'ci' instead of 'install' for more consistent builds
npm run build

pm2 restart react-app || pm2 start server.js --name "react-app"

echo "Deploying backend..."
cd /var/www/www.qodeinvestments.com/backend

git fetch origin
git pull origin main

npm ci

pm2 restart react-backend || pm2 start app.js --name "react-backend"

echo "Reapplying stashed changes..."
cd /var/www/www.qodeinvestments.com/frontend
git stash pop

echo "Deployment completed successfully."