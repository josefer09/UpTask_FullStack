import { CreateUserDto } from "../../domain/dtos/auth/createUser.dto";
import { BcryptAdapter, CustomError, generateToken } from "../../utils";
import User from "../../model/User";
import Token from "../../model/Token";
import { AuthEmail } from "../email/AuthEmail";
import { ValidateToken } from '../../domain/dtos/token/validateToken.dto';
import { AuthUserDto } from "../../domain/dtos/auth/authUser.dto";



export class AuthService {

    // DI

    constructor() {}

    async createAcount( createUserDto: CreateUserDto) {
        try {
            // Validate User exist
            const userExist = await User.findOne({email: createUserDto.email});
            if( userExist ) throw CustomError.forbidden('Email alredy exist');

            // creating user
            const user = new User(createUserDto);

            // Hashing password
            user.password = BcryptAdapter.hash(createUserDto.password);

            // Generate Token
            const token = new Token();
            token.token = generateToken();
            token.user = user.id;

            // Save
            await Promise.allSettled([user.save(), token.save()]);

            // Send Email
            AuthEmail.sendConfirmationEmail({ email: user.email, name: user.name, token: token.token})

            return { msg: 'User Created' };
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            console.log(error);
            throw CustomError.internalServer('Server Error');
        }
    }

    async confirmAcount( validateToken: ValidateToken ) {
        try {
            const tokenExist = await Token.findOne({token: validateToken.token});

            if( !tokenExist ) throw CustomError.notFound('Token not valid');

            const user = await User.findById(tokenExist.user);
            user!.confirmed = true;

            await Promise.allSettled([user!.save(), tokenExist.deleteOne()]);


            return { msg: 'Account Confirmed Successfully'};
        } catch (error) {
            if( error instanceof CustomError) throw error;
            console.log(error);
            throw CustomError.internalServer('Server Error');
        }
    }

    async authUser(authUserDto: AuthUserDto) {
        try {
            const user = await User.findOne({email: authUserDto.email});

            if(!user) throw CustomError.notFound(`User with email: ${authUserDto.email} not found`);

            // Validar si la cuenta esta confirmada
            if( !user.confirmed ) throw CustomError.badRequest('Unconfirmed user, we have sent you a token to your email to confirm the acount');
            // Send token
            const token = new Token();
            token.user = user.id;
            token.token = generateToken();
            await token.save();
            // Send email
            AuthEmail.sendConfirmationEmail({ email: user.email, name: user.name, token: token.token});

            // Comparamos las contrasenas
            const userPassMatch = BcryptAdapter.compare(authUserDto.password, user.password);
            if( !userPassMatch ) throw CustomError.badRequest('Password incorrect');

            return { msg: 'Succefull'};


        } catch (error) {
            if( error instanceof CustomError ) throw error;
            console.log(error);
            throw CustomError.internalServer('Server Error');
        }
    }
}