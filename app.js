import express from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import requestLogger from './middleware/loggerMiddleware.js';
import logger from './utils/logger.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Body parser
app.use(cors()); // Enable CORS for cross-origin requests
app.use(requestLogger); // Logging requests

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Error Handler Middleware (must be last)
app.use(errorMiddleware);

// Root Route
app.get('/', (req, res) => {    
    res.send('API is running...');
});

// Start Server
app.listen(port, () => {
    logger.info(`🚀 Server running on port ${port}`);
});
