import axios from 'axios';
const API_URL = 'http://localhost:4000/api/student'

const apply = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(`${API_URL}/leaveApplication`, data, config);
    return response.data;
}

const getLeaves = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/leaves`, config);
    return response.data;
}

const logout = () => {
    localStorage.removeItem('student');
}

const leaveService = {
    apply,
    getLeaves
}

export default leaveService