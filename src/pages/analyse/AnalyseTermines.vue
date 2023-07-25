<template>
<PageLayout page-title="Analyses Terminées">
  <section>
    <div class="card">
      <div class="card-body">
        <DataTable
          :value="analyses"
          :loading="loading"
        >
          <Column header="Date" field="created_at"/>
          <Column header="Code Patient" field="patient.code_patient"/>
          <Column header="Code Echantillons" field="code_barre"/>
          <Column header="Service" field="service.nom"/>
          <Column header="actions">
            <template #body="{data}">
              <Button @click="showInformation(data)" size="small" icon="pi pi-eye" class="mr-1"/>
              <Button size="small" icon="pi pi-file"  class="mr-1"/>
              <router-link class="p-button p-button-sm" size="small" :to="'/dossier/'+data.patient.id">
                <span class="ft ft-folder"></span>
                <span class="ml-1">Dossier</span>
              </router-link>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <Dialog :style="{width: '50vw'}" modal header="Resultat analyse" v-model:visible="isShowInformation">
      <div>
        <div>
          <h3>Examen de charge virale</h3>
          <table class="table">
            <tr>
              <td>Type d'examen</td>
              <td>{{ selected.type_analyse}}</td>
            </tr>
            <tr>
              <td>Type de prelevement</td>
              <td>{{ selected.technique_analyse}}</td>
            </tr>
            <tr>
              <td>Etat de l'echantillon</td>
              <td>{{ selected.interpretation.etat}}</td>
            </tr>
            <tr>
              <td>Trousse commerciale</td>
              <td>{{ selected.interpretation.trousse}}</td>
            </tr>
            <tr>
              <td>Methode</td>
              <td>{{ selected.interpretation.methode}}</td>
            </tr>
            <tr>
              <td>Resultats nombre de copies / mL</td>
              <td>{{ selected.interpretation.nombre_copies}}</td>
            </tr>
            <tr>
              <td>Resultat Log copies /mL</td>
              <td>{{ selected.interpretation.log_copies}}</td>
            </tr>
            <tr>
              <td>Suivre</td>
              <td>
                <Checkbox :binary="true" v-model="suivre"/>
              </td>
            </tr>
          </table>
          <p class="mt-2 text-right">
            <Button @click="submit" size="small">Enregistrer</Button>
          </p>
        </div>
      </div>
    </Dialog>
  </section>
</PageLayout>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import PageLayout from "../../components/PageLayout.vue";
import useMyFetch from "../../compoables/useMyFetch.js";
import Checkbox from 'primevue/checkbox';
import {useToast} from "primevue/usetoast";



const toast = useToast()
let isShowInformation = ref(false);
let selected = reactive({})
let suivre = ref(false)

const {data: analyses, loading} = useMyFetch('analyse-patient/?state=2').json()

const showInformation = (analyse)=>{
  selected = analyse
  isShowInformation.value = true
}

const submit = ()=>{
  selected.patient.status = suivre.value ? 1 : 0

  let {data, loading} = useMyFetch('analyse-patient/'+selected.id+'/').put(selected).json()
  let {data: patient} = useMyFetch('suivre/'+selected.patient.id+'/').json()

  toast.add({
    severity: 'success',
    life: 300,
    detail: 'Resultats enregistré'
  })

  isShowInformation.value = false
  selected = null
  suivre.value = false

}
</script>
<style scoped>

</style>
