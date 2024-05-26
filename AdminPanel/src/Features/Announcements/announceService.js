import axios from 'axios';

const API_URL = 'http://localhost:4000/api/admin/announcement';

const getAnnouncement = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

const addAnnouncement = async (announcement) => {
    const response = await axios.post(API_URL, announcement);
    return response.data;
}

const deleteAnnouncement = async (id) => {
    // const response = await axios.delete(`${API_URL}/${id}`)
    // return response.data;
    const response = await axios.delete(`${API_URL}/${id}`);
    // return id; // Return the ID of the deleted announcement
    return response.data;
}

const announceService = {
    getAnnouncement,
    addAnnouncement,
    deleteAnnouncement
}

export default announceService;