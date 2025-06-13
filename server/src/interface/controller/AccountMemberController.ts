import { Types } from 'mongoose';
import { Request, Response } from 'express';
import { IAccountMemberUseCase } from '../../application/IUseCases/IAccountMemberUseCase';

export class AccountMemberController {
    constructor(private readonly useCase: IAccountMemberUseCase) { }

    async addMember(req: Request, res: Response) {
        try {
            const { accountId } = req.params;
            const adminUserId = (req as any).user.id;
            const member = await this.useCase.addMember(accountId, req.body, adminUserId);
            res.status(201).json({ success: true, message: 'Member added', data: member });
        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async getMembers(req: Request, res: Response) {
        try {
            const { accountId } = req.params;
            const members = await this.useCase.getMembers(accountId);
            res.status(200).json({ success: true, data: members });
        } catch (err: any) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    async updateMemberRole(req: Request, res: Response) {
        try {
            const { accountId, userId } = req.params;
            const adminUserId = (req as any).user.id;
            const member = await this.useCase.updateMemberRole(accountId, userId, req.body.roleId, adminUserId);
            if (!member) {
                res.status(404).json({ success: false, message: 'Not found' });
                return
            }
            res.status(200).json({ success: true, message: 'Updated', data: member });
        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message });
        }
    }



    async removeMember(req: Request, res: Response) {
        try {
            const { accountId, userId } = req.params;
            const adminUserId = (req as any).user.id;

            // 💡 Convert strings to ObjectId
            const accountObjectId = new Types.ObjectId(accountId);
            const userObjectId = new Types.ObjectId(userId);

            const removed = await this.useCase.removeMember(accountObjectId, userObjectId, adminUserId);

            if (!removed) {
                 res.status(404).json({ success: false, message: 'Not found' });
                 return
            }

            res.status(200).json({ success: true, message: 'Removed successfully' });
        } catch (err: any) {
            res.status(500).json({ success: false, message: err.message });
        }
    }


    async getUserAccounts(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            const accounts = await this.useCase.getUserAccounts(userId);
            res.status(200).json({ success: true, data: accounts });
        } catch (err: any) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
}