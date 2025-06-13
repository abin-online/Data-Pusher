import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

export const UserModel = model<IUser>("User", UserSchema);
