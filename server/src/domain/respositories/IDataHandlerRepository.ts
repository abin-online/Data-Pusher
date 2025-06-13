export interface IDataHandlerRepository {
    validateToken(secretToken: string): Promise<boolean>;
    saveEvent(eventId: string, data: any): Promise<void>;
}
