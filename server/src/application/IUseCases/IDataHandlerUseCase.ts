export interface IDataHandlerUseCase {
  handleData(secretToken: string, eventId: string, data: any): Promise<any>;
}
