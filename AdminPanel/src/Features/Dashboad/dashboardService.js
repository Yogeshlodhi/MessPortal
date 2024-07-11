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

const getAllStudents = async ({ token, adminType }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            // 'adminRole': adminType
        }
    };
    const response = await axios.get(`${API_URL}/students_list`, config);
    return response.data;
}

const getAllLeaves = async ({token, adminType}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            // 'adminRole': adminType
        }
    };
    const response = await axios.get(`${API_URL}/leaves_list`, config);
    return response.data;
}


const getAllFeedback = async ({token, adminType}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            // 'adminRole': adminType
        }
    };
    const response = await axios.get(`${API_URL}/feedback_list`, config);
    return response.data.data;
}


const complaintService = {
    getComplaints,
    getAllStudents,
    getAllFeedback,
    getAllLeaves
}

export default complaintService