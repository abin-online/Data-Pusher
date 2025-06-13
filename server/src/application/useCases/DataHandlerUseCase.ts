import { IDataHandlerUseCase } from "../IUseCases/IDataHandlerUseCase";
import { IAccountUseCase } from "../IUseCases/IAccountUseCase";
import { IDestinationUseCase } from "../IUseCases/IDestinationUseCase";
import { ILogUseCase } from "../IUseCases/ILogUseCase";
import { queueService } from "../../infrastructure/queue/queueService";

export class DataHandlerUseCase implements IDataHandlerUseCase {
  constructor(
    private accountUseCase: IAccountUseCase,
    private destinationUseCase: IDestinationUseCase,
    private logUseCase: ILogUseCase
  ) {}

  async processIncomingData(secretToken: string, eventId: string, data: any): Promise<any> {
    const account = await this.accountUseCase.getAccountBySecretToken(secretToken);
    if (!account) throw new Error("Invalid secret token");

    const existingLog = await this.logUseCase.getLogByEventId(eventId);
    if (existingLog) throw new Error("Duplicate event ID");

    const destinations = await this.destinationUseCase.getDestinationsByAccount(account._id.toString());
    if (destinations.length === 0) throw new Error("No destinations configured for this account");

    for (const destination of destinations) {
      await this.logUseCase.createLog({
        event_id: `${eventId}_${destination._id}`,
        account_id: account._id,
        destination_id: destination._id,
        received_data: data,
        status: "pending"
      });
    }

    await queueService.addToQueue('webhook-processing', {
      accountId: account._id.toString(),
      eventId,
      data,
      destinations: destinations.map(d => d._id.toString())
    });

    return { success: true, message: "Data queued for processing", eventId };
  }

  async forwardDataToDestinations(accountId: string, eventId: string, data: any): Promise<void> {
    const destinations = await this.destinationUseCase.getDestinationsByAccount(accountId);

    for (const destination of destinations) {
      const logEventId = `${eventId}_${destination._id}`;
      try {
        await this.logUseCase.updateLogStatus(logEventId, "processing");

        const response = await this.sendToDestination(destination, data);

        await this.logUseCase.updateLogStatus(logEventId, "success", new Date());
      } catch (error: any) {
        await this.logUseCase.updateLogStatus(logEventId, "failed", new Date());
        console.error(`Failed to send to ${destination.url}:`, error.message);
      }
    }
  }

  private async sendToDestination(destination: any, data: any): Promise<any> {
    const fetch = require('node-fetch');
    const headers: any = { 'Content-Type': 'application/json' };

    destination.headers.forEach((header: any) => {
      headers[header.key] = header.value;
    });

    const response = await fetch(destination.url, {
      method: destination.http_method,
      headers,
      body: JSON.stringify(data),
      timeout: 30000
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json().catch(() => ({}));
  }
}
