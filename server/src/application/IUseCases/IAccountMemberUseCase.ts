import { Types } from "mongoose";
import { IAccountMember } from "../../domain/entities/IAccountMember";

export interface IAccountMemberUseCase {
  addMember(accountId: string, data: any, adminUserId: string): Promise<IAccountMember>;
  getMembers(accountId: string): Promise<IAccountMember[]>;
  getUserAccounts(userId: string): Promise<IAccountMember[]>;
  updateMemberRole(accountId: string, userId: string, roleId: string, adminUserId: string): Promise<IAccountMember | null>;
  removeMember(accountId: Types.ObjectId, userId: Types.ObjectId, adminUserId: string): Promise<boolean>;
}