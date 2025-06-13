
import { ILogUseCase } from "../IUseCases/ILogUseCase";
import { ILogRepository } from "../../domain/respositories/ILogRepository";

export class LogUseCase implements ILogUseCase {
  constructor(private logRepository: ILogRepository) {}

  getLogsByAccount(accountId: string, page: number = 1, limit: number = 50) {
    return this.logRepository.findByAccountId(accountId, page, limit);
  }

  getLogById(id: string) {
    return this.logRepository.findById(id);
  }

  getLogByEventId(eventId: string) {
    return this.logRepository.findByEventId(eventId);
  }

  getLogsByStatus(status: string, accountId?: string) {
    return this.logRepository.findByStatus(status, accountId);
  }

  getLogsByDateRange(startDate: Date, endDate: Date, accountId?: string) {
    return this.logRepository.findByDateRange(startDate, endDate, accountId);
  }

  getLogStats(accountId: string) {
    return this.logRepository.getLogStats(accountId);
  }

  searchLogs(query: string, accountId: string) {
    return this.logRepository.searchLogs(query, accountId);
  }
}