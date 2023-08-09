<template>
<PageLayout :page-title="pageTitle">

  <section class="card">
    <div class="card-body">
      <TabView>
        <TabPanel header="Patients ordinaires">
          <DataTable :filters="filters" :value="consultations_ordinaires" :loading="consultations.loading" data-key="id">
            <template #empty>
              <div class="d-flex justify-content-center align-items-center" style="height: 100px">
                <h6 class="text-muted">Aucune consultation</h6>
              </div>
            </template>
            <Column selection-mode="multiple"></Column>
            <Column field="patient.code_patient" header="Code Patient">
              <template #body="{data}">
                <Button @click="overviewState.selectPatient(data)" outlinded ></Button>
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
              <template #body="{data}">
                <Button size="small"  class="mr-1" @click="createConsultation(data)">
                  <span>Consulter</span>
                </Button>

                <router-link class="p-button p-button-sm" size="small" :to="'/dossier/'+data.patient.id">
                  <span class="ft ft-folder"></span>
                  <span class="ml-1">Dossier</span>
                </router-link>
                <Button size="small" @click="showSidebar = true" text icon="pi pi-download"></Button>
              </template>
            </Column>
          </DataTable>
        </TabPanel>
        <TabPanel header="Patients suivis">
          <DataTable :filters="filters" :value="consultations_suivies" :loading="consultations.loading" data-key="id">
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
        </TabPanel>
      </TabView>
    </div>
  </section>

  <Dialog header="Consultation" v-if="selectedItem" :style="{ width: '70vw' }" @hide="closeDialog" modal v-model:visible="showConsultationForm">
    <ConsultationForm @close-dialog="closeDialog" :consultation="selectedItem" :service_id="service_id" />
  </Dialog>
</PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
import {onMounted, ref, watch, reactive, computed} from 'vue'
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
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import {useOverviewState} from "../../stores/overview.js";
import useMyFetch  from "../../compoables/useMyFetch.js";


const route = useRoute()
const filters = ref({
  nom: {
    value: "",
    type: "text"
  },
})
const {showSidebar} = useOverviewState()
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
watch(()=> consultations.data, (value)=> console.log(value))
const consultations_ordinaires = computed(()=> consultations.data.filter((c)=> c.status === 0))
const consultations_suivies = computed(()=> consultations.data.filter((c)=> c.status === 1))


onMounted(async ()=>{
  document.querySelector('.content-wrapper-before').style.backgroundImage = 'url(/images/banners/vih.jpg)'
  try{
    consultations.loading = true;
    pageTitle.value = route.params.service_name
    service_id.value = route.params.service_id
    let {data} = await  useMyFetch('services/'+service_id.value+'/consultations/')
    console.log(data.value)
    consultations.data = data.value
  }catch (e) {
    console.log(e)
    consultations.loading = true;
    consultations.error = e
  }finally {
    consultations.loading = false;
  }
})

watch(()=> route.params.service_id, async(value, oldValue)=>{
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

const overviewState = useOverviewState();

</script>

<style scoped>


</style>
