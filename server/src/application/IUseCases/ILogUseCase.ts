
import { ILog } from "../../domain/entities/ILog";
export interface ILogUseCase {
      createLog(logData: any): Promise<ILog>;

  getLogsByAccount(accountId: string, page?: number, limit?: number): Promise<any>;
  getLogById(id: string): Promise<any>;
  getLogByEventId(eventId: string): Promise<any>;
  getLogsByStatus(status: string, accountId?: string): Promise<any>;
  getLogsByDateRange(startDate: Date, endDate: Date, accountId?: string): Promise<any>;
  getLogStats(accountId: string): Promise<any>;
    updateLogStatus(eventId: string, status: string, processedTimestamp?: Date): Promise<ILog | null>;

  searchLogs(query: string, accountId: string): Promise<any>;
}