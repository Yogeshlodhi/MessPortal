import axios from "axios";

// const API_URL = 'http://localhost:4000/api/admin'
const API_URL = import.meta.env.VITE_ADMIN_API

const getAllLeaves = async () => {
    const response = await axios.get(`${API_URL}/leaves_list`, {withCredentials: true});
    return response.data;
}

const getTodayLeaves = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            // 'adminRole': adminType
        }
    };
    const response = await axios.get(`${API_URL}/filtered_leaves`, config);
    return response.data;
}


const leaveAction = async (id, actionData) => {
    const response = await axios.put(`${API_URL}/leaves/takeAction/${id}`, { status: actionData }, {withCredentials: true});
    return response.data;
}

const leaveService = {
    getAllLeaves,
    leaveAction,
    getTodayLeaves
}

export default leaveService;