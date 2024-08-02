import api from "@/lib/axios";
import { ProjectFormData } from "@/types/index";


export async function CreateProject(formData: ProjectFormData) {
    try {
        const response = await api.post('/projects', formData);
        console.log(response.data);
        console.log(response.status);
        return response;
    } catch (error) {
        console.log(error);
    }
}