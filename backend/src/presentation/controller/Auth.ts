import { Request, Response } from 'express';
import { CustomError } from "../../utils";
import { AuthService } from '../service/Auth';
import { CreateUserDto } from '../../domain/dtos/auth/createUser.dto';
import { ValidateToken } from '../../domain/dtos/token/validateToken.dto';
import { AuthUserDto } from '../../domain/dtos/auth/authUser.dto';
import { RequestCode } from '../../domain/dtos/token/requestCode.dto';
import { AuthUserEmailDto } from '../../domain/dtos/auth/authUserEmail.dto';
import { UpdatePasswordDto } from '../../domain/dtos/auth/updatePassword.dto';
import { UpdateUserProfileDto } from '../../domain/dtos/auth/updateUserProfile.dto';
import { ChangePasswordDto } from '../../domain/dtos/auth/changePassword.dto';
import { CheckPasswordDto } from '../../domain/dtos/auth/checkPassword.dto';


export class AuthController {

    // DI
    constructor( private readonly service: AuthService ) {}


    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json({ error: error.message });
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

      postLogin = (req: Request, res: Response) => {
        const [error, authUserDto] = AuthUserDto.create(req.body);
        if( error ) return res.status(400).json({error});

        this.service.authUser(authUserDto!)
        .then( response => res.json(response))
        .catch( error => this.handleError( error, res ));
      }

      postRequestCode = (req: Request, res: Response) => {
        const [error, email] = RequestCode.validate(req.body);
        if( error ) return res.status(400).json({error});

        this.service.requestConfirmedCode(email!)
        .then( response => res.json(response))
        .catch( error => this.handleError(error, res));
      }

      postResetPassword = (req: Request, res: Response) => {
        const [error, email] = AuthUserEmailDto.create(req.body);
        if( error ) return res.status(400).json({error});

        this.service.forgotPassword(email!)
        .then( response => res.json(response))
        .catch( error => this.handleError(error, res));
      }

      postValidateToken = (req: Request, res: Response) => {
        const [error, validateToken] = ValidateToken.validate(req.body);
        if( error ) return res.status(400).json({error});

        this.service.validateToken(validateToken!)
        .then( response => res.json(response))
        .catch( error => this.handleError(error, res));
      }

      postUpdatePassword = (req: Request, res: Response) => {
        const [error, updatePassword] = UpdatePasswordDto.create(req.body);
        if( error ) return res.status(400).json({error});

        // Token
        const { token } = req.params;

        this.service.updatePassword(updatePassword!, token)
        .then( response => res.json(response))
        .catch( error => this.handleError(error, res));

      }

      getUserAuth = (req: Request, res: Response) => {
        const user = req.user;

        return res.json(user);
      }

      putUpdateUserProfile = (req: Request, res: Response) => {
        const [error, updateUserProfileDto] = UpdateUserProfileDto.create(req.body);
        if( error ) return res.status(400).json({error});
        // User
        const user = req.user;

        this.service.updateProfile(user!, updateUserProfileDto!)
        .then( response => res.json(response))
        .catch( error => this.handleError(error, res));
      }

      postChangePassword = (req: Request, res: Response) => {
        const [error, changePasswordDto] = ChangePasswordDto.create(req.body);
        if( error ) return res.status(400).json({error});

        // User
        const user = req.user;

        this.service.changePassword(user!, changePasswordDto!)
        .then( response => res.json(response))
        .catch( error => this.handleError(error, res));
      }

      postCheckPassword = (req: Request, res: Response) => {
        const [error, checkPasswordDto] = CheckPasswordDto.create(req.body);
        if( error ) return res.status(400).json({error});

        // User
        const user = req.user;

        this.service.checkPassword(user!, checkPasswordDto!)
        .then(response => res.json(response))
        .catch(error => this.handleError(error, res));
      }
}