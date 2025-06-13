import { ILog } from "../entities/ILog";

export interface ILogRepository {
  findByAccountId(accountId: string, page: number, limit: number): Promise<ILog[]>;
  findById(id: string): Promise<ILog | null>;
  findByEventId(eventId: string): Promise<ILog | null>;
  findByStatus(status: string, accountId?: string): Promise<ILog[]>;
  findByDateRange(startDate: Date, endDate: Date, accountId?: string): Promise<ILog[]>;
  getLogStats(accountId: string): Promise<any>;
  searchLogs(query: string, accountId: string): Promise<ILog[]>;
}