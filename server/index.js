// Entry point for Express server
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const routes = require('./routes/submissions');
const { errorHandler } = require('./middleware/errorHandler');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security headers and CORS
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// Session for DSpace auth
app.use(
  session({
    name: 'DSpaceSession',
    secret: process.env.SESSION_SECRET || 'devsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);
// File upload middleware (handles multipart/form-data securely)
app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  abortOnLimit: true,
  safeFileNames: true,
  preserveExtension: true
}));
// API routes
app.use('/api/submissions', routes);
// Error handler
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));