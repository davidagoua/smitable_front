<template>
  <Dialog modal header="Constantes" v-if="constanteForm.selectedItem" v-model:visible="constanteForm.showConstanteForm.value" @hide="constanteForm.closeDialog" :style="{ width: '50vw' }">
    <div>
    <div class="row mt-2">
      <div class="col-md-12">
        <div class="w-100">
          <label for="">Mode d'entrée</label>
          <SelectButton v-model="newConstantes.mode_entree" filter class="w-100" :options="['Consultation','Urgence','Hospitalisation','Transfert','Autres']" />
        </div>
      </div>
      <div class="col-6">
        <label for="">Temperature (°C)</label><br>
        <InputNumber :min="34" :max="43" class="w-100" v-model="newConstantes.temperature"/>
      </div>
      <div class="col-6">
        <label for="">Tension</label><br>
        <InputNumber class="w-100" v-model="newConstantes.tension"/>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-6">
        <label for="">Poul</label><br>
        <InputNumber class="w-100" v-model="newConstantes.poul"/>
      </div>
      <div class="col-6">
        <label for="">Pression Arterielle </label><br>
        <InputNumber class="w-100" v-model="newConstantes.pression_arterielle"/>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-6">
        <label for="">Poids (Kg)</label><br>
        <InputNumber class="w-100" v-model="newConstantes.poids"/>
      </div>
      <div class="col-6">
        <label for="">Taille (Cm)</label><br>
        <InputNumber class="w-100" v-model="newConstantes.taille"/>
      </div>
    </div>
    <div class="text-right mt-3">
      <Button :loading="loading" @click="submit()">Enregistrer</Button>
    </div>
  </div>
  </Dialog>
</template>

<script setup>
import InputNumber from "primevue/inputnumber";
import SelectButton from "primevue/selectbutton"
import Button from 'primevue/button'
import {defineProps, ref, reactive, defineEmits} from 'vue'
import useMyFetch from "../compoables/useMyFetch.js";
import {useToast} from "primevue/usetoast";
import Dialog from "primevue/dialog";
import {useDialog} from "primevue/usedialog";
import {useConstanteForm} from "../compoables/useConstanteForm.js";


const dialog = useDialog()
const constanteForm = useConstanteForm()

const params = ref({})
const emit = defineEmits()
const loading = ref(false)
const toast = useToast()
const newConstantes = reactive({})

const submit = async ()=>{
  try{
    loading.value = true
    console.log(constanteForm.selectedItem)
    newConstantes.consultation_id = constanteForm.selectedItem.value.id
    const {statusCode, data} = await useMyFetch('constantes/').post(newConstantes).json()

    if(statusCode.value === 201){
      toast.add({
        severity: 'success',
        life: 3000,
        detail: "Constantes enregistrées"
      })
      constanteForm.afterEffect(data.value)
      constanteForm.closeDialog()
    }else{
      toast.add({
        severity: 'error',
        life: 3000,
        detail: statusCode.value
      })
    }
  }catch (e) {
    console.error(e)
  }finally {
    loading.value = false

  }
}

</script>

<style scoped>

</style>
