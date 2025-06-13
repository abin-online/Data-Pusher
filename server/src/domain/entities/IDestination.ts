import { Types } from "mongoose";

interface IHeader {
    key: string;
    value: string;
}

export interface IDestination {
    _id: Types.ObjectId | string;
    account_id: Types.ObjectId;
    url: string;
    http_method: string;
    headers: IHeader[];
    createdAt: Date;
    updatedAt: Date;
}