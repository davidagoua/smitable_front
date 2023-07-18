<template>
<PageLayout page-title="Programmé un RDV">
  <section class="card">
  <div class="card-body">
    <div class="mb-3">
      <div>
        <h3>Rechercher un patient patient</h3>
        <div class="p-inputgroup flex-1">
          <InputText class="w-100" placeholder="Entrez le code patient" />
          <Button label="Rechercher" />
        </div>
      </div>
    </div>
    <div>
        <h3>Enregistrer un nouveau patient</h3>
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
          <div class="col-md-4   mt-1">
            <label for="">Ville</label>
            <Dropdown v-model="patient.ville" class="w-100" :options="villes" filter placeholder="Selectionner votre ville"  />

          </div>
          <div class="col-md-4   mt-1">
            <label for="">Commune</label>
            <Dropdown v-model="patient.commune" class="w-100" :options="communes" filter placeholder="Selectionner votre ville"  />
          </div>
          <div class="col-md-4 mt-1">
            <label for="">Quartier</label>
            <InputText v-model="patient.quartier" class="w-100"/>
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

        </div>
      <hr>
        <div class="row">
          <div class="col-md-6">
            <label for="">Date du Rendez-vous</label>
            <InputText v-model="rdv.date_rdv" class="w-100" type="date"/>
          </div>
          <div class="col-md-6">
            <label for="">Service</label>
            <Dropdown :loading="service_loading" :options="services" :option-label="nom" option-value="id" class="w-100" v-model="rdv.service_id">
            </Dropdown>
          </div>
        </div>
      </div>

    <div class="mt-2 col-md-12 d-flex justify-content-between">
      <div>

      </div>
      <div>
        <Button @click="submit" :loading="loading"  label="Enregistrer"/>
      </div>
    </div>
  </div>

  </section>
</PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button'
import SelectButton from "primevue/selectbutton";
import InputMask from 'primevue/inputmask';
import Dropdown from 'primevue/dropdown'
import RadioButton from 'primevue/radiobutton';

import {reactive, ref, watch} from "vue";
import {useFetch} from "@vueuse/core";

import {usePatientStore} from "../../stores/patient.js";
import {useToast} from "primevue/usetoast";

const toast = useToast();
const loading = ref(false)
const patientStore = usePatientStore();
const professions = ref([
  'Medecin','Avocat','Militaire','Comptable','Prophète','Agent de Fonction public','Autres'
])
const villes = [
  'Abidjan','Bouaké','Daloa','Guiglo','Yamoussoukro','Divo','Dabou','Abengourou'
]
const communes = [
  'Yopougon','Cocody','Songon','Adjame','Marcory','Plateau','Abobo','Treichville','Koumassi','Bingerville'
]

const patient = reactive({
  nom: '',
  prenoms: '',
  genre: '',
  situationMatrimoniale: '',
  dateNaissance: '',
  lieuNaissance: '',
  numeroTelephone: ''
})

// useFetch services
const {data: services, loading: service_loading, error} = useFetch('http://localhost:8000/api/v1/services/')
    .json()

watch(()=>services, (newVal)=>{
    console.log(newVal)
})

const rdv = reactive({})

const submit = async()=>{
  try{
    loading.value = true
    const newPatient = await patientStore.addPatient(patient)
    console.log(newPatient)
    if(newPatient.id){
      rdv.patient_id = newPatient.id
      const newRdv = await patientStore.addRdv(rdv)
      if(newRdv.id){
        toast.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Rendez-vous enregistré',
          life: 3000
        });
      }

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
</script>

<style scoped>

</style>
