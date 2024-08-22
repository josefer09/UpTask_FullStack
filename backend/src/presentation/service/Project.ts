import { CreateProjectDto } from "../../domain/dtos/project/createProject.dto";
import { UpdateProjectDto } from "../../domain/dtos/project/updateProject.dto";
import { ProjectModel } from "../../model/Project";
import { IUser } from "../../model/User";
import { CustomError } from "../../utils";


export class ProjectService {

    // DI

    constructor() {}

    async createProject(createProjectDto: CreateProjectDto, user: IUser) {
        // Almacenar en la db
        try {
            const project = new ProjectModel(createProjectDto);

            // Set Manager
            project.manager = user;
            
            await project.save();
            return project;
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Server Error');
        }
    }

    async getProjects(user: IUser) {
        try {
            const projects = await ProjectModel.find({
                $or: [
                    {manager: {$in: user.id}},
                    {team: {$in: user.id}}
                ]
            });
            return projects;
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Server Error');
        }
    }

    async getProjectById(id: string, user: IUser) {
        try {
            const project = await ProjectModel.findById(id).populate('tasks');
            if ( !project ) throw CustomError.notFound(`Project with id: ${id} not found`);
            if ( project.manager?.toString() !== user.id.toString() && !project.team.includes(user.id)) throw CustomError.unauthorized('Action not valid');
            return project
        } catch (error) {
            if ( error instanceof CustomError ) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer('Server Error');
        }
    }

    async updateProject(id: string, body: UpdateProjectDto, user: IUser) {
        try {
            const project = await ProjectModel.findByIdAndUpdate(id, body);
            if (!project) throw CustomError.notFound(`Project with id: ${id} not found`);
            if ( project.manager?.toString() !== user.id.toString() ) throw CustomError.unauthorized('Action not valid, only Manager can update this project');
            return {
                msg: 'Project Updated',
            }
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            console.log(error);
            throw CustomError.internalServer('Server Error');
        }
    }

    async deleteProject(id: string, user: IUser) {
        try {
            const project = await ProjectModel.findById(id);
            if (!project) throw CustomError.notFound(`Project with id: ${id} not found`);
            if ( project.manager?.toString() !== user.id.toString() ) throw CustomError.unauthorized('Action not valid, only Manager can delete this project');
            await project.deleteOne();
            return {
                msg: 'Project Deleted'
            }
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.log(error);
            throw CustomError.internalServer('Server Error');
        }
    }
}