
import { ILog } from "../../domain/entities/ILog";
import { ILogRepository } from "../../domain/respositories/ILogRepository";
import { LogModel } from "../database/model/LogModel";

export class LogRepository implements ILogRepository {

    async create(logData: any): Promise<ILog> {
        const log = new LogModel(logData);
        return log.save();
    }

    async updateStatusByEventId(eventId: string, status: string, processedTimestamp?: Date): Promise<ILog | null> {
        const updateData: any = { status };
        if (processedTimestamp) updateData.processed_at = processedTimestamp;

        return LogModel.findOneAndUpdate({ event_id: eventId }, updateData, { new: true }).exec();
    }

    async findByAccountId(accountId: string, page: number, limit: number): Promise<ILog[]> {
        return LogModel.find({ accountId })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
    }

    async findById(id: string): Promise<ILog | null> {
        return LogModel.findById(id).exec();
    }

    async findByEventId(eventId: string): Promise<ILog | null> {
        return LogModel.findOne({ eventId }).exec();
    }

    async findByStatus(status: string, accountId?: string): Promise<ILog[]> {
        const query: any = { status };
        if (accountId) query.accountId = accountId;
        return LogModel.find(query).exec();
    }

    async findByDateRange(startDate: Date, endDate: Date, accountId?: string): Promise<ILog[]> {
        const query: any = {
            createdAt: {
                $gte: startDate,
                $lte: endDate,
            },
        };
        if (accountId) query.accountId = accountId;
        return LogModel.find(query).exec();
    }

    async getLogStats(accountId: string): Promise<any> {
        return LogModel.aggregate([
            { $match: { accountId } },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]).exec();
    }

    async searchLogs(query: string, accountId: string): Promise<ILog[]> {
        return LogModel.find({
            accountId,
            $or: [
                { message: { $regex: query, $options: "i" } },
                { eventId: { $regex: query, $options: "i" } },
            ],
        }).exec();
    }
}