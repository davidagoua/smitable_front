import {provide, ref, watch} from "vue";
import {useEventBus} from "@vueuse/core";

const useFastView = ()=>{
    const fastViewEvent = useEventBus('fastView')
    const showDialog = ref(false)
    watch(showDialog, (value)=>{
        console.log("show dialog "+ value)
    })

    const close = ()=>{
        showDialog.value = false
    }
    const show = (patient)=>{
        showDialog.value = true
        console.log(patient)
        provide('selectedPatient',patient)
        fastViewEvent.emit('selected')
    }

    return {close, show, showDialog}
}

export default useFastView
