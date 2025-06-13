import { Request, Response } from "express";
import { IDataHandlerUseCase } from "../../application/IUseCases/IDataHandlerUseCase";

export class DataHandlerController {
  constructor(private readonly useCase: IDataHandlerUseCase) {}

  async handleIncomingData(req: Request, res: Response): Promise<void> {
    try {
      const secretToken = req.headers['cl-x-token'] as string;
      const eventId = req.headers['cl-x-event-id'] as string;
      const data = req.body;

      if (!secretToken || !eventId || typeof data !== 'object') {
         res.status(400).json({
          success: false,
          message: "Missing or invalid headers/body"
        });
        return
      }

      const result = await this.useCase.processIncomingData(secretToken, eventId, data);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
