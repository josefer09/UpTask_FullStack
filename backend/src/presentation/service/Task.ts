import { CreateTaskDto } from "../../domain/dtos/task/createTask.dto";
import { IProject } from "../../model/Project";
import { ITask, Task, TaskStatus } from "../../model/Task";
import { CustomError } from "../../utils";

export class TaskService {

    // DI

    constructor(){}

    async createTask(createTaskDto: CreateTaskDto, project: IProject) {
        try {
            const task = await Task.create(createTaskDto);
            task.project = project.id;
            project.tasks.push(task.id);

            await Promise.allSettled([task.save(), project.save()]); // Se ejecuta cuando todos los promises se cumplan
            return {
                msg: 'Task Created',
            }
            
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Server Error');
        }
    }

    async getAllTask(project: IProject) {
        try {
            const tasks = await Task.find( { project: project.id } );
            if( tasks.length === 0 ) throw CustomError.badRequest(`The project doesn't have task`);
            return tasks;
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            console.log(error);
            throw CustomError.internalServer('Server Error');
        }
    }

    async getTaskById(project: IProject, task: ITask) {
        try {
            return task;
        } catch (error) {
            if( error instanceof CustomError) throw error;
            console.log(error);
            throw CustomError.internalServer('Server Error');
        }
    }

    async updateTask(project: IProject, task: ITask, dataUpdate: ITask) {
        try {
            if(dataUpdate.name !== undefined ) {
                task.name = dataUpdate.name;
            }

            if(dataUpdate.description !== undefined ) {
                task.description = dataUpdate.description;
            }

            await task.save();

            return {
                msg: 'Task Updated',
                task: task,
            }
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            console.log(error);
            throw CustomError.internalServer('Server Error');
        }
    }

    async deleteTask(project: IProject, task: ITask) {
        try {
            project.tasks = project.tasks.filter( currentTask => currentTask!.toString() !== task?.id.toString());

           await Promise.allSettled([task.deleteOne(), project.save()]);

            return {
                msg: 'Task deleted succefully',
            }

        } catch (error) {
            if(error instanceof CustomError) throw error;
            console.log(error);
            throw CustomError.internalServer('Server Error');
        }
    }

    async updateStatus(project: IProject, task: ITask, status: TaskStatus) {
        try {
            if( !['pending', 'onHold', 'inProgress', 'underReview', 'completed'].includes(status) ) {
                throw CustomError.forbidden(`Status: ${status} is incompatible`)
            }

            task.status = status;
            await task.save();

            return {
                msg: 'Status updated',
            }

        } catch (error) {
            if( error instanceof CustomError ) throw error;
            console.log(error);
            throw CustomError.internalServer('Server Error');
        }
    }
}