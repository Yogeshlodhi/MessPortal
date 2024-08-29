import axios from 'axios';

// const API_URL = 'http://localhost:4000/api/admin/';
const API_URL = import.meta.env.VITE_ADMIN_API

const register = async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
}

const addAdmin = async (data) => {
    const response = await axios.post(`${API_URL}addAdmin`, data, {withCredentials: true});
    return response.data;
}

const login = async (data) => {
    const response = await axios.post(`${API_URL}login`, data, {withCredentials: true});
    return response.data;
}

const logout = async () => {
    const response = await axios.get(`${API_URL}logout`, {withCredentials: true});
    localStorage.removeItem('admin');
    return response.data;
}



const authService = {
    login,
    logout,
    register,
    addAdmin
}

export default authService;