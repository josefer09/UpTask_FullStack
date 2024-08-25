"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const utils_1 = require("../../utils");
const createProject_dto_1 = require("../../domain/dtos/project/createProject.dto");
const updateProject_dto_1 = require("../../domain/dtos/project/updateProject.dto");
class ProjectController {
    // DI
    constructor(service) {
        this.service = service;
        this.handleError = (error, res) => {
            if (error instanceof utils_1.CustomError) {
                return res.status(error.statusCode).json({ msg: error.message });
            }
            console.log(error);
            return res.status(500).json({ msg: "Internal Server Error " });
        };
        this.post = (req, res) => {
            const [error, createProjectDto] = createProject_dto_1.CreateProjectDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const user = req.user;
            this.service
                .createProject(createProjectDto, user)
                .then((project) => res.json(project))
                .catch((error) => this.handleError(error, res));
        };
        this.get = (req, res) => {
            const user = req.user;
            this.service
                .getProjects(user)
                .then((projects) => res.json(projects))
                .catch((error) => this.handleError(error, res));
        };
        this.getById = (req, res) => {
            const { id } = req.params;
            const user = req.user;
            this.service
                .getProjectById(id, user)
                .then((project) => res.json(project))
                .catch((error) => this.handleError(error, res));
        };
        this.put = (req, res) => {
            const { id } = req.params;
            const [error, updateProjectDto] = updateProject_dto_1.UpdateProjectDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const user = req.user;
            this.service
                .updateProject(id, updateProjectDto, user)
                .then((project) => res.json(project))
                .catch((error) => this.handleError(error, res));
        };
        this.delete = (req, res) => {
            const { id } = req.params;
            const user = req.user;
            this.service
                .deleteProject(id, user)
                .then((project) => res.json(project))
                .catch((error) => this.handleError(error, res));
        };
    }
}
exports.ProjectController = ProjectController;
