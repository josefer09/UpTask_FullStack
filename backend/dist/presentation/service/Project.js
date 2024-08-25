"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const Project_1 = require("../../model/Project");
const utils_1 = require("../../utils");
class ProjectService {
    // DI
    constructor() { }
    createProject(createProjectDto, user) {
        return __awaiter(this, void 0, void 0, function* () {
            // Almacenar en la db
            try {
                const project = new Project_1.ProjectModel(createProjectDto);
                // Set Manager
                project.manager = user;
                yield project.save();
                return project;
            }
            catch (error) {
                console.log(error);
                throw utils_1.CustomError.internalServer('Server Error');
            }
        });
    }
    getProjects(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield Project_1.ProjectModel.find({
                    $or: [
                        { manager: { $in: user.id } },
                        { team: { $in: user.id } }
                    ]
                });
                return projects;
            }
            catch (error) {
                console.log(error);
                throw utils_1.CustomError.internalServer('Server Error');
            }
        });
    }
    getProjectById(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const project = yield Project_1.ProjectModel.findById(id).populate('tasks');
                if (!project)
                    throw utils_1.CustomError.notFound(`Project with id: ${id} not found`);
                if (((_a = project.manager) === null || _a === void 0 ? void 0 : _a.toString()) !== user.id.toString() && !project.team.includes(user.id))
                    throw utils_1.CustomError.unauthorized('Action not valid');
                return project;
            }
            catch (error) {
                if (error instanceof utils_1.CustomError) {
                    throw error;
                }
                console.log(error);
                throw utils_1.CustomError.internalServer('Server Error');
            }
        });
    }
    updateProject(id, body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const project = yield Project_1.ProjectModel.findByIdAndUpdate(id, body);
                if (!project)
                    throw utils_1.CustomError.notFound(`Project with id: ${id} not found`);
                if (((_a = project.manager) === null || _a === void 0 ? void 0 : _a.toString()) !== user.id.toString())
                    throw utils_1.CustomError.unauthorized('Action not valid, only Manager can update this project');
                return {
                    msg: 'Project Updated',
                };
            }
            catch (error) {
                if (error instanceof utils_1.CustomError)
                    throw error;
                console.log(error);
                throw utils_1.CustomError.internalServer('Server Error');
            }
        });
    }
    deleteProject(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const project = yield Project_1.ProjectModel.findById(id);
                if (!project)
                    throw utils_1.CustomError.notFound(`Project with id: ${id} not found`);
                if (((_a = project.manager) === null || _a === void 0 ? void 0 : _a.toString()) !== user.id.toString())
                    throw utils_1.CustomError.unauthorized('Action not valid, only Manager can delete this project');
                yield project.deleteOne();
                return {
                    msg: 'Project Deleted'
                };
            }
            catch (error) {
                if (error instanceof utils_1.CustomError)
                    throw error;
                console.log(error);
                throw utils_1.CustomError.internalServer('Server Error');
            }
        });
    }
}
exports.ProjectService = ProjectService;
