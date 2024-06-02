import axios from "axios";

const API_URL = 'http://localhost:4000/api/admin/';

const getStudList = async ({ token, adminType }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            // 'adminRole': adminType
        }
    };
    const response = await axios.get(`${API_URL}students_list`, config);
    return response.data;
}

const singleStudent = async (emailId, token, adminType) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            // 'adminRole': adminType // Uncomment if needed
        },
        params: {
            emailId
        }
    };
    const response = await axios.get(`${API_URL}student_profile`, config);
    return response.data;
}

const studentService = {
    getStudList,
    singleStudent,
}

export default studentService