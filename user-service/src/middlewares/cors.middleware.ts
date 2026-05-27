import cors, { CorsOptions } from "cors";

import config from "../config";


const allowedOrigins = config.ALLOWED_ORIGINS
    ? config.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
    : [];

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        /**
         * Allow requests with no origin
         * (Postman, mobile apps, curl)
         */
        if (!origin) return callback(null, true);

        /**
         * Allow whitelisted origins
         */
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        /**
         * Reject others
         */
        return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
