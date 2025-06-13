
import { Request, Response } from "express";
import { ILogUseCase } from "../../application/IUseCases/ILogUseCase";


export class LogController {
    constructor(private logUseCase: ILogUseCase) { }

    async getLogs(req: Request, res: Response): Promise<void> {
        const { accountId } = req.params;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 50;

        try {
            const data = await this.logUseCase.getLogsByAccount(accountId, page, limit);
            res.status(200).json({ success: true, data });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getLogById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const log = await this.logUseCase.getLogById(id);
            if (!log) {
                res.status(404).json({ success: false, message: "Log not found" });
                return
            }
            res.status(200).json({ success: true, data: log });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getLogByEventId(req: Request, res: Response): Promise<void> {
        const { eventId } = req.params;
        try {
            const log = await this.logUseCase.getLogByEventId(eventId);
            if (!log) {
                res.status(404).json({ success: false, message: "Log not found" });
                return
            }
            res.status(200).json({ success: true, data: log });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getLogsByStatus(req: Request, res: Response): Promise<void> {
        const { accountId } = req.params;
        const { status } = req.query;
        if (!status) {

            res.status(400).json({ success: false, message: "Status is required" });
            return
        }
        try {
            const logs = await this.logUseCase.getLogsByStatus(status as string, accountId);
            res.status(200).json({ success: true, data: logs });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getLogsByDateRange(req: Request, res: Response): Promise<void> {
        const { accountId } = req.params;
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {

            res.status(400).json({ success: false, message: "Start and end date required" });
            return
        }

        try {
            const logs = await this.logUseCase.getLogsByDateRange(
                new Date(startDate as string),
                new Date(endDate as string),
                accountId
            );
            res.status(200).json({ success: true, data: logs });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getLogStats(req: Request, res: Response): Promise<void> {
        const { accountId } = req.params;
        try {
            const stats = await this.logUseCase.getLogStats(accountId);
            res.status(200).json({ success: true, data: stats });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async searchLogs(req: Request, res: Response): Promise<void> {
        const { accountId } = req.params;
        const { q } = req.query;
        if (!q) {
            res.status(400).json({ success: false, message: "Search query is required" });
            return
        }
        try {
            const logs = await this.logUseCase.searchLogs(q as string, accountId);
            res.status(200).json({ success: true, data: logs });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
