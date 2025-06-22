import axios from 'axios';

// const API_URL = 'http://localhost:4000/api/admin/announcement';
const API_URL = import.meta.env.VITE_ADMIN_API;

const getAnnouncement = async () => {
    const response = await axios.get(`${API_URL}/announcement`, {withCredentials: true});
    return response.data;
}

const addAnnouncement = async (announcement) => {
    const response = await axios.post(`${API_URL}/announcement`, announcement, {withCredentials: true});
    return response.data;
}

const deleteAnnouncement = async (id) => {
    const response = await axios.delete(`${API_URL}/announcement/${id}`, {withCredentials: true});
    return response.data;
}

const announceService = {
    getAnnouncement,
    addAnnouncement,
    deleteAnnouncement
}

export default announceService;