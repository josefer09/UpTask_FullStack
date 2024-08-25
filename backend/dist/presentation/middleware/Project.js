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
exports.validateProjectExist = validateProjectExist;
const utils_1 = require("../../utils");
const Project_1 = require("../../model/Project");
function validateProjectExist(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { projectId } = req.params;
            // Find project
            const project = yield Project_1.ProjectModel.findById(projectId);
            if (!project) {
                const error = utils_1.CustomError.notFound(`Project with id: ${projectId} doesn't exist`);
                res.status(error.statusCode).json({ error: error.message });
                return next(error);
            }
            req.project = project;
            next();
        }
        catch (error) {
            if (error instanceof utils_1.CustomError)
                return next(error);
            console.log(error);
            const serverError = utils_1.CustomError.internalServer('Server Error trying found project');
            res.status(500).json({ error: serverError.message });
            return next(serverError);
        }
    });
}
