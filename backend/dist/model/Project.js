"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.ProjectModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const Task_1 = require("./Task");
const Note_1 = __importDefault(require("./Note"));
;
const ProjectSchema = new mongoose_1.Schema({
    projectName: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true,
    },
    clientName: {
        type: String,
        required: [true, 'Client name is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    tasks: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Task'
        }
    ],
    manager: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
    },
    team: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'User'
        }
    ],
}, { timestamps: true });
// Middleware
ProjectSchema.pre('deleteOne', { document: true }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const projectId = this.id;
        if (!projectId)
            return;
        const tasks = yield Task_1.Task.find({ project: projectId });
        for (const task of tasks) {
            yield Note_1.default.deleteMany({ task: task.id });
        }
        yield Task_1.Task.deleteMany({ project: projectId });
    });
});
ProjectSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
    }
});
exports.ProjectModel = mongoose_1.default.model('Project', ProjectSchema);
// Con el generic decimos que cuando hagamos referencia al projecto, se haga con los atributos y elemetos correspondientes
