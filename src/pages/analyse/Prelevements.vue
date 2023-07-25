<template>
<PageLayout page-title="Prélevements demandés">
<section class="card">
  <div class="card-body">
    <DataTable
      :value="analyses"
    >
      <template #header>
        <div class="d-flex justify-content-between">
          <div></div>
          <div>
            <InputText/>
          </div>
        </div>
      </template>
      <Column field="created_at" header="Date"/>
      <Column field="patient.code_patient" header="Code Patient">
      </Column>
      <Column field="service.nom" header="Service"></Column>
      <Column header="Actions">
        <template #body="{data}">
          <Button size="small" @click="goTo('/fiche/bilan-initial/'+data.patient.id+'/'+data.id)">Prelever</Button>
        </template>
      </Column>
    </DataTable>
    <Dialog header="Prélevement" modal :style="{width: '25vw'}" v-model:visible="isPreleverForm">
      <div class="">
        <label for="">Code Laboratoire</label><br>
        <InputText v-model="selected.code_barre" class="w-100"/>
      </div>
      <p class="mt-1 text-right">
        <Button @click="submit">Enregistrer</Button>
      </p>
    </Dialog>
  </div>
</section>
</PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
import useMyFetch from "../../compoables/useMyFetch.js";
import Dialog from "primevue/dialog"
import {reactive, ref} from "vue";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router"



const toast = useToast()
const router = useRouter()

const isPreleverForm = ref(false)
let selected = reactive()
const {data: analyses, loading} = useMyFetch('analyse-patient/?state=0').json()

const showPreleverForm = (analyse)=>{
  isPreleverForm.value = true
  selected = analyse
}

const submit  = ()=>{
  selected.state = 1
  selected.user_id = 1
  let {data, error} = useMyFetch('analyse-patient/'+selected.id+'/').put(selected).json()

  toast.add({
    severity: 'success',
    detail: 'Prelevement enregistré'
  })
  analyses.value = analyses.value.filter((a)=> a.id !== selected.id)
  isPreleverForm.value = false
  selected.value = null
}

const goTo = (path)=>{
  router.push(path)
}
</script>

<style scoped>

</style>
