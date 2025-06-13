import { Types } from "mongoose";
import { IAccount } from "../../domain/entities/IAccount";

export interface IAccountUseCase {
  createAccount(data: IAccount, userId: Types.ObjectId): Promise<IAccount>;
  getAccountById(id: string): Promise<IAccount | null>;
  getAccountsByUser(userId: Types.ObjectId): Promise<IAccount[]>;
  getAccountBySecretToken(secretToken: string): Promise<IAccount | null>;
  updateAccount(id: string, data: any, userId: Types.ObjectId): Promise<IAccount | null>;
  deleteAccount(id: string, userId: Types.ObjectId): Promise<boolean>;
  searchAccounts(query: string, userId: Types.ObjectId): Promise<IAccount[]>;
}
