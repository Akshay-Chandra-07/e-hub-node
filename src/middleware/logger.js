const winston = require('winston');
const path = require('path');

class Logger {
    static instance = null;

    constructor() {
        if (Logger.instance) {
            return Logger.instance;
        }

        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.errors({ stack: true }),
                winston.format.splat(),
                winston.format.json()
            ),
            defaultMeta: { service: 'e-hub-service' },
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.printf(({ timestamp, level, message, ...meta }) => {
                            return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
                        })
                    )
                }),
                new winston.transports.File({
                    filename: path.join(__dirname, '../../logs/error.log'),
                    level: 'error'
                }),
                new winston.transports.File({
                    filename: path.join(__dirname, '../../logs/combined.log')
                })
            ]
        });

        Logger.instance = this;
    }

    static getInstance() {
        if (!Logger.instance) {
            new Logger();
        }
        return Logger.instance;
    }

    info(message, meta = {}) {
        this.logger.info(message, meta);
    }

    error(message, meta = {}) {
        this.logger.error(message, meta);
    }

    warn(message, meta = {}) {
        this.logger.warn(message, meta);
    }

    debug(message, meta = {}) {
        this.logger.debug(message, meta);
    }
}

// Create logs directory if it doesn't exist
const fs = require('fs');
const directory = path.join(__dirname, '../../logs');
if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
}

// Export middleware function
const loggerMiddleware = (req, res, next) => {
    const logger = Logger.getInstance();
    logger.info(`${req.method} ${req.url}`, {
        ip: req.ip,
        userAgent: req.get('user-agent')
    });
    next();
};

module.exports = {
    Logger,
    loggerMiddleware
};
