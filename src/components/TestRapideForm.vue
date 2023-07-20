<template>
<div>
  <div>
    <div class="row">
      <div class="col-md-6 mt-1">
        <label for="">Type d'analyse </label>
        <Dropdown filter :options="typeAnalyses" class="w-100" option-value="id" optionLabel="nom" v-model="newAnalyse.type_analyse_id" />
      </div>
      <div class="col-md-6 mt-1">
        <label for="">Technique d'analyse</label>
        <Dropdown filter required :options="techniqueAnalyses" class="w-100" option-value="id" option-label="nom" v-model="newAnalyse.technique_analyse_id" />
      </div>
      <div class="col-4 mt-1">
        <label for="">Resultats</label>
        <SelectButton :pt="{button: ({ context }) => ({class: context.active ? 'bg-red-400 border-cyan-400' : false})}" class="w-100" v-model="newAnalyse.resultat" :options="[{value: false, label: 'Negatif'},{value: true, label: 'Positif'}]" optionValue="value" dataKey="value" optionLabel="label" >
        </SelectButton>
      </div>
      <div class="col-8 mt-1" v-show="newAnalyse.resultat===true">
        <label for="">Affecter à un service</label><br>
        <Dropdown filter v-model="newAnalyse.service_id" :options="protocolData" class="w-100" option-label="nom" option-value="id" >
        </Dropdown>
      </div>

      <div class="text-right col-12 mt-3">
        <Button @click="submit" label="Enregistrer" :loading="save_loading" />
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import {reactive, ref, inject, onMounted, defineProps, defineEmits} from "vue";
import useMyFetch from "../compoables/useMyFetch.js";
import SelectButton from "primevue/selectbutton";
import {useToast} from "primevue/usetoast";
import {useDialog} from "primevue/usedialog";


const dialogRef = inject('dialogRef')
const dialog = useDialog()
const toast = useToast()
const props = defineProps({
  patient: {
    type: Object,
    required: true
  },
  consultation_id: {
    required: true
  }
})
const emit = defineEmits()
const newAnalyse = reactive({
  patient: props.patient.id,
  consultation_id: props.consultation_id
})
const save_loading = ref(false)



const {data: typeAnalyses, loading: typeLoading, error: typeError} = useMyFetch('type-analyses/')
  .json()
const {data: techniqueAnalyses, loading: techniqueLoading, error: techniqueError} = useMyFetch('technique-analyses/')
  .json()
const {data: protocolData, loading: protocolLoading} = useMyFetch('services/').json()

onMounted(()=>{
  console.log(props)
  const params = dialogRef.data;
})


const submit = ()=>{
  try{
    save_loading.value = true
    const { statusCode, onFetchResponse, onFetchError} = useMyFetch('analyse-rapide/').post(newAnalyse)
      .json()

    onFetchResponse((response)=>{
      toast.add({severity:'success', summary: 'Succès', detail: 'Analyse enregistrée avec succès',life: 3000 })
      dialogRef.hide()
    })
  }catch (e){
    console.log(e)

  }finally {
    save_loading.value = false
  }

  emit('close-dialog')
}

</script>

<style scoped>

</style>
