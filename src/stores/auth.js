import {defineStore} from "pinia";


export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        token: null,
        user: null,

    }),
    getters: {
        isLoggedIn: (state) => !!state.token,
        isAdmin: (state) => state.user?.role === 'admin',
    },
    actions: {
        login(token, user) {
            this.token = token;
            this.user = user;
        }
    }
})
