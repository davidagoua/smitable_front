<template>
<PageLayout page-title="Patient en attente">
  <div>
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
        <DataTable
          ref="patientAttenteTable"
          v-model:selection="selectedConsultation"
          :value="consultations"
          :filters="filters"
          filter-display="rows"
          data-key="id"
          paginator filter
          rows="100"
          :globalFilterFields="['patient.nom','patient.prenoms','patient.code_patient']"
        >
          <template #header>
            <div class="d-flex justify-content-between">
              <div>
                <Button size="small" severity="secondary" @click="exportData()">Exporter</Button>
              </div>
              <div class="align-items-center">
                <InputText v-model="filters['global'].value"  placeholder="Recherche Global" />
                <Button  outlined icon="pi pi-filter" size="small" class=" ml-1" />
              </div>
            </div>
          </template>
          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column field="patient.code_patient" header="Code  Patient">
            <template #body="{data}">
              <Button @click="overviewState.selectPatient(data)" :label="data.patient.code_patient" text></Button>
            </template>
          </Column>
          <Column field="created_at" sortable="" header="Date de création">
            <template #body="{data}">
              {{ useDateFormat(data.created_at, 'DD-MM-YYYY HH:mm:ss')}}
            </template>
          </Column>
          <Column field="patient.nom" sortable header="Nom"></Column>
          <Column field="patient.prenoms" header="Prénoms">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
          </Column>
          <Column field="patient.date_naissance" header="Date de naissance"></Column>
          <Column field="service.nom" header="Service"></Column>
          <Column header="Actions">
            <template #body="slotProps">
              <Button @click="goTo('/new-patient/'+slotProps.data.patient.id)" text size="small" icon="pi pi-pencil"></Button>
              <Button size="small" :aria-controls="'overlay_menu_'"  text  @click="toggleMenu($event, slotProps.data)">
                <span class="la la-ellipsis-v"></span>
              </Button>
              <Button size="small" @click="goTo('/dossier/'+slotProps.data.patient.id)">
                <span class="ft ft-folder"></span>
                <span class="ml-1">Dossier</span>
              </Button>
              <Menu ref="menu" :id="'overlay_menu_'" :model="menuOptions" :popup="true" />
            </template>
          </Column>
        </DataTable>
      </div>
    </section>
  </div>

  <Dialog header="Constante" v-if="selectedItem" v-model:visible="showConstanteForm" @hide="closeDialog" :style="{ width: '50vw' }">
    <ConstanteForm @close-dialog="closeDialog" :consultation="selectedItem"/>
  </Dialog>
  <Dialog modal header="Programmer un Rendez-vous" v-model:visible="showRdvForm" @hide="closeDialog" :style="{ width: '50vw' }">
    <RdvForm @close-dialog="closeDialog" :patient="selectedItem.patient"></RdvForm>
  </Dialog>
  <Dialog header="Test rapide" modal v-model:visible="showTestRapideForm" @hide="closeDialog" :style="{ width: '50vw' }">
    <TestRapideForm @close-dialog="closeDialog" :consultation_id="selectedItem.id" :patient="selectedItem.patient"></TestRapideForm>
  </Dialog>
  <Dialog header="Affecter à un service" modal v-model:visible="showServiceForm" @hide="closeDialog" :style="{width: '50vw'}">
    <form @submit.prevent="saveService">
      <div class="d-flex justify-content-center">
        <Dropdown v-model="service" class="w-50" :options="services" option-label="nom" option-value="id"></Dropdown>
        <Button type="submit" label="Enregistrer" class="ml-2"/>
      </div>
    </form>
  </Dialog>
</PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
import {defineProps, onMounted, computed, watch, ref, defineEmits, vShow} from 'vue'
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {storeToRefs}  from "pinia";
import {useDialog} from 'primevue/usedialog'
import {useToast} from 'primevue/usetoast'
import {useConsultationStore} from "../../stores/consultation.js";
import Dialog from "primevue/dialog";
import ConstanteForm from "../../components/ConstanteForm.vue";
import {useRoute, useRouter} from "vue-router";
import Menu from "primevue/menu";
import {PrimeIcons} from 'primevue/api'
import ConstanteView from "../../components/ConstanteView.vue";
import useMyFetch from "../../compoables/useMyFetch.js";
import RdvForm from "../../components/RdvForm.vue";
import TestRapideForm from "../../components/TestRapideForm.vue";
import {useDateFormat} from "@vueuse/core";
import Dropdown from "primevue/dropdown";
import {useServiceStore} from "../../stores/services.js";
import {useOverviewState} from "../../stores/overview.js";

const dialog = useDialog()
const toast = useToast()
const route = useRouter()
const emits = defineEmits(['reload-services'])
const serviceStore = useServiceStore()


const {data: consultations} = useMyFetch('consultations/?status=0').json();
const selectedConsultation = ref([])
const patientAttenteTable = ref()
const menu = ref()
const service = ref([])
const selectedItem = ref({})
const showConstanteForm = ref(false)
const showTestRapideForm = ref(false)
const showServiceForm = ref(false)
const showRdvForm = ref(false)

const menuOptions = ref([
  {
    label: 'Constantes',
    icon: PrimeIcons.PLUS,
    command: ()=>{
      showConstanteForm.value = true
    }
  },
  {
    label: 'Rendez-vous',
    icon: 'pi pi-calendar',
    command: (event) => {
      showRdvForm.value = true
    },
  },
  {
    label: 'Test rapide',
    icon: PrimeIcons.EYE,
    command: (event) => {
      showTestRapideForm.value = true
    }
  },
  {
    label: 'Service',
    icon: PrimeIcons.DATABASE,
    command: (event) => {
      showServiceForm.value = true
    }
  },

])

const services = serviceStore.services
const saveService = (event)=>{
  console.log(service)
  selectedItem.value.service_id = service.value
  const {onFetchResponse} = useMyFetch('consultations/'+selectedItem.value.id+'/').put(selectedItem.value).json()
  onFetchResponse((response)=>{
    if(response.ok){
      toast.add({severity:'success', summary:'Service', detail:'Service enregistré avec succès', life: 3000})

      closeDialog()
    }else{
      toast.add({severity:'error', summary:'Service', detail:"Erreur lors de l'enregistrement du service", life: 3000})
    }
  })
}



const toggleMenu = (event, data) => {
  selectedItem.value = data
  menu.value.toggle(event);
}

const exportData = ()=>{
  patientAttenteTable.value.exportCSV()
}

const goTo = (path)=>{
  route.push(path)
}
const closeDialog = ()=>{
  selectedItem.value = null
  showConstanteForm.value = false
  showRdvForm.value = false
  showTestRapideForm.value = false
  showServiceForm.value = false
}


const filters = ref({
  global: {
    value: '',
    matchMode: 'contains',
  },
})


const overviewState = useOverviewState()
</script>

<style scoped>

</style>
