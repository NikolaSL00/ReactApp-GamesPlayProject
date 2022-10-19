import { LOCAL_STORAGE_KEY } from "../../config/constants";

const request = async (method, url, data) => {
    try {
        const authData = localStorage.getItem(LOCAL_STORAGE_KEY);
        const auth = JSON.parse(authData || '{}');
        let headers = {};
        if (auth.accessToken) {
            headers['X-Authorization'] = auth.accessToken;
        }

        let buildRequest;

        if (method === "GET") {
            buildRequest = fetch(url, { headers });
        } else {
            buildRequest = fetch(url, {
                method,
                headers: {
                    ...headers,
                    'Content-Type': 'Application/json',
                },
                body: JSON.stringify(data),
            });
        }

        const response = await buildRequest;

        const result = await response.json();
        return result;
    } catch (error) {

    }
};

export const get = request.bind({}, "GET");
export const post = request.bind({}, "POST");
export const put = request.bind({}, "PUT");
export const patch = request.bind({}, "PATCH");
export const del = request.bind({}, "DELETE");
