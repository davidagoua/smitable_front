<template>
<div>
  <Button text class="p-button-text" @click="togglePanel" :aria-controls="'general_options_'+patient.id">
    <span :id="'general_options_'+patient.id" class="la la-ellipsis-v"></span>
  </Button>
  <Menu :model="options" :popup="true" ref="panel"></Menu>

  <Dialog modal v-model:visible="showRdvForm" @hide="closeDialog">
    <RdvForm @close-dialog="closeDialog" :patient="props.patient"></RdvForm>
  </Dialog>

  <Dialog modal v-model:visible="showTestRapideForm" @hide="closeDialog">
    <TestRapideForm  @close-dialog="closeDialog" :patient="props.patient"></TestRapideForm>
  </Dialog>
</div>
</template>

<script setup>
import Button from "primevue/button";
import Menu  from "primevue/menu";
import {ref, defineProps, provide, toRaw} from "vue";
import {PrimeIcons} from "primevue/api";
import {useDialog} from "primevue/usedialog";
import RdvForm from "./RdvForm.vue";
import TestRapideForm from "./TestRapideForm.vue";
import Dialog from "primevue/dialog";
import useMyFetch from "../compoables/useMyFetch.js";
import {useToast} from "primevue/usetoast";


const props = defineProps({
  patient: {
    type: Object,
    default: () => {}
  }
})
const toast = useToast()
const dialog = useDialog()
const showTestRapideForm = ref(false)
const showRdvForm = ref(false)
const panel = ref()


const options = ref([
  {
    label: 'Rendez-vous',
    icon: 'pi pi-calendar',
    command: (event) => {
      showRdvForm.value = true
    },
  },
  {
    label: 'Attente',
    icon: PrimeIcons.CLOCK,
    command: (event) => {
      createConsultation(event)
    }
  },
  {
    label: 'Urgence',
    icon: 'la la-ambulance',
    command: (event) => {
      createUrgence(event)
    }
  },
])

const togglePanel = (event, patient) => {
  panel.value.toggle(event)
}

const closeDialog = ()=>{
  showRdvForm.value = false
  showTestRapideForm.value = false
}

const createConsultation = (event) => {
  const {onFetchResponse} = useMyFetch('consultations/').post({
    patient_id: props.patient.id,
    date: new Date(),
    motif: 'Consultation',
    service_id: null,
    status: 0
  }).json()

  onFetchResponse((response)=>{
    if(response.ok){
      toast.add({severity:'success', summary: 'Succès', detail: "Patient enregistré en salle d'attente", life: 3000});
      dialog.hide()
    }else{
      toast.add({severity:'error', summary: 'Erreur', detail: 'Erreur lors de la création de la consultation', life: 3000});
    }
  })
}

const createUrgence = (event)=>{
  const {onFetchResponse} = useMyFetch('consultations/').post({
    patient_id: props.patient.id,
    date: new Date(),
    mode_entree: 'Urgence',
    service_id: null,
    status: 20
  }).json()

  onFetchResponse((response)=>{
    if(response.ok){
      toast.add({severity:'success', summary: 'Succès', detail: "Patient enregistré en urgence", life: 3000});
      dialog.hide()
    }else{
      toast.add({severity:'error', summary: 'Erreur', detail: 'Erreur lors de la création de la consultation', life: 3000});
    }
  })
}
</script>

<style scoped>

</style>
