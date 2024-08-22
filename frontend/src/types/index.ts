import { z } from 'zod';

//** AUth & User */
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    current_password: z.string(),
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
export type UpdateCurrentUserPasswordFrom = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>;
export type CheckUserPassword = Pick<Auth, 'password'>;
export type ConfirmToken = Pick<Auth, 'token'>;

//** Users */
export const userSchema = authSchema.pick({
    name: true,
    email: true,
}).extend({
    _id: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, 'email' | 'name'>;

//** Notes */
const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task: z.string(),
    createdAt: z.string(),
});

export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, 'content'>;


//** Tasks */

export const taskStatusSchema = z.enum(["onHold", "inProgress", "underReview", "completed", "pending"]);
export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    notes: z.array(noteSchema.extend({
        createdBy: userSchema
    })),
    updatedAt: z.string(),
    createdAt: z.string(),
    completedBy: z.array(z.object({
        _id: z.string(),
        user: userSchema,
        status: taskStatusSchema,
    })),
});

export const taskProjectSchema = taskSchema.pick({
    _id: true,
    name: true,
    description: true,
    status: true,
});

export type Task = z.infer<typeof taskSchema>;
export type TaskStatus = z.infer<typeof taskStatusSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>;
export type TaskDetail = z.infer<typeof taskSchema>;
export type TaskProyect = z.infer<typeof taskProjectSchema>;



//** Projects */
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(userSchema.pick({ _id: true })),
    tasks: z.array(taskProjectSchema),
    team: z.array(z.string(userSchema.pick({_id: true}))),
    createdAt: z.string(),
    updatedAt: z.string(),
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

export const editProjectSchema = projectSchema.pick({
    projectName: true,
    clientName: true,
    description: true,
})

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