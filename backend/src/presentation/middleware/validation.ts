import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../../utils";



export const handleInputError = ( req: Request, res: Response, next: NextFunction ) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}