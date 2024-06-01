import axios from 'axios';

const API_URL = 'http://localhost:4000/api/admin';

const getMenu = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/getMenu`);
    return response.data.data[0];
}

const updateMenuService = async (month, updatedMenu) => {
    const response = await axios.put(`${API_URL}/menu/${month}`, updatedMenu);
    return response.data.data;
}

const menuService = {
    getMenu,
    updateMenuService,
}

export default menuService;