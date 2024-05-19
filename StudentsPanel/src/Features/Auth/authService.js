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

const update = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(`${API_URL}`, data, config);
    // if (response.data && response.data.data) {
    //     localStorage.setItem('student', JSON.stringify(response.data.data));
    // }
    return response.data;
}

const logout = () => {
    localStorage.removeItem('student');
}

const authService = {
    register,
    login,
    logout,
    update
}

export default authService