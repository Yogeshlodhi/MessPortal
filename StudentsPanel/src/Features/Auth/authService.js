import axios from 'axios';
const API_URL = 'http://localhost:4000/api/student'

const register = async (data) => {
    const response = await axios.post(API_URL, data);
    if(response.data){
        localStorage.setItem('student', JSON.stringify(response.data));
    }
    return response.data;
}

const authService = {
    register
}

export default authService