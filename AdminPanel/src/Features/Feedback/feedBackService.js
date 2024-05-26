import axios from 'axios';

const API_URL = 'http://localhost:4000/api/admin';

const getAllFeedback = async () => {
    const response = await axios.get(`${API_URL}/feedback_list`);
    return response.data.data;
}

const feedBackService = {
    getAllFeedback,
}

export default feedBackService;

