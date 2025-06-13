import { Types } from "mongoose";
import { IAccountMember } from "../entities/IAccountMember";

export interface IAccountMemberRepository {
  create(data: Partial<IAccountMember>): Promise<IAccountMember>;
  findByAccountId(accountId: string): Promise<IAccountMember[]>;
  findByUserId(userId: string): Promise<IAccountMember[]>;
  findByAccountAndUser(accountId: Types.ObjectId, userId: Types.ObjectId): Promise<IAccountMember | null>;
  update(memberId: Types.ObjectId, updateData: Partial<IAccountMember>): Promise<IAccountMember | null>;
  delete(memberId: Types.ObjectId): Promise<boolean>;
  findByAccountWithDetails(accountId: string): Promise<IAccountMember[]>;
}
