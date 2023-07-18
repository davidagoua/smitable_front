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
        <template #body="slotProp">
          <Button size="small">
            <i class="pi pi-download mr-1"></i>
            Resultat
          </Button>
        </template>
      </Column>
    </DataTable>
  </section>

</PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import useMyFetch from "../../compoables/useMyFetch.js";



const {data: analyses, loading} = useMyFetch('analyse-patient/').json()
</script>

<style scoped>

</style>
