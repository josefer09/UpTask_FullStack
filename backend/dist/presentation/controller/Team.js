"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamController = void 0;
const findEmail_dto_1 = require("../../domain/dtos/team/findEmail.dto");
const utils_1 = require("../../utils");
const findMongoId_dto_1 = require("../../domain/dtos/team/findMongoId.dto");
class TeamController {
    //DI
    constructor(service) {
        this.service = service;
        this.handleError = (error, res) => {
            if (error instanceof utils_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.log(error);
            return res.status(500).json({ msg: "Internal Server Error " });
        };
        this.postFindEmail = (req, res) => {
            const [error, findEmailDto] = findEmail_dto_1.FindEmailDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            this.service.findUserEmail(findEmailDto)
                .then(response => res.json(response))
                .catch(error => this.handleError(error, res));
        };
        this.postAddMember = (req, res) => {
            const [error, findMongoIdDto] = findMongoId_dto_1.FindMongoIdDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const project = req.project;
            this.service.addMemberToTeam(findMongoIdDto, project)
                .then(response => res.json(response))
                .catch(error => this.handleError(error, res));
        };
        this.deleteMember = (req, res) => {
            const { userId } = req.params;
            const project = req.project;
            this.service.removeMemberTeam(userId, project)
                .then(response => res.json(response))
                .catch(error => this.handleError(error, res));
        };
        this.getTeamMembers = (req, res) => {
            const project = req.project;
            this.service.getMembers(project)
                .then(response => res.json(response))
                .catch(error => this.handleError(error, res));
        };
    }
}
exports.TeamController = TeamController;
