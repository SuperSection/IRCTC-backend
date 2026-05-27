import {
    Request,
    Response,
    NextFunction,
} from "express";

import { AppError } from "../utils/errors";

import config from "../config";
import logger from "../config/logger";


const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): Response => {

    /**
     * Known Application Errors
     */
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            error: err.code,
            message: err.message
        });
    }

    /**
     * Unknown Errors
     */
    logger.error({
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        body: req.body,
        query: req.query,
    });

    /**
     * Development Error Response
     */
    if (config.NODE_ENV !== "production") {
        return res.status(500).json({
            success: false,
            error: "SERVER_ERROR",
            message: err.message,
            stack: err.stack,
        });
    }

    /**
     * Production Error Response
     */
    return res.status(500).json({
        success: false,
        error: "SERVER_ERROR",
        message: "Internal Server Error"
    });
};

export default errorMiddleware;
