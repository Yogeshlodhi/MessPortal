import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const register = async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
}

const login = async (data) => {
    const response = await axios.post(`${API_URL}/login`, data,{ withCredentials: true});
    return response.data;
}

const update = async (data) => {
    const response = await axios.put(`${API_URL}`, data, {withCredentials: true});
    return response.data;
}

const logout = async () => {
    const response = await axios.get(`${API_URL}/logout`, {withCredentials: true});
    localStorage.removeItem('student');
    return response.data;
}

const authService = {
    register,
    login,
    logout,
    update,
}

export default authService