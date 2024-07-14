import axios from 'axios';
const API_URL = 'http://localhost:4000/api/student'

const register = async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
}

const login = async (data) => {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
}

const update = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(data)
    const response = await axios.put(`${API_URL}`, data, config);
    return response.data;
}

const updateImage = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(`${API_URL}/updateImage`, data, config);
    return response.data;
}

const logout = () => {
    localStorage.removeItem('student');
}

const authService = {
    register,
    login,
    logout,
    update,
    updateImage
}

export default authService