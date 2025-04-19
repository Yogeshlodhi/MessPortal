import axios from 'axios';

// const API_URL = 'http://localhost:4000/api/admin';
const API_URL = import.meta.env.VITE_ADMIN_API

const getComplaints = async () => {
    const response = await axios.get(`${API_URL}/getComplaints`, {withCredentials: true});
    return response.data;
}

const deleteComplaint = async (complaintId) => {
    const response = await axios.delete(`${API_URL}/complaints/${complaintId}`, {withCredentials: true});
    return response.data;
}


const complaintService = {
    getComplaints,
    deleteComplaint
}

export default complaintService