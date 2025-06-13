import { Types } from 'mongoose';
import { IAccountMemberUseCase } from '../IUseCases/IAccountMemberUseCase';
import { IUserRepository } from '../../domain/respositories/IUserRepository';
import { IAccountMemberRepository } from '../../domain/respositories/IAccountMemberRepository';
import { IAccountMember } from '../../domain/entities/IAccountMember';
import { IAuthService } from '../../domain/IServices/IAuthService';

export class AccountMemberUseCase implements IAccountMemberUseCase {
    constructor(
        private readonly accountMemberRepo: IAccountMemberRepository,
        private readonly userRepo: IUserRepository,
        private readonly authService: IAuthService
    ) { }

    async addMember(accountId: string, data: any, adminUserId: string): Promise<IAccountMember> {
        const { email, password, roleId } = data;

        let user = await this.userRepo.findByEmail(email);
        if (!user) {
            const hashedPassword = await this.authService.hashPassword(password);
            user = await this.userRepo.createUser({ email, password: hashedPassword });
        }


        if (!user._id) throw new Error("User ID is undefined");

        const accObjectId = new Types.ObjectId(accountId); // Convert accountId string to ObjectId

        const existing = await this.accountMemberRepo.findByAccountAndUser(accObjectId, user._id);
        if (existing) throw new Error("User already a member");

        return this.accountMemberRepo.create({
            account_id: accObjectId,
            user_id: user._id,
            role_id: roleId,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    async getMembers(accountId: string): Promise<IAccountMember[]> {
        return this.accountMemberRepo.findByAccountWithDetails(accountId);
    }

    async getUserAccounts(userId: string): Promise<IAccountMember[]> {
        return this.accountMemberRepo.findByUserId(userId);
    }

    async updateMemberRole(
        accountId: string,
        userId: string,
        roleId: string,
        adminUserId: string
    ): Promise<IAccountMember | null> {
        const accountObjectId = new Types.ObjectId(accountId);
        const userObjectId = new Types.ObjectId(userId);

        const member = await this.accountMemberRepo.findByAccountAndUser(accountObjectId, userObjectId);
        if (!member) return null;

        return this.accountMemberRepo.update(member._id!, {
            role_id: new Types.ObjectId(roleId),
            updatedAt: new Date()
        });

    }

async removeMember(accountId: Types.ObjectId, userId: Types.ObjectId, adminUserId: string): Promise<boolean> {
  const member = await this.accountMemberRepo.findByAccountAndUser(accountId, userId);
  if (!member) return false;

  return this.accountMemberRepo.delete(member._id!);
}

}
