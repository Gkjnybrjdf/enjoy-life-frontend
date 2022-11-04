import {createRouter, createWebHistory} from 'vue-router'
import TaskView from "@/views/TaskView";

const routes = [
    {
        path: "/",
        component: TaskView
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
