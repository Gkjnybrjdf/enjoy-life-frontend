import axios from "axios";
import backend from "@/hooks/backend";

export default {
    async get(resource) {
        try {
            return (await axios.get(`${backend.url}${resource}`, {
                withCredentials: true
            })).data
        } catch (e) {
            alert('Ошибка')
        }
    },
    async post(resource, data) {
        try {
            return (await axios.post(`${backend.url}${resource}`, data, {
                withCredentials: true
            })).data
        } catch (e) {
            alert('Ошибка')
        }
    },
    async _post(resource, data) {
        return (await axios.post(`${backend.url}${resource}`, data, {
            withCredentials: true
        })).data
    },
    async put(resource, data) {
        try {
            return (await axios.put(`${backend.url}${resource}`, data, {
                withCredentials: true
            })).data
        } catch (e) {
            alert('Ошибка')
        }
    },
    async delete(resource) {
        try {
            return (await axios.delete(`${backend.url}${resource}`, {
                withCredentials: true
            })).data
        } catch (e) {
            alert('Ошибка')
        }
    }
}