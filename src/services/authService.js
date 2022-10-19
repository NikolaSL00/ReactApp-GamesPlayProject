import * as request from "./util/requester"

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
        return response;
    } catch (error) {
        console.error(error);
    }
};