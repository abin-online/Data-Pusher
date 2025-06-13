import express from "express";
import cookieParser from "cookie-parser";
import connectDatabase from "./infrastructure/database/config/connectDb";
import { createAppRoutes } from "./interface/routes/appRoutes";
import { errorHandler } from "./interface/middleware/errorHandler";
import { apiLimiter } from "./interface/middleware/rateLimiter";

const app = express();


const PORT: number = Number(process.env.PORT) || 5000;

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(apiLimiter);

app.use(createAppRoutes());

app.use(errorHandler);


connectDatabase();

app.listen(PORT, () => {
    console.log(`_app is running on ${PORT}`);
})