import { z } from 'zod';


//** Tasks */

export const taskStatusSchema = z.enum(["onHold", "inProgress", "underReview", "completed", "pending"]);
export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    updatedAt: z.string(),
    createdAt: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
export type TaskStatus = z.infer<typeof taskStatusSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>;



//** Projects */
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
});

export const projectDetailSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(taskSchema),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const dashboardProjectsSchema = z.array(
    // projectSchema.pick({
    //     _id: true,
    //     projectName: true,
    //     clientName: true,
    //     description: true,
    // })
    z.object( {
    id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
    })
);

export type Project = z.infer<typeof projectSchema>;
export type ProjectDetail = z.infer<typeof projectDetailSchema>;
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>;