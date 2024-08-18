import { response, Router } from "express";
import { ProjectController } from "../controller/Project";
import { ProjectService } from "../service/Project";
import { param } from "express-validator";
import { handleInputError } from "../middleware/validation";
import { TaskController, TeamController } from "../controller";
import { TaskService } from "../service/Task";
import { validateProjectExist } from "../middleware/Project";
import { taskBelongToProject, validateTaskExist } from "../middleware/Task";
import { authenticate } from "../middleware/auth";
import { TeamService } from "../service/Team";

export class ProjectRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new ProjectService();
    const controller = new ProjectController(service);

    const taskService = new TaskService();
    const taskController = new TaskController(taskService);

    const teamService = new TeamService();
    const teamController = new TeamController(teamService);

    router.use(authenticate);

    router.post("/", controller.post);
    router.get("/", controller.get);

    router.get(
      "/:id",
      param("id").isMongoId().withMessage("id is not mongoId"),
      handleInputError,
      controller.getById
    );
    router.put(
      "/:id",
      param("id").isMongoId().withMessage("id is not MongoId"),
      handleInputError,
      controller.put
    );
    router.delete(
      "/:id",
      param("id").isMongoId().withMessage("id is not MongoId"),
      handleInputError,
      controller.delete
    );

    // Task Router
    router.param("projectId", param("projectId").isMongoId().withMessage("Id is not MongoId"));
    router.param("projectId", handleInputError); // Mientras el parametro exista, se ejecuta el middleware
    router.param("projectId", validateProjectExist);

    router.param("taskId", param("taskId").isMongoId().withMessage("Id is not MongoId"));
    router.param("taskId", handleInputError);
    router.param("taskId", validateTaskExist);
    router.param("taskId", taskBelongToProject);

    router.post(
      "/:projectId/task",
      taskController.post
    );

    router.get(
      "/:projectId/task",
      taskController.get
    );

    router.get(
      "/:projectId/task/:taskId",
      taskController.getById
    );

    router.put(
      "/:projectId/task/:taskId",
      taskController.put,
    );

    router.delete(
      "/:projectId/task/:taskId",
      taskController.delete,
    );

    router.post(
      "/:projectId/task/:taskId",
      taskController.postStatus,
    );
    
    //?? Team Routes
    router.post(
      "/:projectId/team/find",
      teamController.postFindEmail,
    );

    router.get(
      "/:projectId/team",
      teamController.getTeamMembers,
    )
      
    router.post(
      "/:projectId/team",
      teamController.postAddMember,
    )

    router.delete(
      "/:projectId/team",
      teamController.deleteMember,
    );

    return router;
  }
}
