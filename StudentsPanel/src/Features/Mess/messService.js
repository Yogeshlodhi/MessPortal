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
    // console.log(response);
    return response.data;
}

const postFeedback = async (token, feedbackData) => {
    const formData = new FormData();

    // Construct FormData manually
    for (let key in feedbackData) {
        if (key === 'image') {
            formData.append(key, feedbackData[key]);
        } else {
            formData.set(key, feedbackData[key]);
        }
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(`${API_URL}/submitFeedback`, feedbackData, config);

    return response.data;
}

const postComplaint = async (token, complaintData) => {
    const formData = new FormData();

    // Construct FormData manually
    for (let key in complaintData) {
        if (key === 'image') {
            formData.append(key, complaintData[key]);
        } else {
            formData.set(key, complaintData[key]);
        }
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(`${API_URL}/raise_complaint`, complaintData, config);

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