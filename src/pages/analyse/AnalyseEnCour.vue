<template>
<PageLayout page-title="Analyses en cours">

  <section>
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
          <Button size="small" @click="showResultatForm(data)">
            <i class="pi pi-upload mr-1"></i>
            Resultat
          </Button>
        </template>
      </Column>
    </DataTable>

    <Dialog header="Resultat" modal v-model:visible="isResultatForm" :style="{width: '50vw'}">

    </Dialog>
  </section>

</PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import useMyFetch from "../../compoables/useMyFetch.js";
import {reactive, ref} from "vue";



const {data: analyses, loading} = useMyFetch('analyse-patient/?state=1').json()
const isResultatForm = ref(false)
const selected = reactive(null)

const showResultatForm = (analyse)=>{
  isResultatForm.value = true
  selected = analyse
}
</script>

<style scoped>

</style>
