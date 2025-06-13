import { Router } from "express";
import { accountController } from "./dependencyInjection/account"; // assume you DI'd it properly
import { authMiddleware } from "./dependencyInjection/authentication";

export const createAccountRoutes = (): Router => {
  const router = Router();

  const authenticate = authMiddleware.authenticate

  router.post('/account', authenticate, accountController.createAccount);
  router.get('/accounts', authenticate, accountController.getAccounts);
  router.get('/account/:id', authenticate, accountController.getAccountById);
  router.put('/account/:id', authenticate, accountController.updateAccount);
  router.delete('/account/:id', authenticate, accountController.deleteAccount);
  router.get('/accounts/search', authenticate, accountController.searchAccounts);

  return router;
};
