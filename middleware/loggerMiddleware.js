import logger from '../utils/logger.js';

const requestLogger = (req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
        logger.info(`${req.method} ${req.originalUrl}`);
    }
    next();
};

export default requestLogger;
