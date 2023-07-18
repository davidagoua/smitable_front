<template>
<PageLayout page-title="Patient en hospitalisation">
<section>
  <DataTable
    :value="hospitalisations"
  >
    <Column header="Date" field="created_at"/>
    <Column header="Code Patient" field="patient.code_patient"/>
    <Column header="Nom" field="patient.nom"/>
    <Column header="Prénoms" field="patient.prenoms"/>
    <Column header="Status" field="patient.state">
      <template #body="slotProp">
        <Tag value="slotProp.data.state"></Tag>
      </template>
    </Column>
    <Column header="Actions">
      <template #body="slotProp">
        <template v-show="slotProp.data.state === 0">
          <Button size="small" class="mr-1">Valider</Button>
          <Button size="small" severity="danger">Rejeter</Button>
        </template>
      </template>
    </Column>
  </DataTable>
</section>
</PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import useMyFetch from "../../compoables/useMyFetch.js";

const {data: hospitalisations, loading} = useMyFetch('hospitalisations/').json()
</script>

<style scoped>

</style>
