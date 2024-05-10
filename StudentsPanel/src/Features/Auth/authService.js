import axios from 'axios';
const API_URL = 'http://localhost:4000/api/student'

const register = async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
}

const login = async (data) => {
    const response = await axios.post(`${API_URL}/login`, data);
    if(response.data && response.data.data){
        localStorage.setItem('student', JSON.stringify(response.data.data));
        return response.data.data;
    }
}

const logout = () => {
    localStorage.removeItem('student');
}

const authService = {
    register,
    login,
    logout
}

export default authService