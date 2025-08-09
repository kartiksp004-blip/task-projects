# Full Stack Real‑Time Chat App

> A modern real‑time chat application built with the **MERN stack**, **Socket.io**, and **TailwindCSS + Daisy UI**, featuring user authentication with JWT, online status.



 Features

- MERN stack: MongoDB, Express, React, Node.js
- Real-time messaging using Socket.io  
- User authentication & authorization with JWT  
- Online/offline presence status  
- Global state management  
- TailwindCSS with **Daisy UI** for clean, responsive UI  
- Basic error handling on both server and client  
- Free deployment guide included  



 Setup Instructions

### 1. Clone and Install

```bash
git clone <YOUR_REPO_URL>
cd <YOUR_PROJECT_FOLDER>

2. Setup .env
Create a .env file in the root of the backend folder with:

ini
Copy
Edit
MONGODB_URI=<your MongoDB connection URI>
PORT=5001
JWT_SECRET=<your JWT secret>

CLOUDINARY_CLOUD_NAME=<...>
CLOUDINARY_API_KEY=<...>
CLOUDINARY_API_SECRET=<...>

NODE_ENV=development

3. Install Dependencies
bash
Copy
Edit
# for backend:
cd backend
npm install

# for frontend:
cd ../frontend
npm install

4. Build & Run
bash
Copy
Edit
# build frontend
cd frontend
npm run build

# go back to backend and start server
cd ../backend
npm start

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

NODE_ENV=development
```

### Build the app

```shell
npm run build
```

### Start the app

```shell
npm start
```
