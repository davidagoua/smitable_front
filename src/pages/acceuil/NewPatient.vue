<template>
<PageLayout page-title="Nouveau Patient">
<div>


  <section class="card">
    <div class="card-body">
      <div >
        <div v-show="showSearchPatient" class="mb-3">
          <div>
            <h3>Rechercher un patient patient</h3>
            <div class="p-inputgroup flex-1">
              <AutoComplete optionLabel="code_patient" v-model="query" :suggestions="suggestions" @complete="search" class="w-100" placeholder="Entrez le code patient" >
                <template #option="{option}">
                  <div class="d-flex align-items-center">
                    <div class="">
                      <i class="pi pi-user mr-3"></i>
                    </div>
                    <div>{{ option.nom }} {{option.prenoms}}</div>
                  </div>
                </template>
              </AutoComplete>
              <Button label="Rechercher" @click="selectQuery" />
            </div>
          </div>
        </div>
        <div>
          <h3 v-if="showSearchPatient">Enregistrer un nouveau patient</h3>
          <h3 v-else="showSearchPatient">Modification information patient</h3>
          <div class="row">
            <div class="col-md-6">
              <label for="" >Nom</label><br>
              <InputText v-model="patient.nom" class="w-100"/>
            </div>
            <div class="col-md-6">
              <label for="" >Prénoms</label><br>
              <InputText v-model="patient.prenoms" class="w-100"/>
            </div>
            <div class="col-md-3 mt-1">
              <label for="">Genre</label>
              <SelectButton v-model="patient.genre" option-value="value" class="w-100" option-label="name" :options="[{name: 'Masculin', value: 'M'},{name: 'Feminin', value:'F'}]" />
            </div>
            <div class="col-md-8 mt-1">
              <label for="">Situation Matrimoniale</label>
              <SelectButton option-label="name" option-value="value" v-model="patient.situation_matrimoniale" class="w-100" :options="[
                  {name: 'Marié', value: 'Marie'},
                  {name: 'Célibataire', value: 'Celibataire'},
                  {name: 'Divorcé', value: 'Divorce'},
                  {name: 'Veuf', value: 'Veuf'},
                  {name: 'Autres', value: 'Autres'},
              ]" />
            </div>
            <div class="col-md-6 mt-1">
              <label for="">Date de naissance</label>
              <InputText v-model="patient.date_naissance" class="w-100" type="date"/>
            </div>
            <div class="col-md-6 mt-1">
              <label for="">Lieu de naissance</label>
              <InputText v-model="patient.lieu_naissance" class="w-100" />
            </div>
            <div class="col-md-6 mt-1">
              <label for="">Numéro de téléphone</label>
              <div  class="p-inputgroup flex-1">
              <span class="p-inputgroup-addon">
                +225
              </span>
                <InputMask v-model="patient.contact" class="w-100" mask="99 99-99-99-99" placeholder="99 99-99-99-99" />
              </div>
            </div>
            <div class="col-md-6 mt-1">
              <label for="">Profession</label>
              <Dropdown v-model="patient.profession" class="w-100" :options="professions" filter placeholder="Selectionner votre profession"  />
            </div>

            <div class="d-flex w-100 px-2 mt-2 justify-content-between">
              <div>Domiciles</div>
              <Button @click="patient.domiciles.push({})" size="small" text  icon="pi pi-plus"></Button>
            </div>
            <div class="col-md-12 row mt-1" v-for="(domicile, index) in patient.domiciles" :key="index">
              <div class="col-md-2 ">
                <label for="">Pays</label>
                <Dropdown v-model="domicile.pays" class="w-100" :option-label="'name.common'" option-value="name.common" :options="pays" filter placeholder="Selectionner votre ville"  />

              </div>
              <div class="col-md-2  ">
                <label for="">Ville</label>
                <Dropdown v-model="domicile.ville" class="w-100" :options="villes" filter placeholder="Selectionner votre ville"  />

              </div>
              <div class="col-md-2  ">
                <label for="">Commune</label>
                <Dropdown v-model="domicile.commune" class="w-100" :options="communes" filter placeholder="Selectionner votre ville"  />
              </div>
              <div class="col-md-2">
                <label for="">Quartier</label>
                <InputText v-model="domicile.quartier" class="w-100"/>
              </div>
              <div class="col-md-2">
                <label for="">Date debut</label>
                <InputText type="date"/>
              </div>
              <div class="col-md-2">
                <label for="">Date fin</label>
                <InputText type="date"/>
              </div>
            </div>
            <div class="col-md-6 mt-1">
              <label for="">Nationalité</label><br>
              <div class="d-flex">
                <div class="">
                  <RadioButton v-model="patient.nationalite" inputId="ivoirienne" name="nationalite" value="Ivoirienne" />
                  <label for="ingredient2" class="ml-2">Ivoirienne</label>
                </div>
                <div class="d-flex">
                  <RadioButton :checked="showElseNationalite" v-model="patient.nationalite" inputId="autres" name="nationalite" value="Autre" />
                  <label for="ingredient2" class="ml-2">Autres</label>
                </div>
              </div>
            </div>
            <div class="col-md-6 mt-1" v-show="showElseNationalite" >
              <label for="">Autres</label>
              <InputText class="w-100" />
            </div>

            <div class="row col-md-12 mt-1 w-100">
              <div class="col-md-6">
                <label for="">Nombre d'enfants</label><br>
                <InputNumber v-model="patient.nbr_enfants"/>
              </div>
              <div class="col-md-6">
                <label for="">Groupe Sanguin</label><br>
                <SelectButton :options="['A+','A-','B+','B-','O+','O-','AB+','AB-']" v-model="patient.groupe_sanguin"/>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="mt-2 col-md-12 d-flex justify-content-between">
        <div></div>
        <Button @click="submit" :loading="loading"  label="Enregistrer"/>
      </div>
    </div>

  </section>
</div>
</PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
import InputText from 'primevue/inputtext';
import InputNumber from "primevue/inputnumber";
import Button from 'primevue/button'
import SelectButton from "primevue/selectbutton";
import InputMask from 'primevue/inputmask';
import Dropdown from 'primevue/dropdown'
import RadioButton from 'primevue/radiobutton';
import MultiSelect from "primevue/multiselect";
import AutoComplete from "primevue/autocomplete";
import {reactive, ref, onMounted, watch} from "vue";
import Steps from "primevue/steps";
import {usePatientStore} from "../../stores/patient.js";
import {useConsultationStore} from "../../stores/consultation.js";
import {useToast} from "primevue/usetoast";
import {useFetch} from '@vueuse/core'
import {useRoute} from 'vue-router'
import useMyFetch from "../../compoables/useMyFetch.js";

const route = useRoute()
const consultationStore = useConsultationStore()
const toast = useToast()


const patientStore = usePatientStore()
const showElseNationalite = ref(false)
const loading = ref(false)
const professions = ref([
    'Medecin','Avocat','Militaire','Comptable','Prophète','Agent de Fonction public','Autres'
])
const villes = [
    'Abidjan','Bouaké','Daloa','Guiglo','Yamoussoukro','Divo','Dabou','Abengourou'
]
const communes = [
    'Yopougon','Cocody','Songon','Adjame','Marcory','Plateau','Abobo','Treichville','Koumassi','Bingerville'
]

// country list
const {data: pays}= useFetch('https://restcountries.com/v3.1/independent?status=true')


const steps = ref([
  {label: 'Informations Personelle'},
  {label: "Motifs de consultation"},
  {label: "Rendez-vous"},

])
const activeIndex = ref(0)
const showSearchPatient = ref(true)
let patient = reactive({
  nom: '',
  prenoms: '',
  genre: '',
  situationMatrimoniale: '',
  dateNaissance: '',
  lieuNaissance: '',
  numeroTelephone: '',
  domiciles: [{}],
})


const consultation = reactive({
  service_id: null
})
watch(patient, (value)=>{
  console.log(value)
})
onMounted(async ()=>{
  if(route.params.patient_id){
    showSearchPatient.value = false
    let {data} = await useMyFetch('patients/'+route.params.patient_id+'/').json()
    console.log(data)
    patient = data
  }
})
const submit = async()=>{
  try{
    loading.value = true
    if(showSearchPatient.value){
      const newPatient = await patientStore.addPatient(patient)
      console.log(newPatient)
      if(newPatient.id){
        consultation.patient_id = newPatient.id
        const newConsultation = await consultationStore.addConsultation(consultation)
        if(newConsultation.id){
          toast.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Patient enregistré avec succès',
            life: 3000
          });
        }

      }
    }else{
      const {data} = await useMyFetch('patients/'+patient.id+'/').put(patient).json()

    }

  }catch (e) {
    console.log(e)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      life: 3000,
      detail: 'Une erreur est survenue lors de l\'enregistrement du patient',
    })
  }finally {
    loading.value = false
  }
}

const next = ()=>{
  try{

  }catch (e) {
    console.log(e)
  }
}

let suggestions = ref([])
let query = ref('')
const search = (event)=>{
  let {data} = useMyFetch('patients/?code_patient='+event.query).json()
  suggestions = data
}

const selectQuery = ()=>{
  patient = reactive(query.value)
  console.log(patient)
}

</script>

<style scoped>

</style>
