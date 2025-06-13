import { Router } from "express";
import { logController } from "./dependencyInjection/log";
import { authMiddleware } from "./dependencyInjection/authentication";

export const createLogRoutes = (): Router => {
  const router = Router();
  const authenticate = authMiddleware.authenticate;

  router.get("/logs/:accountId", authenticate, logController.getLogs);
  router.get("/log/id/:id", authenticate, logController.getLogById);
  router.get("/log/event/:eventId", authenticate, logController.getLogByEventId);
  router.get("/log/status/:accountId", authenticate, logController.getLogsByStatus);
  router.get("/log/date/:accountId", authenticate, logController.getLogsByDateRange);
  router.get("/log/stats/:accountId", authenticate, logController.getLogStats);
  router.get("/log/search/:accountId", authenticate, logController.searchLogs);

  return router;
};