import { Router } from "express";
import { destinationController } from "./dependencyInjection/destination"; // assume DI is proper here
import { authMiddleware } from "./dependencyInjection/authentication";

export const createDestinationRoutes = (): Router => {
    const router = Router();
    const authenticate = authMiddleware.authenticate;

    router.post('/:accountId/destinations', authenticate, destinationController.createDestination);
    router.get('/:accountId/destinations', authenticate, destinationController.getDestinationsByAccount);
    router.get('/:accountId/destination/:id', authenticate, destinationController.getDestinationById);
    router.put('/:accountId/destination/:id', authenticate, destinationController.updateDestination);
    router.delete('/:accountId/destination/:id', authenticate, destinationController.deleteDestination);
    router.get('/:accountId/destinations/search', authenticate, destinationController.searchDestinations);

    return router;
};
