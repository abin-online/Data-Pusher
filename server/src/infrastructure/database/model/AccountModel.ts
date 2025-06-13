import { Schema, model, Document, Types } from "mongoose";

export interface IAccount extends Document {
    account_id: string;
    account_name: string;
    app_secret_token: string;
    website?: string;
    created_by: Types.ObjectId;
    updated_by: Types.ObjectId;
    created_at: Date;
    updated_at: Date;
}

const AccountSchema = new Schema<IAccount>({
    account_id: {
        type: String,
        required: true,
        unique: true
    },
    account_name: {
        type: String,
        required: true
    },
    app_secret_token: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    updated_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

export const AccountModel = model<IAccount>("Account", AccountSchema);
