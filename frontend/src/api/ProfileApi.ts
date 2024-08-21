import { isAxiosError } from "axios";
import { UpdateCurrentUserPasswordFrom, UserProfileForm } from "../types";
import api from "@/lib/axios";


type ApiResponse = {
    msg: string;
};

export async function updateProfile( formData: UserProfileForm) {
    try {
        const url = `/auth/profile`;
        const { data } = await api.put<ApiResponse>(url, formData);
        return data;
    } catch (error) {
        if( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function changePassword( formData: UpdateCurrentUserPasswordFrom) {
    try {
        const url = '/auth/update-password';
        const { data } = await api.post<ApiResponse>(url, formData);
        return data;
    } catch (error) {
        if( isAxiosError(error) && error.response ) throw new Error(error.response.data.error);
    }
}