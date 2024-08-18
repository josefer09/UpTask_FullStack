import jwt from 'jsonwebtoken';
import { envs } from '../config/envs';
import { Types } from 'mongoose';


type UserPayload = {
    id: Types.ObjectId;
}

export class JsonWebToken {
    static generateToken (payload: UserPayload): string {
        const token = jwt.sign(payload, envs.SECTRET_KEY, { expiresIn: '3h'});

        return token;
    }

    static decodedToken (token: string) {
        const decoded = jwt.verify(token, envs.SECTRET_KEY);
        return decoded;
    }
}