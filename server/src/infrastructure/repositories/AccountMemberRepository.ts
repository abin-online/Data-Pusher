import { IAccountMemberRepository } from '../../domain/respositories/IAccountMemberRepository';
import { AccountMemberModel } from '../database/model/AccountMemberModel';
import { IAccountMember } from '../../domain/entities/IAccountMember';
import { Types } from 'mongoose';

export class AccountMemberRepository implements IAccountMemberRepository {
    async create(data: Partial<IAccountMember>): Promise<IAccountMember> {
        const created = await AccountMemberModel.create(data);
        return created.toObject() as IAccountMember;
    }


    async findByAccountId(accountId: string): Promise<IAccountMember[]> {
        return await AccountMemberModel.find({ account_id: new Types.ObjectId(accountId) });
    }

    async findByUserId(userId: string): Promise<IAccountMember[]> {
        return await AccountMemberModel.find({ user_id: new Types.ObjectId(userId) });
    }

    async findByAccountAndUser(accountId: Types.ObjectId, userId: Types.ObjectId): Promise<IAccountMember | null> {
        return await AccountMemberModel.findOne({ account_id: accountId, user_id: userId });
    }

    async update(memberId: Types.ObjectId, updateData: Partial<IAccountMember>): Promise<IAccountMember | null> {
        return await AccountMemberModel.findByIdAndUpdate(memberId, updateData, { new: true });
    }

    async delete(memberId: Types.ObjectId): Promise<boolean> {
        const result = await AccountMemberModel.findByIdAndDelete(memberId);
        return !!result;
    }

    async findByAccountWithDetails(accountId: string): Promise<IAccountMember[]> {
        const members = await AccountMemberModel.find({ account_id: new Types.ObjectId(accountId) })
            .populate('user_id', 'email')
            .populate('role_id', 'name');

        return members.map(m => m.toObject() as IAccountMember);
    }

}
