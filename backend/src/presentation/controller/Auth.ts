import { Request, Response } from 'express';
import { CustomError } from "../../utils";
import { AuthService } from '../service/Auth';
import { CreateUserDto } from '../../domain/dtos/auth/createUser.dto';
import { ValidateToken } from '../../domain/dtos/token/validateToken.dto';


export class AuthController {

    // DI
    constructor( private readonly service: AuthService ) {}


    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json({ msg: error.message });
        }
    
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error " });
      };

      postCreateUser = (req: Request, res: Response) => {
        const [error, createUserDto] = CreateUserDto.create(req.body);
        if( error ) return res.status(400).json({error});

        this.service.createAcount(createUserDto!)
        .then( response => res.json(response))
        .catch( error => this.handleError(error, res));
      }

      postConfirmCount = (req: Request, res: Response) => {
        const [error, validateToken] = ValidateToken.validate(req.body);
        if( error ) return res.status(400).json({error});

        this.service.confirmAcount(validateToken!)
        .then( response => res.json(response))
        .catch( error => this.handleError( error, res ));
      }

}