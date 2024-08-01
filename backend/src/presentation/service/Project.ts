import { CreateProjectDto } from "../../domain/dtos/project/createProject.dto";
import { UpdateProjectDto } from "../../domain/dtos/project/updateProject.dto";
import { ProjectModel } from "../../model/Project";
import { CustomError } from "../../utils";


export class ProjectService {

    // DI

    constructor() {}

    async createProject(createProjectDto: CreateProjectDto) {
        // Almacenar en la db
        try {
            const project = new ProjectModel(createProjectDto);
            await project.save();
            return project;
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Server Error');
        }
    }

    async getProjects() {
        try {
            const projects = await ProjectModel.find();
            return projects;
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Server Error');
        }
    }

    async getProjectById(id: string) {
        try {
            const project = await ProjectModel.findById(id).populate('tasks');
            if ( !project ) throw CustomError.notFound(`Project with id: ${id} not found`);
            console.log({project});
            return project
        } catch (error) {
            if ( error instanceof CustomError ) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer('Server Error');
        }
    }

    async updateProject(id: string, body: UpdateProjectDto) {
        try {
            const project = await ProjectModel.findByIdAndUpdate(id, body);
            if (!project) throw CustomError.notFound(`Project with id: ${id} not found`);
            return {
                msg: 'Project Updated',
                project: body
            }
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            console.log(error);
            throw CustomError.internalServer('Server Error');
        }
    }

    async deleteProject(id: string) {
        try {
            const project = await ProjectModel.findByIdAndDelete(id);
            if (!project) throw CustomError.notFound(`Project with id: ${id} not found`);
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