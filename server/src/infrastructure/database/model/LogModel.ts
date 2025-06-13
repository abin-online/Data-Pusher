import { Schema, model, Document, Types } from "mongoose";

export interface ILog extends Document {
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

const LogSchema = new Schema<ILog>(
    {
        event_id: {
            type: String,
            required: true,
            unique: true
        },
        account_id: {
            type: Schema.Types.ObjectId,
            ref: "Account",
            required: true
        },
        destination_id: {
            type: Schema.Types.ObjectId,
            ref: "Destination",
            required: true
        },
        received_timestamp: {
            type: Date,
            required: true
        },
        processed_timestamp: {
            type: Date
        },
        received_data: {
            type: Schema.Types.Mixed
        },
        status: {
            type: String,
            enum: ["success", "failed", "pending"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const LogModel = model<ILog>("Log", LogSchema);
