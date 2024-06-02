import axios from 'axios';

const API_URL = 'http://localhost:4000/api/admin/announcement';

const getAnnouncement = async (token, adminType) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            // 'adminRole': adminType
        }
    };
    const response = await axios.get(API_URL, config);
    return response.data;
}

const addAnnouncement = async (announcement, token, adminType) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            // 'adminRole': adminType
        }
    };
    const response = await axios.post(API_URL, announcement, config);
    return response.data;
}

const deleteAnnouncement = async (id, token, adminType) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            // 'adminRole': adminType
        }
    };
    const response = await axios.delete(`${API_URL}/${id}`, config);
    // return id; // Return the ID of the deleted announcement
    return response.data;
}

const announceService = {
    getAnnouncement,
    addAnnouncement,
    deleteAnnouncement
}

export default announceService;