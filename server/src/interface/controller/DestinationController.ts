import { Request, Response } from "express";
import { IDestinationUseCase } from "../../application/IUseCases/IDestinationUseCase";
import { AuthMessages } from "../../shared/messages";
import { DestinationResponses } from "../../shared/messages";
import { HttpStatusCode } from "../../shared/types/HttpStatusCode";

export class DestinationController {
  constructor(private destinationUseCase: IDestinationUseCase) {}

  async createDestination(req: Request, res: Response): Promise<void> {
    try {
      const { accountId } = req.params;
      const userId = req.user?._id;

      if (!userId) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: AuthMessages.UNAUTHORIZED
        });
        return;
      }

      const destination = await this.destinationUseCase.createDestination(req.body, accountId, userId);
      res.status(HttpStatusCode.CREATED).json({
        success: true,
        message: DestinationResponses.CREATED,
        data: destination
      });
    } catch (err: any) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: err.message
      });
    }
  }

  async getDestinationsByAccount(req: Request, res: Response): Promise<void> {
    try {
      const { accountId } = req.params;
      const destinations = await this.destinationUseCase.getDestinationsByAccount(accountId);
      res.status(HttpStatusCode.OK).json({
        success: true,
        data: destinations
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message
      });
    }
  }

  async getDestinationById(req: Request, res: Response): Promise<void> {
    try {
      const { id, accountId } = req.params;
      const destination = await this.destinationUseCase.getDestinationById(id, accountId);
      if (!destination) {
        res.status(HttpStatusCode.NOT_FOUND).json({
          success: false,
          message: DestinationResponses.NOT_FOUND
        });
        return;
      }
      res.status(HttpStatusCode.OK).json({
        success: true,
        data: destination
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message
      });
    }
  }

  async updateDestination(req: Request, res: Response): Promise<void> {
    try {
      const { id, accountId } = req.params;
      const userId = req.user?._id;

      if (!userId) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: AuthMessages.UNAUTHORIZED
        });
        return;
      }

      const updated = await this.destinationUseCase.updateDestination(id, req.body, accountId, userId);
      if (!updated) {
        res.status(HttpStatusCode.NOT_FOUND).json({
          success: false,
          message: DestinationResponses.NOT_FOUND
        });
        return;
      }

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: DestinationResponses.UPDATED,
        data: updated
      });
    } catch (err: any) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: err.message
      });
    }
  }

  async deleteDestination(req: Request, res: Response): Promise<void> {
    try {
      const { id, accountId } = req.params;
      const deleted = await this.destinationUseCase.deleteDestination(id, accountId);
      if (!deleted) {
        res.status(HttpStatusCode.NOT_FOUND).json({
          success: false,
          message: DestinationResponses.NOT_FOUND
        });
        return;
      }
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: DestinationResponses.DELETED
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message
      });
    }
  }

  async searchDestinations(req: Request, res: Response): Promise<void> {
    try {
      const { accountId } = req.params;
      const { q } = req.query;

      if (!q) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          message: DestinationResponses.SEARCH_REQUIRED
        });
        return;
      }

      const destinations = await this.destinationUseCase.searchDestinations(q as string, accountId);
      res.status(HttpStatusCode.OK).json({
        success: true,
        data: destinations
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message
      });
    }
  }
}
