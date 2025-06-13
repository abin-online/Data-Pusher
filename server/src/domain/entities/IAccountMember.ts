import { Types } from "mongoose";
export interface IAccountMember  {
    _id? : Types.ObjectId;
    account_id: Types.ObjectId;
    user_id: Types.ObjectId;
    role_id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}