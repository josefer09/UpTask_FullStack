import { FindEmailDto } from "../../domain/dtos/team/findEmail.dto";
import { FindMongoIdDto } from "../../domain/dtos/team/findMongoId.dto";
import { IProject, ProjectModel } from "../../model/Project";
import User from "../../model/User";
import { CustomError } from "../../utils";
import path from 'path';



export class TeamService {

    // DI

    constructor() {}

    async findUserEmail(findEmailDto: FindEmailDto) {
        try {
            const user = await User.findOne({email: findEmailDto.email}).select('email name _id');
            if( !user ) throw CustomError.notFound(`User with email: ${findEmailDto.email} not found`);

            return user;
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer('Server Error');
        }
    }

    async addMemberToTeam(findMongoIdDto: FindMongoIdDto, project: IProject) {
        try {
            const user = await User.findById(findMongoIdDto.id).select('id');
            if( !user ) throw CustomError.notFound('User not found');

            if( project.team.some(team => team!.toString() === user.id.toString())) throw CustomError.badRequest('The user already exists in the project');

            project.team.push(user.id);
            await project.save();

            return { msg: 'User added successfully'}

        } catch (error) {
         if( error instanceof CustomError ) throw error;
         throw CustomError.internalServer('Server Error');  
        }
    }

    async removeMemberTeam(id: string, project: IProject) {
        try {
            if( !project.team.some(team => team!.toString() === id.toString())) throw CustomError.badRequest('The user does not exists in the project');

            // Remove
            project.team = project.team.filter( teamMember => teamMember!.toString() !== id);

            await project.save();

            return { msg: 'Member removed from the team successfully' };
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer('Server Error');
        }
    }

    async getMembers(project: IProject) {
        try {
            const projectExist = await ProjectModel.findById(project.id).populate({
                path: 'team',
                select: 'id name email',
            });

            return { team: projectExist!.team }
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer('Server Error');
        }
    }
}