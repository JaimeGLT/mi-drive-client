import axios from 'axios'

interface LoginCredentials {
  identifier: string;
  password: string;
}

export const loginService = async (credentials: LoginCredentials) => {
    const response = await axios.post(import.meta.env.VITE_API_URL + "/api/auth/login", credentials);
    return response.data;

}