import useAxios from "@/hooks/useAxios";

export const userModule = {
    state: () => ({
        isAuth: false,
        user: undefined,
        roles: undefined
    }),
    getters: {},
    mutations: {
        setIsAuth(state, isAuth) {
            state.isAuth = isAuth
        },
        setUser(state, user) {
            state.user = user
        },
        setRoles(state, roles) {
            state.roles = roles
        }
    },
    actions: {
        getIsAuth({state, commit}) {
            useAxios.get("/api/profile/current")
                .then(_user => {
                    commit('setUser', _user)
                    commit('setIsAuth', true)
                    commit('setRoles', _user.roles.map(role => role.name))
                })
        }
    }
}