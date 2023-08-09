import {createGlobalState} from '@vueuse/core'
import {ref} from "vue";


export const useOverviewState = createGlobalState(() => {
    let selectedPatient = ref({})
    let showSidebar = ref(false)
    let isShowed = ref(false)
    let selectPatient = (patient)=>{
        selectedPatient.value = patient
        isShowed.value = true
    }
    return {selectedPatient, showSidebar, isShowed, selectPatient}
})
