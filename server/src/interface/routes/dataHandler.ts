import { Router } from "express";
import { dataHandlerController } from "./dependencyInjection/dataHandler";
import { accountRateLimiter } from "../middleware/rateLimiter";


export const createDataHandlerRoutes = (): Router => {
    const router = Router();

    router.post("/incoming_data", accountRateLimiter, dataHandlerController.handleIncomingData);

    return router;
};
