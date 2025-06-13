export interface ILogUseCase {
  getLogsByAccount(accountId: string, page?: number, limit?: number): Promise<any>;
  getLogById(id: string): Promise<any>;
  getLogByEventId(eventId: string): Promise<any>;
  getLogsByStatus(status: string, accountId?: string): Promise<any>;
  getLogsByDateRange(startDate: Date, endDate: Date, accountId?: string): Promise<any>;
  getLogStats(accountId: string): Promise<any>;
  searchLogs(query: string, accountId: string): Promise<any>;
}