import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const apply = async (data) => {
    const response = await axios.post(`${API_URL}/leaveApplication`, data, {withCredentials: true});
    return response.data;
}

const getLeaves = async () => {
    const response = await axios.get(`${API_URL}/leaves`, { withCredentials: true });
    return response.data;
}


const leaveService = {
    apply,
    getLeaves
}

export default leaveService