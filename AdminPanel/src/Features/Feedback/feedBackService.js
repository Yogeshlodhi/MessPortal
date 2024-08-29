import axios from 'axios';

// const API_URL = 'http://localhost:4000/api/admin';
const API_URL = import.meta.env.VITE_ADMIN_API;

const getAllFeedback = async () => {
    const response = await axios.get(`${API_URL}/feedback_list`, {withCredentials: true});
    return response.data;
}

const getTodayFeedbacks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            // 'adminRole': adminType
        }
    };
    const response = await axios.get(`${API_URL}/filtered_feedbacks`, config);
    return response.data;
}

const feedBackService = {
    getAllFeedback,
    getTodayFeedbacks
}

export default feedBackService;

