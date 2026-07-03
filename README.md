# MERN Task Manager

A full-stack Task Manager application built using the MERN stack. It allows users to create, update, complete, and delete tasks with a responsive and intuitive interface.

---

## MERN Assignment

### Task

Build a Task Manager application that supports complete CRUD operations with a clean user interface and RESTful backend.

### Solution

Developed a full-stack MERN application featuring:

- Create new tasks
- View all tasks
- Update existing tasks
- Mark tasks as completed/incomplete
- Delete tasks
- Real-time UI updates without page refresh
- Reusable React components
- Context API for global state management
- RESTful API using Express.js
- MongoDB for data persistence
- Responsive design using Tailwind CSS

---

## Tech Stack

### Frontend

- React.js
- Context API
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Project Structure

```
task-manager/
├── Frontend/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── src/
│   ├── |-> main.jsx, app.jsx
│   └── package.json
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Features

- CRUD Operations
- Clean and reusable component architecture
- RESTful API
- Responsive UI
- Global state management with Context API
- Dynamic UI updates without refreshing the page
- Error handling
- Toast notifications

---

## Installation

### Clone the repository

```bash
git clone https://github.com/RonTheCoder50/AssignmentTask_MERN
```

### Install dependencies

#### Backend

```bash
cd Backend
npm install
```

#### Frontend

```bash
cd Frontend
npm install
```

---

## Environment Variables

- Backend
  Create a `.env` file inside the `Backend` folder.

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
```

- Frontend
  Create a `.env` file inside the `Frontend` folder.

```env
VITE_API_URL=your_vercel_app_url
```

---

## Run Locally

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

## API Endpoints

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/tasks`     | Get all tasks |
| POST   | `/api/tasks`     | Create a task |
| PUT    | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## Future Improvements

- User Authentication (JWT)
- Task Categories
- Search & Filter
- Due Dates
- Drag & Drop Tasks
- Pagination

---

## Author

**Rohan Vaybhase**
