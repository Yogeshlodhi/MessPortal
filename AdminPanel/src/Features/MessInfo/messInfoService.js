import axios from "axios";

const API_URL = import.meta.env.VITE_ADMIN_API;

const getMessInfoService = async () => {
    const response = await axios.get(`${API_URL}/messInfo`, {withCredentials: true});
    return response.data;
}

const addContactService = async (contact) => {
    const {id} = contact;
    const response = await axios.post(`${API_URL}/messInfo/addContact/${id}`, contact, {withCredentials: true});
    return response.data;
};

const addInfo = async (info) => {
    const response = await axios.post(`${API_URL}/messInfo`, info,{withCredentials: true});
    return response.data;
};

const updateInfo = async(id, updatedInfo) => {
    const response = await axios.put(`${API_URL}/messInfo/${id}`, updatedInfo, {withCredentials: true});
    return response.data;
}


const updateContactService = async ({ messId, contactId, updatedContact }) => {
    const response = await axios.put(`${API_URL}/updateContact/${messId}`, { contactId, ...updatedContact }, {withCredentials: true});
    return response.data;
};

const messInfoService = {
    getMessInfoService,
    addContactService,
    updateContactService,
    addInfo,
    updateInfo
}

export default messInfoService;