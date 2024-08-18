import { FindEmailDto } from "../../domain/dtos/team/findEmail.dto";
import { CustomError } from "../../utils";
import { Request, Response } from "express";
import { TeamService } from "../service/Team";
import { FindMongoIdDto } from "../../domain/dtos/team/findMongoId.dto";



export class TeamController {

    //DI
    constructor(private readonly service: TeamService){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error " });
      };

      postFindEmail = (req: Request, res: Response) => {
        const [error, findEmailDto] = FindEmailDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.service.findUserEmail(findEmailDto!)
        .then(response => res.json(response))
        .catch(error => this.handleError(error, res));
      }

      postAddMember = (req: Request, res: Response) => {
        const [error, findMongoIdDto] = FindMongoIdDto.create(req.body);
        if(error) return res.status(400).json({error});

        const project = req.project;

        this.service.addMemberToTeam(findMongoIdDto!, project)
        .then(response => res.json(response))
        .catch(error => this.handleError(error, res));
      }

      deleteMember = (req: Request, res: Response) => {
        const { userId } = req.params;
        const project = req.project;

        this.service.removeMemberTeam(userId, project)
        .then(response => res.json(response))
        .catch(error => this.handleError(error, res));
      }

      getTeamMembers = (req: Request, res: Response) => {

        const project = req.project;

        this.service.getMembers(project)
        .then(response => res.json(response))
        .catch(error => this.handleError(error, res));
      }
}