import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Note, NoteFormData, Project, Task } from "../types";

export type NoteAPIType = {
    formData: NoteFormData;
    projectId: Project['_id'];
    taskId: Task['_id']; // Look up
    noteId: Note['_id'];
}

export async function createNote({projectId, taskId, formData}: Pick<NoteAPIType, 'projectId' | 'taskId' | 'formData'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`;
        const { data } = await api.post<{ msg: string }>(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    }
}

export async function deleteNote({projectId, taskId, noteId}: Pick<NoteAPIType, 'projectId' | 'taskId' | 'noteId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
        const { data } = await api.delete<{ msg: string }>(url);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    }
}