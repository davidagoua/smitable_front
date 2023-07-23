<template>
<PageLayout page-title="Patient en urgence">

  <section class="card">
    <div class="card-body">
      <DataTable :value="consultations" :loading="loading">
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
import {reactive, computed} from "vue";
import {useRouter} from "vue-router";
import useMyFetch from "../../compoables/useMyFetch.js";


const patientStore = usePatientStore();
const {data: consultations, loading} = useMyFetch('consultations_urgence/').json()

const router = useRouter()
const goTo = (path) => router.push(path)
</script>

<style scoped>

</style>
