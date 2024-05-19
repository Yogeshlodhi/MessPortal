import axios from "axios";

const API_URL = 'http://localhost:4000/api/student'

const getAnnouncements = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/announcements`, config);
    return response.data;
}

const getMenu = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/getMenu`, config);
    return response.data;
}

const postFeedback = async (token, feedbackData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(`${API_URL}/submitFeedback`, feedbackData, config);

    return response.data;
}

const messService = {
    getAnnouncements,
    postFeedback,
    getMenu
}

export default messService