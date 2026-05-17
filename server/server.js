require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Import routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Validate required environment variables
const requiredEnvs = ['MONGODB_URI', 'JWT_SECRET'];
requiredEnvs.forEach((name) => {
  if (!process.env[name]) {
    console.error(`Missing required environment variable: ${name}`);
    process.exit(1);
  }
});

// Connect to database
connectDB();

// CORS configuration for deployed frontend
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
  : ['https://task-manager-seven-wheat-34.vercel.app', 'https://mern-task-manager-yl8a.onrender.com/'];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
