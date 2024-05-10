import axios from "axios";

const API_URL = 'http://localhost:4000/api/student'

const getAnnouncements = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/announcements`, config);
    console.log(response)
    return response.data;
}

const messService = {
    getAnnouncements,
}

export default messService