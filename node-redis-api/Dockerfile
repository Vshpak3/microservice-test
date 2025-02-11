# Use the official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copy application files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npx", "ts-node", "src/index.ts"]