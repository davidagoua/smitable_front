import {defineStore} from "pinia";


export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        token: null,
        user: null,
    }),
    getters: {
        isLoggedIn: (state) => state.token !== null,
        isAdmin: (state) => state.user?.role === 0,
        isMedecin: (state) => state.user?.role === 10,
        isInfirmier: (state) => state.user?.role === 20,
        isSaisir: (state) => state.user?.role === 30,
        isHospitalisation: (state) => state.user?.role === 40,
        isConsultation: (state) => state.user?.role === 50,
        isLaboratoire: (state) => state.user?.role === 60,
        isPharmacie: (state) => state.user?.role === 70,
    },
    actions: {
        login(token, user) {
            this.token = token;
            this.user = user;
        },
        hasPermission(permission) {
            return this.user?.permissions.includes(permission);
        }
    },
    persist: true
})
