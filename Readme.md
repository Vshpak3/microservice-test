# Project Setup Guide

## Running Without Docker

### Backend (Lumen)
1. Navigate to the backend directory:
   ```sh
   cd backend-lumen
   ```
2. Copy the environment configuration file:
   ```sh
   cp .env.example .env
   ```
3. Update `.env` with your credentials.
4. Install dependencies:
   ```sh
   composer install
   ```
5. Run database migrations:
   ```sh
   php artisan migrate
   ```
6. Start the backend server:
   ```sh
   php artisan serve
   ```

### Node.js Service
1. Navigate to the Node.js project directory:
   ```sh
   cd node-redis-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Node.js server:
   ```sh
   npx ts-node src/index.ts
   ```

### Frontend (React)
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend application:
   ```sh
   npm start
   ```

---

## Running with Docker
To build and start all services using Docker, run:
```sh
docker-compose up --build
```

---

## Service URLs
- **Lumen API**: [http://localhost:8000](http://localhost:8000)
- **Frontend**: [http://localhost:3001](http://localhost:3001)
- **Node.js Service**: [http://localhost:3000](http://localhost:3000)