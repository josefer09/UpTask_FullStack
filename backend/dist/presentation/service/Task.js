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
exports.TaskService = void 0;
const Task_1 = require("../../model/Task");
const utils_1 = require("../../utils");
class TaskService {
    // DI
    constructor() { }
    createTask(createTaskDto, project) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield Task_1.Task.create(createTaskDto);
                task.project = project.id;
                project.tasks.push(task.id);
                yield Promise.allSettled([task.save(), project.save()]); // Se ejecuta cuando todos los promises se cumplan
                return {
                    msg: 'Task Created',
                };
            }
            catch (error) {
                console.log(error);
                throw utils_1.CustomError.internalServer('Server Error');
            }
        });
    }
    getAllTask(project) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield Task_1.Task.find({ project: project.id });
                if (tasks.length === 0)
                    throw utils_1.CustomError.badRequest(`The project doesn't have task`);
                return tasks;
            }
            catch (error) {
                if (error instanceof utils_1.CustomError)
                    throw error;
                console.log(error);
                throw utils_1.CustomError.internalServer('Server Error');
            }
        });
    }
    getTaskById(project, task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskData = yield Task_1.Task.findById(task.id).populate({ path: 'completedBy.user', select: 'email name id' }).populate({ path: 'notes', populate: { path: 'createdBy', select: 'id name email' } });
                return taskData;
            }
            catch (error) {
                if (error instanceof utils_1.CustomError)
                    throw error;
                console.log(error);
                throw utils_1.CustomError.internalServer('Server Error');
            }
        });
    }
    updateTask(project, task, dataUpdate, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                task.name = dataUpdate.name;
                task.description = dataUpdate.description;
                yield task.save();
                return {
                    msg: 'Task Updated',
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
    deleteTask(project, task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                project.tasks = project.tasks.filter(currentTask => currentTask.toString() !== (task === null || task === void 0 ? void 0 : task.id.toString()));
                yield Promise.allSettled([task.deleteOne(), project.save()]);
                return {
                    msg: 'Task deleted succefully',
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
    updateStatus(project, task, status, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!['pending', 'onHold', 'inProgress', 'underReview', 'completed'].includes(status)) {
                    throw utils_1.CustomError.forbidden(`Status: ${status} is incompatible`);
                }
                task.status = status;
                const data = {
                    user: user.id,
                    status,
                };
                task.completedBy.push(data);
                yield task.save();
                return {
                    msg: 'Status updated',
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
exports.TaskService = TaskService;
