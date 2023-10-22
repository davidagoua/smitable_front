import {createGlobalState} from "@vueuse/core";
import {ref} from 'vue'


export const useConstanteForm = createGlobalState(()=>{
    const showConstanteForm = ref(false)
    const selectedItem = ref({})
    let closeDialogCallback = ()=>{}
    let openDialogCallback = ()=>{}
    let submitCallback = ()=>{}
    const selectItem = (item)=>{
        selectedItem.value = item
        showConstanteForm.value = true
        openDialogCallback(item)
    }
    const afterEffect = (value)=>{
        submitCallback(value)
    }
    const onCloseDialog = (func)=>{
        closeDialogCallback = func
    }
    const onSelectItem = (func)=>{
        openDialogCallback = func
    }
    const onSubmit = (func)=>{
        submitCallback = func
    }
    const closeDialog = ()=>{
        showConstanteForm.value = false
        selectedItem.value = {}
        closeDialogCallback()
    }

    return {
        closeDialog, onCloseDialog, selectItem, selectedItem, showConstanteForm, onSelectItem, onSubmit,
        afterEffect
    }
})
