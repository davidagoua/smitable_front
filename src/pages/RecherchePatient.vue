<template>
<PageLayout page-title="Recherche Global" >
<section class="card">
  <div class="card-body">

    <DataTable :filters="filters" :value="patients" data-key="id" :selection="selectedPatient"   :loading="patientLoading">
      <Column selection-mode="multiple" />
      <Column field="code_patient" header="Code Patient"></Column>
      <Column field="nom" header="Nom"></Column>
      <Column field="prenoms" header="Prénoms"></Column>
      <Column field="contact" header="Contact"></Column>
      <Column header="Actions">
        <template class="d-flex" #body="slotProp">
          <div class="d-flex">
            <GeneralOptions :key="slotProp.data.id" :patient="slotProp.data"/>
            <router-link class="p-button p-button-sm" size="small" :to="'/dossier/'+slotProp.data.id">
              <span class="ft ft-folder"></span>
              <span class="ml-1">Dossier</span>
            </router-link>

          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</section>

</PageLayout>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import {usePatientStore} from "../stores/patient.js";
import PageLayout from "../components/PageLayout.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import GeneralOptions from "../components/GeneralOptions.vue";
import useMyFetch from "../compoables/useMyFetch.js";
import {useToast}  from "primevue/usetoast";
import Dialog from "primevue/dialog";


const toast = useToast()
const patientStore = usePatientStore();
const {data: patients, loading: patientLoading, statusCode, onFetchError: onPatientFetchError } = useMyFetch('patients/').json()

onPatientFetchError((error)=>{

    toast.add({
      severity: 'error',
      message: error
    })
})


const filters = reactive({
  global: {
    value: null,
    matchMode: "contains",
  },
  code_patient: {
    value: null,
    matchMode: "contains",
  },
})
const selectedPatient = ref([]);
const search = ref("");


</script>

<style scoped>

</style>
