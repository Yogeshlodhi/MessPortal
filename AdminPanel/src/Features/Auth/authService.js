import axios from 'axios';

const API_URL = 'http://localhost:4000/api/admin';

const login = async (data) => {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
}

const logout = () => {
    localStorage.clear();
    // localStorage.removeItem('admin');
}



const authService = {
    login,
    logout
}

export default authService;