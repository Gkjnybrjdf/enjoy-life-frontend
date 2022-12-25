import {createRouter, createWebHistory} from 'vue-router'
import TaskView from "@/views/TaskView";
import HomeView from "@/views/HomeView";
import CategoryView from "@/views/CategoryView";
import LoginView from "@/views/LoginView";
import RegistrationView from "@/views/RegistrationView";
import store from "@/store";
import SuccessfulRegistrationView from "@/views/SuccessfulRegistrationView";
import AdminView from "@/views/AdminView";

const routes = [
    {
        path: "/",
        component: HomeView
    },
    {
        path: "/task",
        component: TaskView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/category",
        component: CategoryView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/login",
        component: LoginView
    },
    {
        path: "/registration",
        component: RegistrationView
    },
    {
        path: "/successful_registration",
        component: SuccessfulRegistrationView
    },
    {
        path: "/admin",
        component: AdminView,
        meta: {
            requiresAuth: true,
        }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !store.state.user.isAuth) {
        return {
            path: '/login',
            query: {redirect: to.fullPath},
        }
    }
})

export default router
