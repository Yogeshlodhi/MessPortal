import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const getAnnouncements = async () => {
    const response = await axios.get(`${API_URL}/announcements`,{withCredentials: true});
    return response.data;
}

const getMenu = async () => {
    const response = await axios.get(`${API_URL}/getMenu`, {withCredentials: true});
    return response.data;
}

const postFeedback = async (feedbackData) => {
    const response = await axios.post(`${API_URL}/submitFeedback`, feedbackData, {withCredentials: true});
    return response.data;
}

const postComplaint = async (complaintData) => {
    const response = await axios.post(`${API_URL}/raise_complaint`, complaintData, {withCredentials: true});
    return response.data;
}

const getMessInfoService = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }

    const response = await axios.get(`${API_URL}/messInfo`, config);
    return response.data;
}

const messService = {
    getAnnouncements,
    postFeedback,
    getMenu,
    postComplaint,
    getMessInfoService
}

export default messService