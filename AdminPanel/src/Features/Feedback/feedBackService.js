import axios from 'axios';

const API_URL = 'http://localhost:4000/api/admin';

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

const feedBackService = {
    getAllFeedback,
}

export default feedBackService;

