<template>
<PageLayout page-title="Patient en urgence">

  <section class="card">
    <div class="card-body">

      <DataTable :ref="dt" :value="consultations" :loading="isFecting">
        <template #header>
          <div class="d-flex justify-content-between">
            <div>

            </div>
            <div>
              <Button size="small" severity="secondary" @click="exportData()">Exporter</Button>
              <Button class="ml-1" size="small" @click="goTo('/new-urgence')">
                <span class="ft-plus"></span>
                Ajouter
              </Button>
            </div>
          </div>
        </template>
        <template #empty>
          <div class="d-flex justify-content-center align-items-center" style="height: 100px">

            <h4 class="text-muted">Aucun patient en urgence</h4>
          </div>
        </template>
        <Column field="patient.code_patient" header="Code Patient"></Column>
        <Column field="patient.nom" header="Nom"></Column>
        <Column field="patient.prenoms" header="Prénoms"></Column>
        <Column field="patient.contact" header="Contact"></Column>
        <Column header="Actions">
          <template #body="slotProp">
            <Menu ref="menu" :id="'overlay_menu_'" :model="menuOptions" :popup="true" />
            <router-link class="p-button p-button-sm mr-2" size="small" :to="'/dossier/'+slotProp.data.patient.id">
              <span class="ft ft-folder"></span>
              <span class="ml-1">Dossier</span>
            </router-link>
            <Button size="small">Retabli</Button>
            <Button size="small"  severity="danger">Déces</Button>
          </template>
        </Column>
      </DataTable>
    </div>
  </section>

</PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
import DataTable  from "primevue/datatable";
import Column  from "primevue/column";
import {usePatientStore} from "../../stores/patient.js";
import {ref} from "vue";
import {useRouter} from "vue-router";
import useMyFetch from "../../compoables/useMyFetch.js";
import {PrimeIcons} from "primevue/api";
import Menu from "primevue/menu"


const patientStore = usePatientStore();
const {data: consultations, isFetching} = useMyFetch('consultations_urgence/').json()
const dt = ref()
const router = useRouter()
const goTo = (path) => router.push(path)

const showConstateForm = ref(false)
const menuOptions = ref([
  {
    label: 'Constantes',
    icon: PrimeIcons.PLUS,
    command: ()=>{
      showConstanteForm.value = true
    }
  },
])
const toggleMenu = (event, data) => {
  selectedItem.value = data
  menu.value.toggle(event);
}

const exportData = () => {
  dt.value.exportCSV();
};
</script>

<style scoped>

</style>
