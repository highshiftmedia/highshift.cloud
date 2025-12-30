require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      autoIndex: true
    });
    logger.info('MongoDB connected');

    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start server', { err });
    process.exit(1);
  }
}

start();
