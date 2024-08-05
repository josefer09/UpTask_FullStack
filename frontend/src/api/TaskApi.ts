import api from "@/lib/axios";
import { Project, TaskFormData } from "../types";

type TaskApi = {
    formData: TaskFormData;
    projectId: Project['_id'];
}
export async function createTask(dataCreateTask: TaskApi) {
    try {
        const { formData, projectId } = dataCreateTask;
        const { data } = await api.post<{msg: string}>(`/projects/${projectId}/task`, formData);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}