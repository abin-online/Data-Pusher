import { Types } from "mongoose";

export interface IUser {
    _id : Types.ObjectId
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}