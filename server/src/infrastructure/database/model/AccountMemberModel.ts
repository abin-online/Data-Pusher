import { Schema, model, Document, Types } from "mongoose";

export interface IAccountMember extends Document {
    account_id: Types.ObjectId;
    user_id: Types.ObjectId;
    role_id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const AccountMemberSchema = new Schema<IAccountMember>(
    {
        account_id: {
            type: Schema.Types.ObjectId,
            ref: "Account",
            required: true
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role_id: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const AccountMemberModel = model<IAccountMember>("AccountMember", AccountMemberSchema);
