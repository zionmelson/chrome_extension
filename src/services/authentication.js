import axios from 'axios';
import endpoints from './endpoint.json';
import { HttpStatusCode } from 'axios';

const appUrl = process.env.REACT_APP_API_URL;

export const userLogin = async (username, password) => {
    const result = await axios.post(
        `${appUrl}${endpoints.POST_MAINAPP_USER_LOGIN}`, 
        {
            email: username,
            password: password
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    if (result.status === HttpStatusCode.Ok) {
        return result.data.tokens;
    }
    return false;
}


export const userRegister = async (username, password) => {
    const result = await axios.post(
        `${appUrl}${endpoints.POST_MAINAPP_USER_REGISTER}`, 
        {
            email: username,
            password: password
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    if (result.status === HttpStatusCode.Ok) {
        const data = await axios.post(
            `${appUrl}${endpoints.POST_MAINAPP_USER_LOGIN}`, 
            {
                email: username,
                password: password
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return data.data.tokens;
    }
    return false;
}