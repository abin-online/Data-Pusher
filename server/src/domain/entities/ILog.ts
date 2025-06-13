import { Types } from "mongoose";

export interface ILog {
    event_id: string;
    account_id: Types.ObjectId;
    destination_id: Types.ObjectId;
    received_timestamp: Date;
    processed_timestamp?: Date;
    received_data: Record<string, any>;
    status: "success" | "failed" | "pending";
    createdAt: Date;
    updatedAt: Date;
}