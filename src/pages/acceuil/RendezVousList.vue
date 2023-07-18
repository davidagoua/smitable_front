<template>
<PageLayout page-title="Rendez-vous Programmés">
  <section>
    <DataTable
      :value="rdvs.data"
      :loading="rdvs.loading"
      :globalFilterFields="['patient.nom', 'patient.code_patient']"
    >
      <template #header>
        <div class="d-flex justify-content-between align-items-center">
          <div>

          </div>
          <div>
            <Button outlined size="small">
              <span class="pi pi-filter"></span>
              <span class="ml-1">Filtrer</span>
            </Button>
          </div>
        </div>
      </template>
      <Column selection-mode="multiple"> </Column>
      <Column field="id" header="#ID"></Column>
      <Column field="date" sortable header="Date"></Column>
      <Column field="patient.code_patient" header="Code Patient">

      </Column>
      <Column field="patient.nom" header="Nom"></Column>
      <Column field="patient.prenoms" header="Prenoms"></Column>
      <Column field="patient.contact" header="Contact"></Column>
      <Column field="motif" header="Motif"></Column>
      <Column header="Actions">
        <template #body="slotProps">
          <Button text serverity="secondary" size="small">
            <span class="pi pi-eye"></span>
          </Button>
          <Button text serverity="secondary" size="small">
            <span class="pi pi-pencil"></span>
          </Button>
          <Button text serverity="secondary" size="small">
            <span class="pi pi-trash"></span>
          </Button>
          <router-link class="p-button p-button-sm" size="small" :to="'/dossier/'+slotProps.data.patient.id">
            <span class="ft ft-folder"></span>
            <span class="ml-1">Dossier</span>
          </router-link>
        </template>
      </Column>
    </DataTable>
  </section>
</PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
import {ref, reactive, onMounted} from "vue";
import {usePatientStore} from "../../stores/patient.js";
import {useToast} from "primevue/usetoast";
import DataTable  from "primevue/datatable";
import Column from "primevue/column";
import {useRouter} from "vue-router";

const patientStore = usePatientStore()
const toast = useToast()
const rdvs = reactive({
  data: [],
  loading: false,
  error: false
})

onMounted(async()=>{
  try{
    rdvs.loading = true
    rdvs.data = await patientStore.fetchRdvs()
    console.log(rdvs.data)
  }catch (e) {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Une erreur est survenue lors du chargement des rendez-vous',
      life: 3000
    })
  }finally {
    rdvs.loading = false
  }
})

const router = useRouter()
const goTo = (path) => router.push(path)
</script>

<style scoped>

</style>
