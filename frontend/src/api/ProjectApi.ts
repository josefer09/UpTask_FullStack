import api from "@/lib/axios";
import { dashboardProjectsSchema, Project, ProjectFormData } from "@/types/index";


export async function CreateProject(formData: ProjectFormData) {
    try {
        const response = await api.post('/projects', formData);
        console.log(response.data);
        console.log(response.status);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function GetProjects() {
    try {
        const { data } = await api('/projects');
        const response = dashboardProjectsSchema.safeParse(data);
        if( response.success) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function GetProjectById(id: Project['_id']) {
    try {
        const { data } = await api(`/projects/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

type ProjectAPIType = {
    formData: ProjectFormData;
    projectId: Project['_id'];
}
type responseApiGet = {
    msg: string;
}
export async function UpdateProject({ formData, projectId}: ProjectAPIType) {
    try {
        const { data } = await api.put<responseApiGet>(`/projects/${projectId}`, formData);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}