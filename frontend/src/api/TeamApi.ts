import { isAxiosError } from "axios";
import { Project, TeamMember, TeamMemberForm } from "../types";
import api from "@/lib/axios";

type dataFindUserByEmail = {
    projectId: Project['_id'];
    formData: TeamMemberForm;
}
type ApiResponse = {
    msg: string;
}
export async function findUserByEmail({ projectId, formData }: dataFindUserByEmail) {
    try {
        const url = `/projects/${projectId}/team/find`;
        const { data } = await api.post<TeamMember>(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    }
}

export async function addUserProject({projectId, id}: {projectId: Project['_id'], id: TeamMember['_id']}) {
    try {
        const url = `/projects/${projectId}/team`;
        const { data } = await api.post<{ msg: string }>(url, {id: id});
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    }
}

export async function getProjectTeam(projectId: Project['_id']) {
    try {
        const url = `/projects/${projectId}/team`;
        const { data } = await api<{ team: TeamMember[]}>(url);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    }
}

export async function removeUserFromProject({projectId, userId}: { projectId: Project['_id'], userId: TeamMember['_id']}) {
    try {
        const url = `/projects/${projectId}/team/${userId}`;
        const { data } = await api.delete<ApiResponse>(url);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error);
        
    }
}