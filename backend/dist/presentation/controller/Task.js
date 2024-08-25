"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const utils_1 = require("../../utils");
const createTask_dto_1 = require("../../domain/dtos/task/createTask.dto");
class TaskController {
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
            const project = req.project;
            if (!project) {
                return this.handleError(utils_1.CustomError.notFound('Project not found'), res);
            }
            const [error, createTaskDto] = createTask_dto_1.CreateTaskDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            this.service.createTask(createTaskDto, project)
                .then(response => res.json(response))
                .catch(error => this.handleError(error, res));
        };
        this.get = (req, res) => {
            const project = req.project;
            this.service.getAllTask(project)
                .then(tasks => res.json(tasks))
                .catch(error => this.handleError(error, res));
        };
        this.getById = (req, res) => {
            const project = req.project;
            const task = req.task;
            this.service.getTaskById(project, task)
                .then(task => res.json(task))
                .catch(error => this.handleError(error, res));
        };
        this.put = (req, res) => {
            const project = req.project;
            const taskData = req.body;
            const task = req.task;
            const user = req.user;
            this.service.updateTask(project, task, req.body, user)
                .then(taskUpdated => res.json(taskUpdated))
                .catch(error => this.handleError(error, res));
        };
        this.delete = (req, res) => {
            const project = req.project;
            const task = req.task;
            this.service.deleteTask(project, task)
                .then(taskDeleted => res.json(taskDeleted))
                .catch(error => this.handleError(error, res));
        };
        this.postStatus = (req, res) => {
            const project = req.project;
            const task = req.task;
            const { status } = req.body;
            const user = req.user;
            this.service.updateStatus(project, task, status, user)
                .then(taskStatus => res.json(taskStatus))
                .catch(error => this.handleError(error, res));
        };
    }
}
exports.TaskController = TaskController;
