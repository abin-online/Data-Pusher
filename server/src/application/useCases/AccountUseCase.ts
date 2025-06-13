import { IAccountUseCase } from "../IUseCases/IAccountUseCase";
import { IAccountRepository } from "../../domain/respositories/IAccountRepository";
import { IAccount } from "../../domain/entities/IAccount";
import { Types } from "mongoose";

export class AccountUseCase implements IAccountUseCase {
    private accountRepository: IAccountRepository;

    constructor(accountRepository: IAccountRepository) {
        this.accountRepository = accountRepository;
    }

    async createAccount(data: IAccount, userId: Types.ObjectId): Promise<IAccount> {
        return this.accountRepository.create({
            ...data,
            created_by: userId,
            updated_by: userId
        });
    }

    async getAccountById(id: string): Promise<IAccount | null> {
        return this.accountRepository.getById(id);
    }

    async getAccountsByUser(userId: Types.ObjectId): Promise<IAccount[]> {
        return this.accountRepository.getByUser(userId);
    }

    async getAccountBySecretToken(secretToken: string): Promise<IAccount | null> {
        return this.accountRepository.getBySecretToken(secretToken);
    }

    async updateAccount(id: string, data: any, userId: Types.ObjectId): Promise<IAccount | null> {
        return this.accountRepository.update(id, {
            ...data,
            updated_by: userId
        });
    }

    async deleteAccount(id: string, _userId: Types.ObjectId): Promise<boolean> {
        return this.accountRepository.delete(id);
    }

    async searchAccounts(query: string, userId: Types.ObjectId): Promise<IAccount[]> {
        return this.accountRepository.search(query, userId);
    }
}
