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
exports.validateTaskExist = validateTaskExist;
exports.taskBelongToProject = taskBelongToProject;
exports.hasAuthorization = hasAuthorization;
const utils_1 = require("../../utils");
const Task_1 = require("../../model/Task");
function validateTaskExist(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { taskId } = req.params;
            // Find project
            const task = yield Task_1.Task.findById(taskId);
            if (!task) {
                const error = utils_1.CustomError.notFound(`Task with id: ${taskId} doesn't exist`);
                res.status(error.statusCode).json({ error: error.message });
                return next(error);
            }
            req.task = task;
            next();
        }
        catch (error) {
            if (error instanceof utils_1.CustomError)
                return next(error);
            console.log(error);
            const serverError = utils_1.CustomError.internalServer('Server Error trying found task');
            res.status(500).json({ error: serverError.message });
            return next(serverError);
        }
    });
}
function taskBelongToProject(req, res, next) {
    try {
        if (req.task.project.toString() !== req.project.id.toString()) {
            const error = utils_1.CustomError.forbidden('Action not valid, this task is from other project');
            res.status(error.statusCode).json({ error: error.message });
            return next(error);
        }
    }
    catch (error) {
        if (error instanceof utils_1.CustomError)
            return next(error);
        console.log(error);
        const serverError = utils_1.CustomError.internalServer('Server Error');
        res.status(serverError.statusCode).json({ error: serverError.message });
        return next(serverError);
    }
    next();
}
function hasAuthorization(req, res, next) {
    var _a;
    try {
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id.toString()) !== req.project.manager.toString()) {
            const error = utils_1.CustomError.forbidden('Action not valid, this task is from other project');
            res.status(error.statusCode).json({ error: error.message });
            return next(error);
        }
    }
    catch (error) {
        if (error instanceof utils_1.CustomError)
            return next(error);
        console.log(error);
        const serverError = utils_1.CustomError.internalServer('Server Error');
        res.status(serverError.statusCode).json({ error: serverError.message });
        return next(serverError);
    }
    next();
}
