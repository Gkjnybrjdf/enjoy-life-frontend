import axios from "axios";

const protocol = 'http'
const host = 'localhost'
const port = 8080

const url = `${protocol}://${host}:${port}`

export async function getFilteredTask(resource, data) {
    try {
        const response = await axios.post(`${url}${resource}`, data)
        return response.data
    } catch (e) {
        alert("Ошибка")
    }
}

export async function saveTask(resource, data) {
    try {
        const response = await axios.post(`${url}${resource}`, data)
        return response.data
    } catch (e) {
        alert("Ошибка")
    }
}

export async function updateTask(resource, data) {
    try {
        const response = await axios.put(`${url}${resource}`, data)
        return response.data
    } catch (e) {
        alert("Ошибка")
    }
}

export async function deleteTask(resource) {
    try {
        const response = await axios.delete(`${url}${resource}`)
        return response.data
    } catch (e) {
        alert("Ошибка")
    }
}

export async function saveChildTask(resource, data) {
    try {
        const response = await axios.post(`${url}${resource}`, data)
        return response.data
    } catch (e) {
        alert("Ошибка")
    }
}