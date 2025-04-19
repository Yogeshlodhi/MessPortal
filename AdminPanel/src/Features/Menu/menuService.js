import axios from 'axios';

// const API_URL = 'http://localhost:4000/api/admin';
const API_URL = import.meta.env.VITE_ADMIN_API


const addMenu = async (menuData) => {
    const response = await axios.post(`${API_URL}/menu_upload`, menuData, {withCredentials: true});
    return response.data;
}

const getMenu = async () => {
    const response = await axios.get(`${API_URL}/getMenu`, {withCredentials: true});
    return response.data;
}

const updateMenuService = async (id, updatedMenu) => {
    const response = await axios.put(`${API_URL}/menu/${id}`, updatedMenu, {withCredentials: true});
    return response.data;
}



const menuService = {
    getMenu,
    updateMenuService,
    addMenu,
}

export default menuService;