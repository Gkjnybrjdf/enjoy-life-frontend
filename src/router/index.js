import {createRouter, createWebHistory} from 'vue-router'
import TaskView from "@/views/TaskView";
import CategoryView from "@/views/CategoryView";

const routes = [
    {
        path: "/",
        component: TaskView
    },
    {
        path: "/category",
        component: CategoryView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
