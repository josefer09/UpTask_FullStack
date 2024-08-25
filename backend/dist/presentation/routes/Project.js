"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = require("express");
const Project_1 = require("../controller/Project");
const Project_2 = require("../service/Project");
const express_validator_1 = require("express-validator");
const validation_1 = require("../middleware/validation");
const controller_1 = require("../controller");
const Task_1 = require("../service/Task");
const Project_3 = require("../middleware/Project");
const Task_2 = require("../middleware/Task");
const auth_1 = require("../middleware/auth");
const Team_1 = require("../service/Team");
const Note_1 = require("../service/Note");
const Notes_1 = require("../controller/Notes");
class ProjectRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const service = new Project_2.ProjectService();
        const controller = new Project_1.ProjectController(service);
        const taskService = new Task_1.TaskService();
        const taskController = new controller_1.TaskController(taskService);
        const teamService = new Team_1.TeamService();
        const teamController = new controller_1.TeamController(teamService);
        const noteService = new Note_1.NoteService();
        const noteController = new Notes_1.NoteController(noteService);
        router.use(auth_1.authenticate);
        router.post("/", controller.post);
        router.get("/", controller.get);
        router.get("/:id", (0, express_validator_1.param)("id").isMongoId().withMessage("id is not mongoId"), validation_1.handleInputError, controller.getById);
        router.put("/:id", (0, express_validator_1.param)("id").isMongoId().withMessage("id is not MongoId"), validation_1.handleInputError, controller.put);
        router.delete("/:id", (0, express_validator_1.param)("id").isMongoId().withMessage("id is not MongoId"), validation_1.handleInputError, controller.delete);
        // Task Router
        router.param("projectId", (0, express_validator_1.param)("projectId").isMongoId().withMessage("Id is not MongoId"));
        router.param("projectId", validation_1.handleInputError); // Mientras el parametro exista, se ejecuta el middleware
        router.param("projectId", Project_3.validateProjectExist);
        router.param("taskId", (0, express_validator_1.param)("taskId").isMongoId().withMessage("Id is not MongoId"));
        router.param("taskId", validation_1.handleInputError);
        router.param("taskId", Task_2.validateTaskExist);
        router.param("taskId", Task_2.taskBelongToProject);
        router.post("/:projectId/task", Task_2.hasAuthorization, taskController.post);
        router.get("/:projectId/task", taskController.get);
        router.get("/:projectId/task/:taskId", taskController.getById);
        router.put("/:projectId/task/:taskId", Task_2.hasAuthorization, taskController.put);
        router.delete("/:projectId/task/:taskId", Task_2.hasAuthorization, taskController.delete);
        router.post("/:projectId/task/:taskId", taskController.postStatus);
        //?? Team Routes
        router.post("/:projectId/team/find", teamController.postFindEmail);
        router.get("/:projectId/team", teamController.getTeamMembers);
        router.post("/:projectId/team", teamController.postAddMember);
        router.delete("/:projectId/team/:userId", teamController.deleteMember);
        //** Routes for Notes */
        router.post("/:projectId/tasks/:taskId/notes", noteController.postCreate);
        router.get("/:projectId/tasks/:taskId/notes", noteController.getNotes);
        router.delete("/:projectId/tasks/:taskId/notes/:noteId", noteController.deleteNote);
        return router;
    }
}
exports.ProjectRoutes = ProjectRoutes;
