import axios from "axios";
import {ref, onMounted} from "vue";

const protocol = 'http'
const host = 'localhost'
const port = 8080

const url = `${protocol}://${host}:${port}`

export function getTask(resource) {
    const tasks = ref([])

    const getting = async () => {
        try {
            const response = await axios.get(`${url}${resource}`)

            tasks.value = response.data.content
        } catch (e) {
            alert("Ошибка")
        }
    }

    onMounted(getting)

    return {
        tasks
    }
}

export async function createTask(resource, data) {
    try {
        const response = await axios.post(`${url}${resource}`, data)
    } catch (e) {
        alert("Ошибка")
    }
}