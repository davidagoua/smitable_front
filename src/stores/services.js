import {defineStore} from 'pinia'
import useMyFetch from "../compoables/useMyFetch.js";

export const useServiceStore = defineStore('service', {
    persist: true,
    state: () => ({
      services: [],
    }),
    getters: {},
    actions: {
        async getServices() {
            const {data: services} = await useMyFetch('services/').json();
            this.services = services;
        },
        incrementServiceCount(service) {
            const only = this.services.find(s => s.nom === service.nom);
            only.consultation_count += 1;
        }
    }
})
