import axios from 'axios';

const API_URL = 'http://localhost:4000/api/admin';

const getComplaints = async (token, adminType) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            // 'adminRole': adminType
        }
    };
    const response = await axios.get(`${API_URL}/getComplaints`, config);
    return response.data.data;
}

const complaintService =  {
    getComplaints,
}

export default complaintService