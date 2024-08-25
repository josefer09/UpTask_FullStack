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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamService = void 0;
const Project_1 = require("../../model/Project");
const User_1 = __importDefault(require("../../model/User"));
const utils_1 = require("../../utils");
class TeamService {
    // DI
    constructor() { }
    findUserEmail(findEmailDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ email: findEmailDto.email }).select('email name _id');
                if (!user)
                    throw utils_1.CustomError.notFound(`User with email: ${findEmailDto.email} not found`);
                return user;
            }
            catch (error) {
                if (error instanceof utils_1.CustomError)
                    throw error;
                throw utils_1.CustomError.internalServer('Server Error');
            }
        });
    }
    addMemberToTeam(findMongoIdDto, project) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findById(findMongoIdDto.id).select('id');
                if (!user)
                    throw utils_1.CustomError.notFound('User not found');
                if (project.team.some(team => team.toString() === user.id.toString()))
                    throw utils_1.CustomError.badRequest('The user already exists in the project');
                project.team.push(user.id);
                yield project.save();
                return { msg: 'User added successfully' };
            }
            catch (error) {
                if (error instanceof utils_1.CustomError)
                    throw error;
                throw utils_1.CustomError.internalServer('Server Error');
            }
        });
    }
    removeMemberTeam(id, project) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!project.team.some(team => team.toString() === id.toString()))
                    throw utils_1.CustomError.badRequest('The user does not exists in the project');
                // Remove
                project.team = project.team.filter(teamMember => teamMember.toString() !== id);
                yield project.save();
                return { msg: 'Member removed from the team successfully' };
            }
            catch (error) {
                if (error instanceof utils_1.CustomError)
                    throw error;
                throw utils_1.CustomError.internalServer('Server Error');
            }
        });
    }
    getMembers(project) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectExist = yield Project_1.ProjectModel.findById(project.id).populate({
                    path: 'team',
                    select: 'id name email',
                });
                return { team: projectExist.team };
            }
            catch (error) {
                if (error instanceof utils_1.CustomError)
                    throw error;
                throw utils_1.CustomError.internalServer('Server Error');
            }
        });
    }
}
exports.TeamService = TeamService;
