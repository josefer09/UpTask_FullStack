import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IToken extends Document {
    token: string;
    user: Types.ObjectId;
    createdAt: Date;
};

const tokenSchema: Schema = new Schema({
    token: {
        type: String,
        required: true,
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: "10m", // Se elimina a los 10 minutos
    },
});

const Token = mongoose.model<IToken>('Token', tokenSchema);
export default Token;