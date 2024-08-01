import type { Request, Response, NextFunction} from 'express';
import { CustomError } from '../../utils';
import { ITask, Task } from '../../model/Task';

declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}



export async function validateTaskExist(req: Request, res: Response, next: NextFunction) {
    try {
        const { taskId } = req.params;
        // Find project
        const task = await Task.findById(taskId);
        if(!task) {
            const error = CustomError.notFound(`Task with id: ${taskId} doesn't exist`);
            res.status(error.statusCode).json({ error: error.message });
            return next(error);
        }
        req.task = task;
        next();
    } catch (error) {
        if( error instanceof CustomError ) return next(error);
        console.log(error);
        const serverError = CustomError.internalServer('Server Error trying found task');
        res.status(500).json({ error: serverError.message });
        return next(serverError);
    }
}

export function taskBelongToProject(req: Request, res: Response, next: NextFunction) {
    try {
        if( req.task.project.toString() !== req.project.id.toString() ) {
            const error = CustomError.forbidden('Action not valid, this task is from other project');
            res.status(error.statusCode).json({ error: error.message});
            return next(error);
        }
    } catch (error) {
        if(error instanceof CustomError) return next(error);
        console.log(error);
        const serverError = CustomError.internalServer('Server Error');
        res.status(serverError.statusCode).json({ error: serverError.message});
        return next(serverError);
    }
    next();
}