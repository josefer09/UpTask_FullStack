import type { Request, Response, NextFunction} from 'express';
import { CustomError } from '../../utils';
import { JsonWebToken } from '../../utils/jsonWebToken';
import User, { IUser } from '../../model/User';


declare global {
    namespace Express {
        interface Request {
            user?: IUser,
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    if( !bearer ) {
        const error = CustomError.unauthorized('Unauthorized');
        res.status(error.statusCode).json({error: error.message});
        return next(error);
    }

    const token = bearer.split(' ')[1];

    try {
        const decoded = JsonWebToken.decodedToken(token);
        if(typeof decoded === 'object' && decoded.id) {
            const user = await User.findById(decoded.id).select(' _id name email ');
            if( !user ) return res.status(500).json({error: 'Token not valid'});
            req.user = user;
        }

        next();
        
    } catch (error) {
        console.log(error);
        if( error instanceof CustomError ) return next(error);
        console.log(error);
        const serverError = CustomError.internalServer('Token not valid');
        res.status(500).json({ error: serverError.message });
        return next(serverError);
    }
}