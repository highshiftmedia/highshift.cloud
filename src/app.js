const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const connectRoutes = require('./routes/connectRoutes');
const accountRoutes = require('./routes/accountRoutes');
const postRoutes = require('./routes/postRoutes');
const keyRoutes = require('./routes/keyRoutes');

const { apiRateLimiter, ipRateLimiter } = require('./middlewares/rateLimiters');
const { requestLogger } = require('./middlewares/requestLogger');
const { errorHandler, notFound } = require('./middlewares/errorHandlers');

const swagger = require('./swagger');

const app = express();

app.set('trust proxy', 1);

// Security headers
app.use(helmet());

// Body parsing (reasonable defaults)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS allowlist
const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: function (origin, cb) {
    if (!origin) return cb(null, true); // allow server-to-server / curl
    if (!allowedOrigins.length) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('CORS blocked'), false);
  },
  credentials: false
}));

// Logging
app.use(morgan('combined'));
app.use(requestLogger);

// Rate limit: IP on all routes, API-key on protected routes
app.use(ipRateLimiter);

// Swagger
swagger(app);

// Routes
app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/connect', connectRoutes);            // unauthenticated
app.use('/linked-accounts', apiRateLimiter, accountRoutes);
app.use('/post', apiRateLimiter, postRoutes);
app.use('/', apiRateLimiter, keyRoutes);

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Serve static files from the frontend build directory
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // Handle SPA client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;
