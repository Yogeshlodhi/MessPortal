import axios from 'axios';

const API_URL = 'http://localhost:4000/api/admin';

const getMenu = async ({token, adminType}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            // 'adminRole': adminType
        }
    };
    const response = await axios.get(`${API_URL}/getMenu`, config);
    // console.log(response.data)
    return response.data;
}

const updateMenuService = async (month, updatedMenu, token, adminType) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            // 'adminRole': adminType
        }
    };
    const response = await axios.put(`${API_URL}/menu/${month}`, updatedMenu, config);
    return response.data.data;
}

const menuService = {
    getMenu,
    updateMenuService,
}

export default menuService;