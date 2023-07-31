<template>
<PageLayout page-title="Patient en hospitalisation">
<section>
  <DataTable
    :value="hospitalisations"
  >
    <template #header>
      <div class="d-flex justify-content-between">
        <div></div>
        <div class="d-flex">
          <Button  outlined icon="pi pi-filter" class=" mr-2" />
          <InputText placeholder="Recherche Global" class="mr-1" />
          <Button  icon="pi pi-search" />
        </div>
      </div>
    </template>
    <Column header="Date" field="created_at"/>
    <Column header="Code Patient" field="patient.code_patient"/>
    <Column header="Nom" field="patient.nom"/>
    <Column header="Prénoms" field="patient.prenoms"/>
    <Column header="Service" field="service.nom"/>
    <Column header="Status" field="state">
      <template #body="{data}">
        <Tag :value="{
          0: 'En attente',
          1: 'En cours',
          2: 'Refusé'
        }[data.state]" :severity="{
          0: 'default',
          1: 'success',
          2: 'danger'
        }[data.state]"></Tag>
      </template>
    </Column>
    <Column header="Actions"  class="d-flex">
      <template #body="{data}">
        <Button size="small" @click="goTo('/dossier/'+data.patient.id)">
          <span class="ft ft-folder"></span>
          <span class="ml-1">Dossier</span>
        </Button>
        <div v-show="data.state === 0">
          <Button size="small" class="ml-1" @click="showUniteForm(data)">Valider</Button>
          <Button size="small" severity="danger">Rejeter</Button>
        </div>
      </template>
    </Column>
  </DataTable>

  <Dialog header="Attribuer une chambre" v-model:visible="isUniteForm" :style="{width: '25vw'}">
    <div>
      <label for="">Box Libre</label><br>
      <Dropdown v-model="selected.unite" class="w-100" :options="boxes" option-value="id" :option-label="'nom'"></Dropdown>
      <p class="text-right mt-2 ">
        <Button @click="submitUniteForm">Enregistrer</Button>
      </p>
    </div>
  </Dialog>
</section>
</PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import useMyFetch from "../../compoables/useMyFetch.js";
import InputText from "primevue/inputtext";
import Tag from "primevue/tag";
import {ref, computed} from 'vue'
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import {useRouter} from 'vue-router'
import {useToast} from "primevue/usetoast";



const toast = useToast()

const {data: hospitalisations, loading} = useMyFetch('hospitalisations/').json()
const selected = ref()
const router = useRouter()
const isUniteForm = ref(false)
const {data: boxes} = useMyFetch("boxes/").json()
const showUniteForm = (hospi)=>{
  isUniteForm.value = true
  selected.value = hospi
}
const submitUniteForm = ()=>{
  console.log(selected)
  selected.value.state = 1
  let {data} = useMyFetch('hospitalisations/'+selected.value.id+'/').put(selected.value).json()
  selected.value = null
  isUniteForm.value = false
  toast.add({
    severity: "success",
    summary: "Succès",
    detail: "Chambre attribué au patient",
    life: 3000,
  });
}
const goTo = (path)=>{
  router.push(path)
}
</script>

<style scoped>

</style>
