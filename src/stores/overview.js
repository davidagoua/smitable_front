import {createGlobalState} from '@vueuse/core'
import {ref} from "vue";


export const useOverviewState = createGlobalState(() => {
    let selectedPatient = ref({})
    let showSidebar = ref(false)
    return {selectedPatient, showSidebar}
})
