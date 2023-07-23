<template>
<PageLayout>
  <section>
    <DataTable
      :value="ordonances"
      :loading="loading"
    >
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
        <Button size="small" >
          <i class="pi pi-eye"></i>
        </Button>
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


const {data: ordonances, loading} = useMyFetch('ordonances/').json()

</script>

<style scoped>

</style>
