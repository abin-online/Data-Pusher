export interface IDataHandlerUseCase {
  processIncomingData(secretToken: string, eventId: string, data: any): Promise<any>;
  forwardDataToDestinations(accountId: string, eventId: string, data: any): Promise<void>;
}