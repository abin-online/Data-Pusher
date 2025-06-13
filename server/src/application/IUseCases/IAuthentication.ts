import { IUser } from "../../domain/entities/IUser";

export interface IUserAuthenticationUsecase {
    signup( email: string, password: string): Promise<IUser>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: IUser;
    }>;
}