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
            <template #body="slotProp">
              <Button size="small" icon="pi pi-eye" class="mr-1"/>
              <Button size="small" icon="pi pi-pdf"/>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </section>
</PageLayout>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import PageLayout from "../../components/PageLayout.vue";
import useMyFetch from "../../compoables/useMyFetch.js";


const {data: analyses, loading} = useMyFetch('analyse-patient/?state=1').json()
</script>
<style scoped>

</style>
