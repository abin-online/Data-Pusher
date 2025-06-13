import { Types } from "mongoose";

export interface IAuthService {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
    generateTokens(userId: Types.ObjectId, role: string): { accessToken: string; refreshToken: string };
    verifyToken(token: string): { userId: string; role: string } | null;
    verifyRefreshToken(token: string): { userId: Types.ObjectId; role: string } | null;
}
