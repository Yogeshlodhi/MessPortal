import axios from "axios";

const API_URL = 'http://localhost:4000/api/admin'

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

const leaveAction = async (token, actionData, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }
    console.log(actionData)
    const response = await axios.put(`${API_URL}/leaves/takeAction/${id}`, {status : actionData}, config);
    return response.data;
}

const leaveService = {
    getAllLeaves,
    leaveAction,
}

export default leaveService;