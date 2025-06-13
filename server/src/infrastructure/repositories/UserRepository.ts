import { IUserRepository } from "../../domain/respositories/IUserRepository";
import { IUser } from "../../domain/entities/IUser";
import { UserModel } from "../database/model/UserModel";

export class UserRepository implements IUserRepository {
    async findById(userId: string): Promise<IUser | null> {
        return await UserModel.findById(userId);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({ email });
    }

    async createUser(user: Partial<IUser>): Promise<IUser> {
        const newUser = new UserModel(user);
        const savedUser = await newUser.save();
        return savedUser.toObject() as IUser;
    }
}
