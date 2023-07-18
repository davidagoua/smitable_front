<template>
<PageLayout page-title="Liste des médicaments">
  <section>
    <DataTable
      :value="medicaments"
      :loading="loading"
      data-key="id"
    >
      <Column field="reference" header="Réference" ></Column>
      <Column field="nom" header="Nom" ></Column>
      <Column field="stock" header="Quantité" ></Column>
      <Column header="Actions">
        <template class="d-flex" #body="slotProp">
          <Button size="small" text icon="pi pi-download"></Button>
          <Button size="small" text icon="pi pi-pencil"></Button>
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


const {data: medicaments, loading} = useMyFetch('medicaments/').json()
</script>

<style scoped>

</style>
