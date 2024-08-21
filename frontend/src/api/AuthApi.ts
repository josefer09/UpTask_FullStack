import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { CheckUserPassword, ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, User, UserLoginForm, UserRegistrationForm } from "../types";

type ApiResponse = {
    msg: string;
}

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
        const { data } = await api.post<{msg: string, token: string}>(url, formData);
        // Set LocalStorage
        localStorage.setItem('AUTH_TOKEN', data.token);
        return data;
    } catch (error) {
        console.log(error);
        if( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error);
        }
    }   
}

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = `/auth/forgot-password`;
        const { data } = await api.post<{msg: string}>(url, formData);
        return data;
    } catch (error) {
        console.log(error);
        if( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function validateTokenPassword(token: ConfirmToken['token']) {
    try {
        const url = `/auth/validate-token`;
        console.log(token);
        const { data } = await api.post<{msg: string}>(url, {token});
        return data;
    } catch (error) {
        console.log(error);
        if( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error);
        }
    }
}

type UpdatePasswordType = {
    formData: NewPasswordForm;
    token: ConfirmToken['token'];
}
export async function updatePassword({ formData, token }: UpdatePasswordType) {
    try {
        const url = `/auth/update-password/${token}`;
        const { data } = await api.post<ApiResponse>(url, formData);
        return data;
    } catch (error) {
        console.log(error);
        if( isAxiosError(error) && error.response ) throw new Error(error.response.data.error);
    }
}

export async function getUser() {
    try {
        const url = `/auth/user`;
        const { data } = await api<User>(url);
        return data;
    } catch (error) {
        console.log(error);
        if( isAxiosError(error) && error.response ) throw new Error(error.response.data.error);
    }
}

export async function checkPassword(formData: CheckUserPassword) {
    try {
        const url = `/auth/check-password`;
        const { data } = await api.post<ApiResponse>(url, formData);
        return data;
    } catch (error) {
        if( isAxiosError(error) && error.response ) throw new Error(error.response.data.error);
    }
}