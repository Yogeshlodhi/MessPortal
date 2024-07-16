import axios from "axios";

const API_URL = import.meta.env.VITE_API;

const getMessInfoService = async ({ token, adminType }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }

    const response = await axios.get(`${API_URL}/messInfo`, config);
    return response.data;
}

const addContactService = async ({ messId, contact, token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(`${API_URL}/addContact/${messId}`, contact, config);
    return response.data;
};

// const addContactService = async (token, id, contact) => {
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         }
//     }

//     const response = await axios.get(`${API_URL}/addContact/${id}`, contact, config);
//     return response.data;
// }

const updateContactService = async ({ messId, contactId, updatedContact, token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(`${API_URL}updateContact/${messId}`, { contactId, ...updatedContact }, config);
    return response.data;
};

const messInfoService = {
    getMessInfoService,
    addContactService,
    updateContactService
}

export default messInfoService;