import { CreateUserDto } from "../../domain/auth/createUser.dto";
import { BcryptAdapter, CustomError, generateToken } from "../../utils";
import User from "../../model/User";
import Token from "../../model/Token";
import { AuthEmail } from "../email/AuthEmail";



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
}