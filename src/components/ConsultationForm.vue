<template>
 <div>
   <div class="mb-3">
     <label for="">Description </label><br>
     <Editor v-model="value" editorStyle="height: 120px"/>
   </div>

   <div class="row">
     <div class=" col-md-4">
       <label for="">Symptomes</label> <br>
       <MultiSelect
           class="w-100"
           v-model="consultation.motifs"
           :options="motifsConsultations"
       />
     </div>
     <div class="col-md-4">
       <label for="">Antécédents</label> <br>
       <MultiSelect
           v-model="consultation.antecedents"
           class="w-100"
           :options="antecedents"
       />
     </div>
     <div class="col-md-4">
       <label for="">Mode de vie</label> <br>
       <MultiSelect
           v-model="consultation.mode_vie"
           class="w-100"
           :options="['Cigarette','Drogue','Alcool']"
       />
     </div>
   </div>

   <div class="mt-3 row">
     <div class="col-3" v-for="(ant, index) in consultation.antecedents">
       <div class="p-inputgroup flex-1">
          <span class="p-inputgroup-addon">
              {{ant}}
          </span>
         <InputText placeholder="valeur" />
       </div>
     </div>
   </div>

   <div class="mt-3">

   <div class="row" >
     <div class="col-md-6 "  >
       <label for="">Molécules</label><br>
       <MultiSelect class="w-100 flex-grow-1" v-model="protocole.molecules_id" :options="molecules" option-value="id" filter option-label="nom"/>
     </div>

   </div>
 </div>



   <div class="mt-3">
     <div class="d-flex justify-content-between">
       <Button @click="prescriptions.push({})" size="small" >
         <i class="pi pi-plus mr-1"></i>
         Prescription</Button>
       <Button size="small" @click="" text icon="pi pi-trash">
       </Button>
     </div>
       <hr>
     <div v-for="(prescription, index) in prescriptions" class="row align-items-center" :key="index">
       <div class="col-md-5">
         <label for="">Medicament</label><br>
         <Dropdown option-label="nom" option-value="id" filter :options="medicaments" class="w-100" v-model="prescription.produit_id"/>
       </div>
       <div class="col-md-3">
         <label for="">Nombre de dose</label><br>
         <InputNumber class="w-100" v-model="prescription.quantite"/>
       </div>
       <div class="col-md-3">
         <label for="">Fréquences</label><br>
         <MultiSelect filter :options="['Matin','Midi','Soir']" class="w-100" v-model="prescription.frequence"/>
       </div>
       <div class="float-right">
         <Button @click="removePrescription(index)" size="small" text class="pi pi-times text-red"></Button>
       </div>
     </div>
   </div>



   <div class="mt-3">
     <div class="d-flex justify-content-between">
       <Button @click="analyses.push({})" size="small" >
         <i class="pi pi-plus mr-1"></i>
         Examen</Button>
       <Button size="small" @click="" text icon="pi pi-trash">
       </Button>
     </div>
     <hr>
     <div v-for="(analyse, index) in analyses" class="row" :key="index">
       <div class="col-md-6">
         <label for="">Analyse</label><br>
         <Dropdown class="w-100" :options="analyseOptions" option-value="id" filter option-label="nom"  v-model="analyse.medicament"/>
       </div>
       <div class="col-md-5">
         <label for="">Laboratoire</label><br>
         <Dropdown :options="laboratoires" option-label="nom" option-value="id" class="w-100"  v-model="analyse.laboratoire"/>
       </div>
       <div class="float-right">
         <Button @click="removePrescription(index)" size="small" text class="pi pi-times text-red"></Button>
       </div>
     </div>
   </div>

   <div class="mt-3">
     <div class="d-flex justify-content-between">
       <Button size="small" @click="showHospitalisation = ! showHospitalisation">Hospitalisation</Button>
       <Button size="small" @click="" text icon="pi pi-trash">
       </Button>
     </div>
     <br>
     <div class="row" v-show="showHospitalisation">
       <div class="col-6">
         <label for="">Chambres disponibles</label><br>
         <Dropdown v-model="hospitalisation.unite" class="w-100" :options="unites" option-value="id" option-label="nom"></Dropdown>
       </div>
     </div>
   </div>

   <p class="mt-3 text-right">
     <Button @click="save" :loading="allLoad">Enregistrer</Button>
   </p>
 </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import AutoComplete from "primevue/autocomplete";
import Editor from 'primevue/editor';
import {onMounted, reactive, ref, inject, defineProps, defineEmits, computed} from "vue";
import MultiSelect from "primevue/multiselect";
import useMyFetch from "../compoables/useMyFetch.js";
import InputNumber from "primevue/inputnumber";
import {useToast} from "primevue/usetoast";
import {useDialog} from "primevue/usedialog";
import {useAuthStore} from "../stores/auth.js";

const props = defineProps({
  consultation: {
    type: Object,
    required: true
  },
  service_id: {
    required: true
  }
})
const useAuth = useAuthStore()
const emit = defineEmits()
console.log(props.consultation)

const toast = useToast()
const dialogRef = inject('dialogRef')
let prescriptions = reactive([])
let analyses = reactive([])
let protocole = reactive({
  molecules_id: []
})
let hospitalisation = reactive({
  patient_id: props.consultation.patient.id
})
let analyseOptionsBase = ref([])
let showHospitalisation = ref(false)
let allLoad = ref(false)
const {data: analyseOptions, loading: loadingAnalyse} = useMyFetch("analyses/").json()
const {data: medicaments, loading: loadingMedicament} = useMyFetch("medicaments/").json()
const {data: laboratoires} = useMyFetch("laboratoires/").json()
const {data: molecules} = useMyFetch("molecules/").json()
const {data: unites} = useMyFetch("unites/").json()
const antecedantsList = computed(()=> consultation.antedecants)

const removePrescription = (i)=>{
  prescriptions = prescriptions.filter((p, index)=> index !== i )
}
const motifsConsultations = [
  'Douleur','Fièvre','Toux','Vomissement','Diarrhée','Maux de tête','Maux de ventre','Maux de gorge','Maux de dos','Maux de pied','Maux de main','Maux de jambe','Maux de bras','Maux de cou','Maux de poitrine',
]
const antecedents = [
  'Diabète','Hypertension','Paludisme','Tuberculose','VIH','Hépatite','Autres'
]

const save = async()=>{

  try{
    allLoad.value = true
    // save prescription

    if(protocole.molecules_id.length > 0){
      protocole.patient_id = props.consultation.patient.id
      let {error: protocolError} = useMyFetch('protocoles/').post(protocole).json()
    }


    if(showHospitalisation.value){
      hospitalisation.patient_id = props.consultation.patient.id
      let {error: hosError} = useMyFetch('hospitalisations/').post(hospitalisation).json()
    }

    if(prescriptions.length > 0){
     let {error: ordError} = useMyFetch('ordonances/').post({
       lignes: prescriptions,
       consultation_id: props.consultation.id
     }).json()
    }

    // save examens

    if(analyses.length > 0){
      analyses.forEach((analyse)=>{
        analyse.patient_id = props.consultation.patient.id
        analyse.service_id = props.service_id
        analyse.user_id = useAuth.user.id ?? 1
        console.log(analyse)
        let {error: anaError} = useMyFetch('analyse-patient/').post(analyse).json()
      })
    }

    // save hospitalisation

    toast.add({
      severity: 'success',
      detail: "Consultation enregistrés",
      life: 3000
    })

    emit('close-dialog')
    console.log('whenever')


  }catch (e) {

  }finally {
    allLoad.value= false
  }

}
</script>

<style scoped>

</style>
