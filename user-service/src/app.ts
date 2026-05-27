import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import reqLogger from "./middlewares/req.middleware";
import errorMiddleware from "./middlewares/error.middleware";
import corsMiddleware from "./middlewares/cors.middleware";


const app = express();

app.use(helmet());
app.use(corsMiddleware);
app.use(reqLogger);
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
    res.send("Hello from app.ts of user-service");
});

app.get("/health", (req, res) => {
    res.status(200).json({
        message: "ok"
    })
});


/**
 * Error Middleware
 * ALWAYS LAST
 */
app.use(errorMiddleware);


export default app;
