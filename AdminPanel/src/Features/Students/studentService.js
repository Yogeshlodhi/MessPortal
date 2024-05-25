import axios from "axios";

const API_URL = 'http://localhost:4000/api/admin/';

const getStudList = async () => {
    const response = await axios.get(`${API_URL}students_list`);
    // console.log(response);
    return response.data;
}

const singleStudent = async (emailId) => {

    const response = await axios.get(`${API_URL}student_profile`,{
        params: { emailId }
    });
    return response.data;
}

const studentService = {
    getStudList,
    singleStudent,
}

export default studentService