import axios from 'axios';

const API_URL = 'http://localhost:4000/api/admin';


const addMenu = async (token, menuData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    };
    const response = await axios.post(`${API_URL}/menu_upload`, menuData, config);
    return response.data;
}

const getMenu = async ({ token, adminType }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            // 'adminRole': adminType
        }
    };
    const response = await axios.get(`${API_URL}/getMenu`, config);
    return response.data;
}

const updateMenuService = async (id, updatedMenu, token, adminType) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            // 'adminRole': adminType
        }
    };
    const response = await axios.put(`${API_URL}/menu/${id}`, updatedMenu, config);
    // const response = await axios.put(`${API_URL}/menu/${month}`, updatedMenu, config);
    // console.log()
    return response.data;
}



const menuService = {
    getMenu,
    updateMenuService,
    addMenu,
}

export default menuService;