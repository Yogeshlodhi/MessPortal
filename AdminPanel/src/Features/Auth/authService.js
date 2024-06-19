import axios from 'axios';

const API_URL = 'http://localhost:4000/api/admin';

const login = async (data) => {
    const response = await axios.post(`${API_URL}/login`, data);
    if(response.data && response.data.data){
        localStorage.setItem('admin', JSON.stringify(response.data.data));
        return response.data.data;
    }
}

const logout = () => {
    localStorage.removeItem('admin');
}



const authService = {
    login,
    logout
}

export default authService;