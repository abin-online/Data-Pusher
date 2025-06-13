import { Router } from "express";
import { authController } from "./dependencyInjection/authentication";

export const createAuthRoute = (): Router => {
    const router = Router();

    router.post('/auth/signup', authController.signup);
    router.post('/auth/login', authController.login);

    return router
}