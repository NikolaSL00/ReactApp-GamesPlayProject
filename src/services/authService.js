import * as request from "./util/requester"
import { LOCAL_STORAGE_KEY } from '../config/constants';


const baseUrl = 'http://localhost:3030/users';

export const login = (loginData) =>
    request.post(`${baseUrl}/login`, loginData);

export const register = (registerData) =>
    request.post(`${baseUrl}/register`, registerData);

export const logout = async (accessToken) => {
    try {
        const response = await fetch(`${baseUrl}/logout`, {
            headers: {
                'X-Authorization': accessToken
            }
        });
        // localStorage.removeItem(LOCAL_STORAGE_KEY);

        return response;
    } catch (error) {
        console.error(error);
    }
};