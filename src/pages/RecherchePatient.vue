<template>
<PageLayout page-title="Recherche Global" >
<section class="card">
  <div class="card-body">
    <div class="d-flex mb-1 justify-content-between">
      <div></div>
      <div>
        <Button class="ml-1" size="small" @click="goTo('/new-patient')">
          <span class="ft-plus"></span>
          Ajouter
        </Button>
      </div>
    </div>
    <DataTable :filters="filters" :value="patients" data-key="id" :selection="selectedPatient"   :loading="patientLoading">
      <template #header>
        <div class="d-flex justify-content-between">
          <div></div>
          <div class="d-flex">
            <Button  outlined icon="pi pi-filter" class=" mr-2" />
            <InputText v-model="filters.global.value" placeholder="Recherche Global" class="mr-1" />
            <Button @click="search" icon="pi pi-search" />
          </div>
        </div>
      </template>

      <Column selection-mode="multiple" />
      <Column field="code_patient" header="Code Patient">

      </Column>
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
import InputText from "primevue/inputtext";
import {useRouter} from "vue-router";


const router = useRouter();
const toast = useToast()
const {data: patients, loading: patientLoading, statusCode, onFetchError: onPatientFetchError } = useMyFetch('patients/').json()

onPatientFetchError((error)=>{

    toast.add({
      severity: 'error',
      detail: error
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
const goTo = (path) => {
  router.push(path);
};



</script>

<style scoped>

</style>
