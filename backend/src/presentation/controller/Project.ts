import { Request, Response } from "express";
import { CustomError } from "../../utils";
import { ProjectService } from "../service/Project";
import { CreateProjectDto } from "../../domain/dtos/project/createProject.dto";
import { UpdateProjectDto } from "../../domain/dtos/project/updateProject.dto";

export class ProjectController {
  // DI
  constructor(private readonly service: ProjectService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ msg: error.message });
    }

    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error " });
  };

  post = (req: Request, res: Response) => {
        const [error, createProjectDto] = CreateProjectDto.create(req.body);
        if( error ) return res.status(400).json({error});

        this.service.createProject(createProjectDto!)
        .then( project => res.json(project))
        .catch( error => this.handleError(error, res));
  }

  get = (req: Request, res: Response) => {
    this.service
      .getProjects()
      .then((projects) => res.json(projects))
      .catch((error) => this.handleError(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.service.getProjectById(id)
    .then( project => res.json(project))
    .catch( error => this.handleError(error, res));
  }

  put = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateProjectDto] = UpdateProjectDto.create(req.body);
    if( error ) return res.status(400).json({ error });
    this.service.updateProject(id, updateProjectDto!)
    .then( project => res.json(project))
    .catch( error => this.handleError(error, res));
  }

  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    this.service.deleteProject(id)
    .then( project => res.json(project))
    .catch( error => this.handleError(error, res));
  }
}
