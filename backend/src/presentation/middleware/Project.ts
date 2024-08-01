import type { Request, Response, NextFunction} from 'express';
import { CustomError } from '../../utils';
import { IProject, ProjectModel } from '../../model/Project';

declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}



export async function validateProjectExist(req: Request, res: Response, next: NextFunction) {
    try {
        const { projectId } = req.params;
        // Find project
        const project = await ProjectModel.findById(projectId);
        if(!project) {
            const error = CustomError.notFound(`Project with id: ${projectId} doesn't exist`);
            res.status(error.statusCode).json({ error: error.message });
            return next(error);
        }
        req.project = project;
        next();
    } catch (error) {
        if( error instanceof CustomError ) return next(error);
        console.log(error);
        const serverError = CustomError.internalServer('Server Error trying found project');
        res.status(500).json({ error: serverError.message });
        return next(serverError);
    }
}