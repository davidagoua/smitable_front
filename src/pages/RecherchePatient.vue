<template>
  <PageLayout page-title="Recherche Global">
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
        <div>
          <form @submit.prevent="submit" class="row mb-2 align-items-end">
            <div class="col-md-4 mt-1">
              <label for="">Nom</label><br>
              <InputText class="w-100" v-model="searchForm.nom"/>
            </div>
            <div class="col-md-4 mt-1">
              <label for="">Prénoms</label><br>
              <InputText class="w-100" v-model="searchForm.prenoms"/>
            </div>
            <div class="col-md-4 mt-1">
              <label for="">Téléphone</label><br>
              <InputNumber class="w-100" v-model="searchForm.contact"/>
            </div>
            <div class="col-md-4 mt-1">
              <label for="">Code patient</label><br>
              <InputText class="w-100" v-model="searchForm.code_patient"/>
            </div>
            <div class="col-md-4 mt-1">
              <label for="">Date de naissance</label><br>
              <InputText class="w-100" type="date" v-model="searchForm.date_naissance"/>
            </div>
            <div class="col-md-4 mt-1 text-right">
              <Button type="submit">
                <i class="pi pi-search mr-3"></i>
                Rechercher
              </Button>
            </div>
          </form>
        </div>
        <DataTable
          :filters="filters"
          :value="patients"
          paginator :rows="rowsPerPage" :rows-per-page-options="[20,50,100,300]"
          data-key="id"
          :selection="selectedPatient"
          :loading="patientLoading">
          <template #loading>
            <div class="text-center">Chargement des resultats</div>
          </template>

          <Column selection-mode="multiple"/>
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
import {ref, onMounted, reactive, computed, watch} from "vue";
import {usePatientStore} from "../stores/patient.js";
import PageLayout from "../components/PageLayout.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import GeneralOptions from "../components/GeneralOptions.vue";
import useMyFetch from "../compoables/useMyFetch.js";
import {useToast} from "primevue/usetoast";
import InputText from "primevue/inputtext";
import {useRouter} from "vue-router";
import InputNumber from 'primevue/inputnumber';


const router = useRouter();
const toast = useToast()
const rowsPerPage = ref(20)

let {
  data: patients,
  isFetching: patientLoading,
  statusCode,
  onFetchError: onPatientFetchError
} = await useMyFetch('patients/').json()

onPatientFetchError((error) => {
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


const searchForm = reactive({})

const submit = async () => {
  try {
    let querypath = `code_patient=${searchForm.code_patient ?? ''}&nom=${searchForm.nom ?? ''}&prenoms=${searchForm.prenoms ?? ''}&contact=${searchForm.contact ?? ''}`
    let {data, isFetching, isFinished, error} = await useMyFetch('patients/?' + querypath).json()
    patientLoading = isFetching
    if (isFinished.value) {
      patients.value = data.value.results
    }
    if (error.value) {
      toast.add({
        severity: 'error',
        detail: "Error: " + error.value,
        life: 3000
      })
    }
  } catch (e) {
    console.log(e)
  } finally {
    patientLoading.value = false
  }

}

</script>

<style scoped>

</style>
