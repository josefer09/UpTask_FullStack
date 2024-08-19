import api from "@/lib/axios";
import { Project, Task, TaskFormData, taskSchema } from "../types";

type TaskApi = {
    formData: TaskFormData;
    projectId: Project['_id'];
    taskId: Task['_id'];
    status: Task['status'];
}

type apiResponse = {
    msg: string;
}

export async function createTask(dataCreateTask: Pick<TaskApi, 'formData' | 'projectId'>) {
    try {
        const { formData, projectId } = dataCreateTask;
        const { data } = await api.post<{msg: string}>(`/projects/${projectId}/task`, formData);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getTaskById({ projectId, taskId }: Pick<TaskApi, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/task/${taskId}`;
        const { data } = await api(url);
        const response = taskSchema.safeParse(data);
        console.log(data);
        if(response.success) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function updateTask({ projectId, taskId, formData }: Pick<TaskApi, 'projectId' | 'taskId' | 'formData'>) {
    try {
        const url = `/projects/${projectId}/task/${taskId}`;
        const { data } = await api.put<apiResponse>(url, formData);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteTask({ projectId, taskId }: Pick<TaskApi, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/task/${taskId}`;
        const { data } = await api.delete<apiResponse>(url);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateStatus({ projectId, taskId, status }: Pick<TaskApi, 'projectId' | 'taskId' | 'status'>) {
    try {
        const url = `/projects/${projectId}/task/${taskId}`;
        const { data } = await api.post<apiResponse>(url, {status});
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}