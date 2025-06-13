import { Router } from "express";
import { authController } from "./dependencyInjection/authentication";

export const createAuthRoute = (): Router => {
    const router = Router();

    router.post('/user/signup', authController.signup);
    router.post('/user/login', authController.login);

    return router
}