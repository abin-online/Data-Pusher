import { IAccount } from "../entities/IAccount";
import { Types } from "mongoose";

export interface IAccountRepository {
  create(account: Partial<IAccount>): Promise<IAccount>;
  getById(id: string): Promise<IAccount | null>;
  getByUser(userId: Types.ObjectId): Promise<IAccount[]>;
  getBySecretToken(secretToken: string): Promise<IAccount | null>;
  update(id: string, data: Partial<IAccount>): Promise<IAccount | null>;
  delete(id: string): Promise<boolean>;
  search(query: string, userId: Types.ObjectId): Promise<IAccount[]>;
}
