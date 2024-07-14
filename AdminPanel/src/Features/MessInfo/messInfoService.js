import axios from "axios";

const API_URL = import.meta.env.VITE_API;

const getMessInfoService = async ({token, adminType}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }

    const response = await axios.get(`${API_URL}/messInfo`, config);
    return response.data;
}

const messInfoService = {
    getMessInfoService,
}

export default messInfoService;