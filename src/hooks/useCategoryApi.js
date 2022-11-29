import axios from "axios";

const protocol = 'http'
const host = 'localhost'
const port = 8080

const url = `${protocol}://${host}:${port}`

export async function getCategory(resource) {
    try {
        console.log(`${url}${resource}`)
        const response = await axios.get(`${url}${resource}`)
        return response.data.content
    } catch (e) {
        alert('Ошибка')
    }
}

export async function deleteCategory(resource) {
    try {
        const response = await axios.delete(`${url}${resource}`)
        return response.data
    } catch (e) {
        alert("Ошибка")
    }
}

export async function saveCategory(resource, data) {
    try {
        const response = await axios.post(`${url}${resource}`, data)
        return response.data
    } catch (e) {
        alert("Ошибка")
    }
}

export async function updateCategory(resource, data) {
    try {
        const response = await axios.put(`${url}${resource}`, data)
        return response.data
    } catch (e) {
        alert("Ошибка")
    }
}