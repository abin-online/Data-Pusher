import { Types } from "mongoose";

export interface IAccount  {
  _id: Types.ObjectId | string;
  account_id: string;
  account_name: string;
  app_secret_token: string;
  website?: string;
  created_by: Types.ObjectId;
  updated_by: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}