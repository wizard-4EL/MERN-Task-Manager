# MERN Task Manager Application

A full-stack Task Manager application built with MongoDB, Express, React, and Node.js, featuring user authentication, task management with categories and due dates, and a dark mode interface.

## Features

✅ **User Authentication**
- Sign up / Login with JWT tokens
- Secure password hashing with bcryptjs
- Protected routes

✅ **Task Management**
- Create, read, update, and delete tasks
- Organize tasks by categories (Work, Personal, Shopping, Health, Other)
- Set task priority levels (Low, Medium, High)
- Add due dates to tasks
- Track task status (Not Started, In Progress, Completed)
- Mark tasks as completed

✅ **User Interface**
- Modern, responsive design
- Filter tasks by category and status
- Real-time task updates
- Dark mode toggle
- Mobile-friendly layout

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

## Project Structure

```
MERN-Task Manager/
├── server/                  # Backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Auth & error middleware
│   ├── utils/             # Utility functions
│   ├── server.js          # Main server file
│   ├── package.json       # Dependencies
│   └── .env.example       # Environment variables template
│
└── client/                 # Frontend
    ├── public/            # Static files
    ├── src/
    │   ├── components/    # React components
    │   ├── pages/        # Page components
    │   ├── context/      # Context API
    │   ├── hooks/        # Custom hooks
    │   ├── styles/       # CSS files
    │   ├── utils/        # Utility functions
    │   ├── App.js        # Main app component
    │   └── index.js      # React entry point
    ├── package.json      # Dependencies
    └── .gitignore       # Git ignore rules
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev  # with nodemon
# or
npm start   # without nodemon
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Tasks
- `GET /api/tasks` - Get all tasks (Protected)
  - Query params: `category`, `status`
- `GET /api/tasks/:id` - Get single task (Protected)
- `POST /api/tasks` - Create task (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks/:id` - Delete task (Protected)

## Authentication Flow

1. User signs up with email and password
2. Server hashes password and saves user to MongoDB
3. JWT token is returned and stored in localStorage
4. Token is sent with every protected request in Authorization header
5. Middleware verifies token before allowing access

## Task Schema

```javascript
{
  user: ObjectId,           // Reference to User
  title: String,            // Task title (required)
  description: String,      // Task description
  category: String,         // Work, Personal, Shopping, Health, Other
  status: String,          // Not Started, In Progress, Completed
  dueDate: Date,           // Task due date
  priority: String,        // Low, Medium, High
  completed: Boolean,      // Completion status
  createdAt: Date,         // Creation timestamp
  updatedAt: Date          // Update timestamp
}
```

## Features Details

### Dark Mode
- Toggle between light and dark themes
- Preference saved in localStorage
- Applied across all pages

### Task Filtering
- Filter by category
- Filter by status
- Combine multiple filters

### Task Completion
- Mark tasks as completed with checkbox
- Tasks show visual feedback when completed
- Status can be updated independently

## Security Features

✅ Password hashing with bcryptjs
✅ JWT token-based authentication
✅ Protected routes on frontend
✅ Authorization middleware on backend
✅ CORS enabled for secure cross-origin requests

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

## Development Tips

### Running Both Servers Concurrently
From the root directory:
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm start
```

### Database
- MongoDB local: `mongodb://localhost:27017/task-manager`
- MongoDB Atlas: Use connection string from your cluster

### Debugging
- Backend: Check console.log and server terminal
- Frontend: Use browser DevTools
- Network: Check Network tab for API calls

## Future Enhancements

- [ ] Task reminders/notifications
- [ ] Recurring tasks
- [ ] Task attachments
- [ ] Collaboration features
- [ ] Task templates
- [ ] Analytics dashboard
- [ ] Mobile app
- [ ] Email notifications

## License

MIT License

## Support

For issues or questions, please create an issue in the repository.

---

**Happy Task Managing! 🎯**
