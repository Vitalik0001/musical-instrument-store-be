import logger from '../utils/logger.js';

export default (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`, {
    stack: err.stack,
    statusCode: err.status || 500
  });

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
};
