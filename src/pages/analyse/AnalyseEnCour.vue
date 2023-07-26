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
      <div class="row">
        <div class="col-md-6 mt-1">
          <label for="">Etat de l'echantillons</label>
          <Dropdown v-model="interp.etat" :options="['Normal','Alteré']" class="w-100"></Dropdown>
        </div>
        <div class="col-md-6 mt-1">
          <label for="">Analyseur</label>
          <Dropdown v-model="interp.analyseur" :options="['Analyseur 1','Analyseur 2','Analyseur 3']" class="w-100"></Dropdown>
        </div>

        <div class="col-md-6 mt-1">
          <label for="">Trousse commerciale</label>
          <MultiSelect v-model="interp.trousse" :options="['Analyseur 1','Analyseur 2','Analyseur 3']" class="w-100"></MultiSelect>
        </div>
        <div class="col-md-6 mt-1">
          <label for="">Methode</label>
          <Dropdown v-model="interp.methode" :options="['PCR temps réel','Methode 2','Methode 3']" class="w-100"></Dropdown>
        </div>

        <div class="col-md-6 mt-1">
          <label for="">Resultat nombre de copies / mL</label>
          <InputNumber v-model="interp.nombre_copies" class="w-100"/>
        </div>
        <div class="col-md-6 mt-1">
          <label for="">Resultat Log copies / mL</label>
          <InputNumber v-model="interp.log_copies" class="w-100"/>
        </div>
        <div class="col-12 mt-1">
          <label for="">Fichier</label>
          <InputText type="file" class="w-100"/>
        </div>
      </div>
      <p class="mt-3 text-right">
        <Button size="small" :loading="submitLoading" @click="submit">Enregistrer</Button>
      </p>
    </Dialog>
  </section>



</PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dropdown from "primevue/dropdown";
import useMyFetch from "../../compoables/useMyFetch.js";
import {reactive, ref} from "vue";
import MultiSelect from "primevue/multiselect";
import InputNumber from "primevue/inputnumber";
import {useToast} from "primevue/usetoast";



const toast = useToast()

const {data: analyses, loading} = useMyFetch('analyse-patient/?state=1').json()
const isResultatForm = ref(false)
let selected = reactive(null)
let interp = reactive({})
let submitLoading = ref(false)

const showResultatForm = (analyse)=>{
  isResultatForm.value = true
  selected = analyse
}

const submit = ()=>{
  submitLoading.value = true
  selected.interpretation = interp
  selected.state = 2
  let {data, loading} = useMyFetch('analyse-patient/'+selected.id+'/').put(selected).json()

  toast.add({
    severity: 'success',
    life: 300,
    detail: 'Resultats enregistré'
  })

  isResultatForm.value = false
  selected = null
  interp = null
  submitLoading.value = false

  analyses.value = analyses.value.filter((a)=> a.id !== selected.id)
}
</script>

<style scoped>

</style>
