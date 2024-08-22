import api from "@/lib/axios";
import { dashboardProjectsSchema, editProjectSchema, Project, ProjectDetail, ProjectFormData, projectSchema } from "@/types/index";


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
        const { data } = await api<ProjectDetail>(`/projects/${id}`);
        const response = editProjectSchema.safeParse(data)
        if(response.success) return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getFullProject(id: Project['_id']) {
    try {
        const { data } = await api(`/projects/${id}`);
        console.log(data);
        const response = projectSchema.safeParse(data);
        console.log(response);
        if(response.success) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}

type ProjectAPIType = {
    formData: ProjectFormData;
    projectId: Project['_id'];
}
type responseApi = {
    msg: string;
}
export async function UpdateProject({ formData, projectId}: ProjectAPIType) {
    try {
        const { data } = await api.put<responseApi>(`/projects/${projectId}`, formData);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function DeleteProject(projectId: Project['_id']) {
    try {
        const { data } = await api.delete<responseApi>(`/projects/${projectId}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}