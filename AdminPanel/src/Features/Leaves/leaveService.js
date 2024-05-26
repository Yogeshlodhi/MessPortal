import axios from "axios";

const API_URL = 'http://localhost:4000/api/admin'

const getAllLeaves = async () => {
    const response = await axios.get(`${API_URL}/leaves_list`);
    return response.data;
}

const leaveService = {
    getAllLeaves,
}

export default leaveService;