import { IAccountRepository } from "../../domain/respositories/IAccountRepository";
import { IAccount } from "../../domain/entities/IAccount";
import { AccountModel } from "../database/model/AccountModel";
import { Types } from "mongoose";

export class AccountRepository implements IAccountRepository {
  async create(account: Partial<IAccount>): Promise<IAccount> {
    const created = await AccountModel.create(account);
    return created.toObject() as IAccount; 
  }

    async getById(id: string): Promise<IAccount | null> {
        return await AccountModel.findById(id);
    }

    async getByUser(userId: Types.ObjectId): Promise<IAccount[]> {
        return await AccountModel.find({ created_by: userId });
    }

    async getBySecretToken(secretToken: string): Promise<IAccount | null> {
        return await AccountModel.findOne({ app_secret_token: secretToken });
    }

    async update(id: string, data: Partial<IAccount>): Promise<IAccount | null> {
        return await AccountModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<boolean> {
        const res = await AccountModel.findByIdAndDelete(id);
        return !!res;
    }

    async search(query: string, userId: Types.ObjectId): Promise<IAccount[]> {
        return await AccountModel.find({
            created_by: userId,
            account_name: { $regex: query, $options: "i" }
        });
    }
}
