import {createGlobalState} from '@vueuse/core'
import {ref} from 'vue'
import useMyFetch from "../compoables/useMyFetch.js";

export const useServiceStore = createGlobalState(()=> {
    let services = ref([])
    let getServices = async () =>{
        const {data: services} = await useMyFetch('services/').json();
        this.services.value = services.value;
        console.log(this.services.value)
    }
    let incrementService = (service) =>{
        const only = this.services.value.find(s => s.nom === service.nom)[0];
        only.consultation_count += 1;
    }

    return {services, getServices, incrementService}
})
