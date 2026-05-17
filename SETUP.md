# Getting Started with MERN Task Manager

## Quick Start Guide

### 1. Install Dependencies

**Server:**
```bash
cd server
npm install
```

**Client:**
```bash
cd client
npm install
```

### 2. Configure Environment

Create `server/.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_secret_key_change_in_production
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running:
```bash
# Using local MongoDB
mongod

# Or use MongoDB Atlas (update MONGODB_URI in .env)
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

The application will open at `http://localhost:3000`

## First Time Setup

1. Create an account by clicking "Sign Up"
2. Enter your name, email, and password
3. Log in with your credentials
4. Start creating tasks!

## Available Scripts

### Server
- `npm start` - Start server
- `npm run dev` - Start with auto-reload (nodemon)

### Client
- `npm start` - Start development server
- `npm build` - Create production build
- `npm test` - Run tests
- `npm eject` - Eject from create-react-app (irreversible)

## Features

✅ **Authentication**
- Sign up with email and password
- Secure login with JWT
- Protected dashboard

✅ **Tasks**
- Create new tasks with title, description
- Set category, priority, and due date
- Update task status
- Mark as completed
- Delete tasks

✅ **Filtering**
- Filter by category
- Filter by status
- Combine multiple filters

✅ **Dark Mode**
- Toggle light/dark theme
- Preference persists across sessions

## API Base URL

- Development: `http://localhost:5000/api`
- Proxy configured in client package.json

## Database

### Collections
- **users** - User accounts
- **tasks** - Task data

### Models
- User - name, email, password, createdAt, updatedAt
- Task - user, title, description, category, status, dueDate, priority, completed, createdAt, updatedAt

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify port 5000 is not in use
- Check MONGODB_URI in .env

### Frontend won't connect to API
- Verify backend is running on port 5000
- Check browser console for errors
- Verify proxy setting in client/package.json

### Login/Signup issues
- Check email format
- Verify password is at least 6 characters
- Check browser console for API errors

### Tasks not loading
- Check if user is logged in
- Verify MongoDB has data
- Check network tab in DevTools

## Next Steps

1. Explore the codebase structure
2. Try creating and managing tasks
3. Test filtering and dark mode
4. Review API endpoints in backend
5. Customize styling as needed

## Project Links

- README.md - Full documentation
- .github/copilot-instructions.md - Development guidelines

---

**Happy coding! 🚀**
