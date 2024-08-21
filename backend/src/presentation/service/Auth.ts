import { CreateUserDto } from "../../domain/dtos/auth/createUser.dto";
import { BcryptAdapter, CustomError, generateToken } from "../../utils";
import User, { IUser } from "../../model/User";
import Token from "../../model/Token";
import { ValidateToken } from "../../domain/dtos/token/validateToken.dto";
import { AuthUserDto } from "../../domain/dtos/auth/authUser.dto";
import { IEmailService } from "../interfaces";
import { RequestCode } from "../../domain/dtos/token/requestCode.dto";
import { AuthUserEmailDto } from "../../domain/dtos/auth/authUserEmail.dto";
import { UpdatePasswordDto } from "../../domain/dtos/auth/updatePassword.dto";
import { JsonWebToken } from "../../utils/jsonWebToken";
import { UpdateUserProfileDto } from "../../domain/dtos/auth/updateUserProfile.dto";
import { ChangePasswordDto } from "../../domain/dtos/auth/changePassword.dto";
import { CheckPasswordDto } from "../../domain/dtos/auth/checkPassword.dto";

export class AuthService {
  // DI

  constructor(private readonly emailService: IEmailService) {}

  async createAcount(createUserDto: CreateUserDto) {
    try {
      // Validate User exist
      const userExist = await User.findOne({ email: createUserDto.email });
      if (userExist) throw CustomError.forbidden("Email alredy exist");

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
      this.emailService.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      return { msg: "User Created" };
    } catch (error) {
      if (error instanceof CustomError) throw error;
      console.log(error);
      throw CustomError.internalServer("Server Error");
    }
  }

  async confirmAcount(validateToken: ValidateToken) {
    try {
      const tokenExist = await Token.findOne({ token: validateToken.token });

      if (!tokenExist) throw CustomError.notFound("Token not valid");

      const user = await User.findById(tokenExist.user);
      user!.confirmed = true;

      await Promise.allSettled([user!.save(), tokenExist.deleteOne()]);

      return { msg: "Account Confirmed Successfully" };
    } catch (error) {
      if (error instanceof CustomError) throw error;
      console.log(error);
      throw CustomError.internalServer("Server Error");
    }
  }

  async authUser(authUserDto: AuthUserDto) {
    try {
      const user = await User.findOne({ email: authUserDto.email });

      if (!user)
        throw CustomError.notFound(
          `User with email: ${authUserDto.email} not found`
        );

      // Validar si la cuenta esta confirmada
      if (!user.confirmed) {
        // Send token
        const token = new Token();
        token.user = user.id;
        token.token = generateToken();
        await token.save();
        // Send email
        this.emailService.sendConfirmationEmail({
          email: user.email,
          name: user.name,
          token: token.token,
        });
        throw CustomError.badRequest(
          "Unconfirmed user, we have sent you a token to your email to confirm the acount"
        );
      }

      // Comparamos las contrasenas
      const userPassMatch = BcryptAdapter.compare(
        authUserDto.password,
        user.password
      );
      if (!userPassMatch) throw CustomError.badRequest("Password incorrect");

      // Create JSON Web Token
      const token = JsonWebToken.generateToken({ id: user.id });

      return {
        msg: "Login successful",
        token,
      };
    } catch (error) {
      if (error instanceof CustomError) throw error;
      console.log(error);
      throw CustomError.internalServer("Server Error");
    }
  }

  async requestConfirmedCode(data: RequestCode) {
    try {
      // Validate User exist
      const user = await User.findOne({ email: data.email });
      if (!user) throw CustomError.forbidden("User is not registered");

      if (user.confirmed)
        throw CustomError.forbidden("Account is alredy confirmed");

      // Generate Token
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      // Save
      await Promise.allSettled([user.save(), token.save()]);

      // Send Email
      this.emailService.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      return { msg: "A token has been sent to your email" };
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer("Server Error");
    }
  }

  async forgotPassword(data: AuthUserEmailDto) {
    try {
      // Validate User exist
      const user = await User.findOne({ email: data.email });
      if (!user) throw CustomError.forbidden("User is not registered");

      // Generate Token
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;
      await token.save();

      // Send Email
      this.emailService.sendResetPasswordEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      return { msg: "An email with instruction has been sent" };
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer("Server Error");
    }
  }

  async validateToken(validateToken: ValidateToken) {
    try {
      const tokenExist = await Token.findOne({ token: validateToken.token });

      if (!tokenExist) throw CustomError.notFound("Token not valid");

      return { msg: "Valid Token, set your new password" };
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer("Server Error");
    }
  }

  async updatePassword(updatePassword: UpdatePasswordDto, token: string) {
    try {
      const tokenExist = await Token.findOne({ token: token.toString() });
      if (!tokenExist) throw CustomError.notFound("Token not valid");

      // User
      const user = await User.findById(tokenExist.user);
      if (!user) throw CustomError.notFound("User not found");

      // Validate password
      if (updatePassword.password !== updatePassword.password_confirmation)
        throw CustomError.badRequest("The Password do not match");

      // Hash & Update Password
      user.password = BcryptAdapter.hash(updatePassword.password);

      await Promise.allSettled([user.save(), tokenExist.deleteOne()]);

      return { msg: "The Password was successfully updated" };
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer("Server Error");
    }
  }

  async updateProfile(user: IUser, updateUserProfileDto: UpdateUserProfileDto) {
    const userExist = await User.findOne({ email: updateUserProfileDto.email });
    if (userExist && userExist.id.toString() !== user.id.toString())
      throw CustomError.badRequest("Email is already registered");

    user.email = updateUserProfileDto.email;
    user.name = updateUserProfileDto.name;

    try {
      await user.save();
      return { msg: "Profile updated successfully" };
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer("Server Error");
    }
  }

  async changePassword(user: IUser, changePasswordDto: ChangePasswordDto) {
    try {
      const userExist = await User.findById(user.id);

      const isCorrectPassword = BcryptAdapter.compare(
        changePasswordDto.current_password,
        userExist!.password
      );

      if (!isCorrectPassword)
        throw CustomError.badRequest("Current Password is incorrect");

      userExist!.password = BcryptAdapter.hash(changePasswordDto.password);
      await userExist!.save();
      return { msg: "The password was successfully changed" };
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer("Server Error");
    }
  }

  async checkPassword(user: IUser, checkPasswordDto: CheckPasswordDto) {
    try {
      const userExist = await User.findById(user.id);

      const isCorrectPassword = BcryptAdapter.compare(
        checkPasswordDto.password,
        userExist!.password
      );

      if (!isCorrectPassword)
        throw CustomError.badRequest("Incorrect Password");

      return { msg: 'Correct Password'}
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer("Server Error");
    }
  }
}
