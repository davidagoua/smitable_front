<template>
<PageLayout>
  <section class="card">
    <div class="card-body">
      <DataTable
          :value="ordonances"
          :loading="loading"
      >
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="created_at" header="Date"></Column>
        <Column field="consultation.patient.code_patient" header="Code Patient"></Column>
        <Column field="consultation.patient.contact" header="Contact"></Column>
        <Column field="consultation.patient.nom" header="Nom">
          <template #body="{data}">
            <span>********</span>
          </template>
        </Column>
        <Column field="consultation.patient.prenoms" header="Prénoms">
          <template #body="{data}">
            <span>********</span>
          </template>
        </Column>
        <Column field="consultation.service.nom" header="Service"></Column>
        <Column header="Actions">
          <template #body="{data}">
            <Button size="small" @click="showDetails(data)" label="Details" >
              <i class="pi pi-eye"></i>
            </Button>
          </template>
        </Column>
      </DataTable>
    </div>
  </section>
  <Dialog v-model:visible="isshowDetails" modal header="Details prescription" :style="{width: '50vw'}">
    <div>
      <DataTable
        :value="selected.lignes"
      >
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column
            header="Medicament"
            field="produit"
        >
          <template #body="{data}">

          </template>
        </Column>
        <Column
            header="Quantite"
            field="quantite"
        ></Column>
      </DataTable>
      <p class="text-right mt-1">
        <Button size="small" @click="submit">Enregistrer</Button>
      </p>
    </div>
  </Dialog>
</PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import useMyFetch from "../../compoables/useMyFetch.js";
import {reactive, ref} from "vue";
import {useToast} from "primevue/usetoast";


const {data: ordonances, loading} = useMyFetch('ordonances/').json()
const toast = useToast()
let selected = reactive(null)
const isshowDetails = ref(false)
const showDetails = (prescription)=>{
  selected = prescription
  isshowDetails.value = true
}

const submit = ()=>{
  isshowDetails.value = false
  toast.add({
    severity: 'success',
    detail: 'Ordonance enregistrée',
    life: 3000
  })
  selected = null
}

</script>

<style scoped>

</style>
