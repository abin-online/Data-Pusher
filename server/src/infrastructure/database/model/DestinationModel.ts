import { Schema, model, Document, Types } from "mongoose";

interface IHeader {
    key: string;
    value: string;
}

export interface IDestination extends Document {
    account_id: Types.ObjectId;
    url: string;
    http_method: string;
    headers: IHeader[];
    createdAt: Date;
    updatedAt: Date;
}

const DestinationSchema = new Schema<IDestination>(
    {
        account_id: {
            type: Schema.Types.ObjectId,
            ref: "Account",
            required: true
        },
        url: {
            type: String,
            required: true
        },
        http_method: {
            type: String,
            required: true
        },
        headers: [
            {
                key: {
                    type: String,
                    required: true
                },
                value: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

export const DestinationModel = model<IDestination>("Destination", DestinationSchema);
