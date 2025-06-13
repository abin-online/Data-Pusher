import { Schema, model, Document } from "mongoose";

export interface IRole extends Document {
    role_name: string;
    createdAt: Date;
    updatedAt: Date;
}

const RoleSchema = new Schema<IRole>(
    {
        role_name: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

export const RoleModel = model<IRole>("Role", RoleSchema);
