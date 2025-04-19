import axios from "axios";

// const API_URL = 'http://localhost:4000/api/admin/';
const API_URL = import.meta.env.VITE_ADMIN_API;

const getStudList = async () => {
    const response = await axios.get(`${API_URL}students_list`, { withCredentials: true });
    return response.data;
}

const singleStudent = async (emailId) => {
    const config = {
        params: { emailId }
    };
    const response = await axios.get(`${API_URL}student_profile`, config, { withCredentials: true });
    return response.data;
}

const studentService = {
    getStudList,
    singleStudent,
}

export default studentService