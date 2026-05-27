import { RequestHandler } from "express";
import logger from "../config/logger";

const reqLogger: RequestHandler = (req, res, next) => {
    logger.debug(`[${req.method}] ${req.originalUrl}`);

    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(
            `[${req.method}] ${req.originalUrl} - status: ${res.statusCode} - ${duration}ms`
        );
    });

    next();
};

export default reqLogger;
