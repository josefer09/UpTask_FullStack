import { z } from 'zod';

//** Projects */
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
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
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>;