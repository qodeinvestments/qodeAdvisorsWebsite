# --- Build Stage ---
    FROM node:18-alpine AS builder

    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    RUN npm run build || true  # optional if you have any build step (safe)
    
    # --- Production Stage ---
    FROM node:18-alpine
    
    WORKDIR /app
    COPY package*.json ./
    RUN npm install --only=production
    COPY --from=builder /app /app
    
    # Important change:
    EXPOSE 5000
    
    CMD ["node", "app.js"]
    
