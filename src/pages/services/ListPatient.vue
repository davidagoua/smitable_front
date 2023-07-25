<template>
<PageLayout :page-title="pageTitle">
  <DataTable :filters="filters" :value="consultations.data" :loading="consultations.loading" data-key="id">
    <template #empty>
      <div class="d-flex justify-content-center align-items-center" style="height: 100px">
        <h4 class="text-muted">Aucune consultation</h4>
      </div>
    </template>
    <Column selection-mode="multiple"></Column>
    <Column field="patient.code_patient" header="Code Patient">
      <template #body="slotProps">
        <ConstanteView :code_patient="slotProps.data.patient.code_patient" :constante="slotProps.data.constante_set.slice(-1)[0]"/>
      </template>
    </Column>
    <Column field="patient.nom" header="Nom"></Column>
    <Column field="patient.prenoms" header="Prénoms"></Column>
    <Column field="created_at" header="Date"></Column>

    <Column field="status" header="Etat">
      <template #body="{data}">
        <Badge :severity="{
          0: 'default',
          1: 'success'
        }[data.patient.status]">
          {{ {0: 'Visite', 1: 'Suivie'}[data.patient.status]}}
        </Badge>
      </template>
    </Column>
    <Column header="Actions">
      <template #body="slotProps">
        <Button size="small"  class="mr-1" @click="createConsultation(slotProps.data)">
          <span>Consulter</span>
        </Button>

        <router-link class="p-button p-button-sm" size="small" :to="'/dossier/'+slotProps.data.patient.id">
          <span class="ft ft-folder"></span>
          <span class="ml-1">Dossier</span>
        </router-link>
        <Button size="small" text icon="pi pi-download"></Button>
      </template>
    </Column>
  </DataTable>

  <Dialog header="Consultation" v-if="selectedItem" :style="{ width: '70vw' }" @hide="closeDialog" modal v-model:visible="showConsultationForm">
    <ConsultationForm @close-dialog="closeDialog" :consultation="selectedItem" :service_id="service_id" />
  </Dialog>
</PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
import {onMounted, ref, watch, reactive} from 'vue'
import {useRoute} from "vue-router";
import {useConsultationStore} from "../../stores/consultation.js";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import OverlayPanel from "primevue/overlaypanel";
import ConstanteView from "../../components/ConstanteView.vue";
import Chip from 'primevue/chip';
import {useDialog} from "primevue/usedialog";
import Dialog from "primevue/dialog";
import ConsultationForm from "../../components/ConsultationForm.vue";
import Badge from "primevue/badge";


const route = useRoute()
const filters = ref({
  nom: {
    value: "",
    type: "text"
  },
})
const selectedItem = ref({})
const service_id = ref(null)
const consultationStore = useConsultationStore()
const pageTitle = ref("Service")
const dialog = useDialog()
const consultations = reactive({
  data: [],
  loading: false,
  error: false
})
onMounted(async ()=>{
  document.querySelector('.content-wrapper-before').style.backgroundImage = 'url(/images/banners/vih.jpg)'
  try{
    consultations.loading= true;
    pageTitle.value = route.params.service_name
    service_id.value = route.params.service_id
    consultations.data = await consultationStore.fetchConsultationsForService(route.params.service_id)
  }catch (e) {
    console.log(e)
    consultations.error = e
  }finally {
    consultations.loading= false;
  }
})

watch(()=> route.params.service_id, async(value, oldValue)=>{
  console.log('service change from '+oldValue+' to '+value)
  service_id.value = route.params.service_id
  consultations.data = await consultationStore.fetchConsultationsForService(route.params.service_id)
  pageTitle.value = route.params.service_name
})


const showConsultationForm = ref(false)

const closeDialog = ()=>{
  selectedItem.value = null
  showConsultationForm.value = false
}
const createConsultation = async (consultation)=>{
  selectedItem.value = consultation
  showConsultationForm.value = true
}
</script>

<style scoped>


</style>
