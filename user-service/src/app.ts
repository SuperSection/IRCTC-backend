import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello from app.ts of user-service");
});

app.get("/health", (req, res) => {
    res.status(200).json({
        message: "ok"
    })
});


export default app;
