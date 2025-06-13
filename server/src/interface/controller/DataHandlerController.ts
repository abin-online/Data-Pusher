import { Request, Response } from "express";
import { IDataHandlerUseCase } from "../../domain/usecases/IDataHandlerUseCase";
import { DataHandlerMessages } from "../../domain/messages/DataHandlerMessages";

export class DataHandlerController {
  constructor(private dataHandlerUseCase: IDataHandlerUseCase) {}

  async handleIncomingData(req: Request, res: Response): Promise<void> {
    try {
      const secretToken = req.headers['cl-x-token'] as string;
      const eventId = req.headers['cl-x-event-id'] as string;
      const data = req.body;

      if (!secretToken) {
        res.status(400).json({
          success: false,
          message: DataHandlerMessages.MISSING_TOKEN
        });
        return;
      }

      if (!eventId) {
        res.status(400).json({
          success: false,
          message: DataHandlerMessages.MISSING_EVENT_ID
        });
        return;
      }

      if (!data || typeof data !== 'object') {
        res.status(400).json({
          success: false,
          message: DataHandlerMessages.INVALID_JSON
        });
        return;
      }

      const result = await this.dataHandlerUseCase.handleData(secretToken, eventId, data);

      res.status(200).json(result);
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }
}
