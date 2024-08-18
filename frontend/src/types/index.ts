import { z } from 'zod';

//** AUth & User */
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    userDiscord: z.string().optional(),
    token: z.string(),
});

type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation' | 'userDiscord'>;
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>;
export type ForgotPasswordForm = Pick<Auth, 'email'>;
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>;
export type ConfirmToken = Pick<Auth, 'token'>;

//** Users */
export const userSchema = authSchema.pick({
    name: true,
    email: true,
}).extend({
    _id: z.string(),
});

export type User = z.infer<typeof userSchema>;

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
    manager: z.string(userSchema.pick({ _id: true })),
});

export const projectDetailSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(taskSchema),
    createdAt: z.string(),
    updatedAt: z.string(),
    manager: z.string(userSchema.pick({ _id: true })),
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
    manager: z.string(userSchema.pick({ _id: true })),
    })
);

export type Project = z.infer<typeof projectSchema>;
export type ProjectDetail = z.infer<typeof projectDetailSchema>;
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>;

//?? Team
const teamMemberSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true,
});
export const teamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;