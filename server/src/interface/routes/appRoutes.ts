import { Router } from "express";

import { createAuthRoute } from "./authRoutes";
import { createAccountRoutes } from "./accountRoutes";
import { createAccountMemberRoutes } from "./accountMemberRoutes";
import { createDestinationRoutes } from "./destinationRoutes";
import { createLogRoutes } from "./logRoutes";
import { createDataHandlerRoutes } from "./dataHandler";

export const createAppRoutes = (): Router => {
  const router = Router();

  // Auth routes
  router.use("/api", createAuthRoute());

  // Account-related routes
  router.use("/api", createAccountRoutes());
  router.use("/api", createAccountMemberRoutes());

  // Destination routes
  router.use("/api", createDestinationRoutes());

  // Logs
  router.use("/api", createLogRoutes());

  // Incoming data handling
  router.use("/api", createDataHandlerRoutes());

  return router;
};
