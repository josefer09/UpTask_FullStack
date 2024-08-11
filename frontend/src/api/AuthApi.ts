import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = `/auth/create-account`;
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        console.log(error);
        if( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function confirmAccount(token: ConfirmToken['token']) {
    try {
        const url = `/auth/confirm-account`;
        const { data } = await api.post<{msg: string}>(url, {token});
        return data;
    } catch (error) {
        console.log(error);
        if( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function requestNewConfirmationCode(email: RequestConfirmationCodeForm) {
    try {
        const url = `/auth/request-code`;
        const { data } = await api.post<{msg: string}>(url, email);
        return data;
    } catch (error) {
        console.log(error);
        if( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const url = `/auth/login`;
        const { data } = await api.post<{msg: string}>(url, formData);
        return data;
    } catch (error) {
        console.log(error);
        if( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error);
        }
    }   
}