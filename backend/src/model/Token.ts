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
    expiresAt: {
        type: Date,
        default: function() {
            return Date.now() + 10 * 60 * 1000;
        },
        expires: "10m", // Se elimina a los 10 minutos
    },
});

const Token = mongoose.model<IToken>('Token', tokenSchema);
export default Token;