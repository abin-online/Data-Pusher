import { Request, Response } from "express";
import { IAccountUseCase } from "../../application/IUseCases/IAccountUseCase";
import { HttpStatusCode } from "../../shared/types/HttpStatusCode";
import { Types } from "mongoose";
import { AuthMessages, AccountMessages } from "../../shared/messages";

export class AccountController {
    constructor(private accountUseCase: IAccountUseCase) {}

    private getUserIdOrFail(req: Request, res: Response): Types.ObjectId | null {
        const user = req.user;
        if (!user || !user._id) {
            res.status(HttpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: AuthMessages.UNAUTHORIZED,
            });
            return null;
        }
        return user._id as Types.ObjectId;
    }

    async createAccount(req: Request, res: Response): Promise<void> {
        try {
            const userId = this.getUserIdOrFail(req, res);
            if (!userId) return;

            const account = await this.accountUseCase.createAccount(req.body, userId);

            res.status(HttpStatusCode.CREATED).json({
                success: true,
                message: AccountMessages.CREATED,
                data: account,
            });
        } catch (error: any) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getAccounts(req: Request, res: Response): Promise<void> {
        try {
            const userId = this.getUserIdOrFail(req, res);
            if (!userId) return;

            const accounts = await this.accountUseCase.getAccountsByUser(userId);

            res.status(HttpStatusCode.OK).json({
                success: true,
                data: accounts,
            });
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getAccountById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const account = await this.accountUseCase.getAccountById(id);

            if (!account) {
                res.status(HttpStatusCode.NOT_FOUND).json({
                    success: false,
                    message: AccountMessages.NOT_FOUND,
                });
                return;
            }

            res.status(HttpStatusCode.OK).json({
                success: true,
                data: account,
            });
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }

    async updateAccount(req: Request, res: Response): Promise<void> {
        try {
            const userId = this.getUserIdOrFail(req, res);
            if (!userId) return;

            const { id } = req.params;
            const account = await this.accountUseCase.updateAccount(id, req.body, userId);

            if (!account) {
                res.status(HttpStatusCode.NOT_FOUND).json({
                    success: false,
                    message: AccountMessages.NOT_FOUND,
                });
                return;
            }

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: AccountMessages.UPDATED,
                data: account,
            });
        } catch (error: any) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: error.message,
            });
        }
    }

    async deleteAccount(req: Request, res: Response): Promise<void> {
        try {
            const userId = this.getUserIdOrFail(req, res);
            if (!userId) return;

            const { id } = req.params;
            const deleted = await this.accountUseCase.deleteAccount(id, userId);

            if (!deleted) {
                res.status(HttpStatusCode.NOT_FOUND).json({
                    success: false,
                    message: AccountMessages.NOT_FOUND,
                });
                return;
            }

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: AccountMessages.DELETED,
            });
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }

    async searchAccounts(req: Request, res: Response): Promise<void> {
        try {
            const userId = this.getUserIdOrFail(req, res);
            if (!userId) return;

            const { query } = req.query;
            if (!query) {
                res.status(HttpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: AccountMessages.SEARCH_REQUIRED,
                });
                return;
            }

            const accounts = await this.accountUseCase.searchAccounts(query as string, userId);

            res.status(HttpStatusCode.OK).json({
                success: true,
                data: accounts,
            });
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }
}
