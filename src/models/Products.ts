import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    price: number;
    promoPrice: number;
    type: string;
    description: string;
    expirationDate: Date;
    }

    const productSchema = new Schema<IProduct>(
    {
        name: {
        type: String,
        required: true,
        trim: true,
        },
        price: {
        type: Number,
        required: true,
        },
        promoPrice: {
        type: Number,
        default: 0,
        },
        type: {
        type: String,
        required: true,
        },
        description: {
        type: String,
        required: true,
        },
        expirationDate: {
        type: Date,
        required: true,
        },
    },
    { timestamps: true }
);

export default model<IProduct>("Product", productSchema);
