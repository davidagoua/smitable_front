<template>
<div>
  <div class="row">
    <div class="col-12 mt-1">
      <label for="">Motif du rendez-vous </label>
      <Textarea class="w-100" v-model="rdv.motif" rows="3" cols="30" />
    </div>
    <div class="mt-1 col-md-6">
      <label for="">Date du rendez-vous</label>
      <Calendar class="w-100" v-model="rdv.date" />
    </div>
    <div class="mt-1 col-md-6">
      <label for="">Service</label>
      <Dropdown :options="services" class="w-100" options-value="id" option-label="nom" v-model="rdv.service" />
    </div>
    <div class="mt-1 col-12 text-right">
      <Button @click="submit" label="Enregistrer" />
    </div>
  </div>
</div>
</template>

<script setup>
import {defineProps, reactive, inject, onMounted, onBeforeUnmount, defineEmits} from "vue";
import Textarea from "primevue/textarea";
import Calendar from "primevue/calendar";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import useMyFetch from "../compoables/useMyFetch.js";
import {useDialog} from "primevue/usedialog";
import {useToast} from "primevue/usetoast";



const props = defineProps({
  patient: {
    type: Object,
    required: true
  }
})
const emit = defineEmits()

const toast = useToast()
const {data: services} = useMyFetch('services/').json()

const rdv = reactive({
  date: null,
  motif: null
})
const submit = async ()=>{
  const {onFetchError, onFetchResponse} = useMyFetch('rdv/')
    .post({
      date: rdv.date,
      motif: rdv.motif,
      patient_id: props.patient.id,
      service: rdv.service.id
    })
    .json()

  onFetchResponse((response) => {
    if(response.status === 201){
      toast.add({
        severity: 'success',
        detail: "Rendez-vous enregistré",
        life: 3000
      })
    }else{
      toast.add({
        severity: 'error',
        detail: "Une erreur est survenu",
        life: 3000
      })
    }
  })
  emit('close-dialog')
}


</script>

<style scoped>

</style>
