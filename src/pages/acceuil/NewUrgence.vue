<template>
<PageLayout page-title="Nouvelle Urgence">

  <section class="card">
    <form @submit.prevent="submit" class="card-body">
      <div  >
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
              <InputText required v-model="patient.nom" class="w-100"/>
            </div>
            <div class="col-md-6">
              <label for="" >Prénoms</label><br>
              <InputText required v-model="patient.prenoms" class="w-100"/>
            </div>
            <div class="col-md-3 mt-1">
              <label for="">Genre</label>
              <SelectButton v-model="patient.genre" option-value="value" class="w-100" option-label="name" :options="[{name: 'Masculin', value: 'M'},{name: 'Feminin', value:'F'}]" />
            </div>
            <div class="col-md-8 mt-1">
              <label for="">Situation Matrimoniale</label>
              <SelectButton required option-label="name" option-value="value" v-model="patient.situation_matrimoniale" class="w-100" :options="[
                  {name: 'Marié', value: 'Marie'},
                  {name: 'Célibataire', value: 'Celibataire'},
                  {name: 'Divorcé', value: 'Divorce'},
                  {name: 'Veuf', value: 'Veuf'},
                  {name: 'Autres', value: 'Autres'},
              ]" />
            </div>
            <div class="col-md-6 mt-1">
              <label for="">Date de naissance</label>
              <InputText required v-model="patient.date_naissance" class="w-100" type="date"/>
            </div>
            <div class="col-md-6 mt-1">
              <label for="">Lieu de naissance</label>
              <InputText required v-model="patient.lieu_naissance" class="w-100" />
            </div>
            <div class="col-md-6 mt-1">
              <label for="">Numéro de téléphone</label>
              <div  class="p-inputgroup flex-1">
              <span class="p-inputgroup-addon">
                +225
              </span>
                <InputMask required v-model="patient.contact" class="w-100" mask="99 99-99-99-99" placeholder="99 99-99-99-99" />
              </div>
            </div>

          </div>
        </div>
      </div>
      <p class="text-right">
        <Button type="submit" label="Enregistrer"></Button>
      </p>
    </form>
  </section>
</PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import SelectButton from "primevue/selectbutton";
import InputMask from "primevue/inputmask";
import Dropdown from "primevue/dropdown";
import RadioButton from "primevue/radiobutton";
import {ref, reactive} from "vue";
import {useToast} from "primevue/usetoast";
import useMyFetch from "../../compoables/useMyFetch.js";


const toast = useToast()
const patient = reactive({
  nom: '',
  prenoms: '',
  genre: '',
  situation_matrimoniale: '',
  date_naissance: '',
  lieu_naissance: '',
  contact: '',
  profession: '',
  ville: '',
  commune: '',
  quartier: '',
  nationalite: 'Ivoirienne',
  domiciles: []
})

const submit = ()=>{
  const {loading, onFetchResponse, onFetchError, data} = useMyFetch('patients/').post(patient).json()

  onFetchResponse((response)=>{
    if(response.status === 201){

      // create consultation instance
      const consultation = {
        patient: response.data.id,
        mode_entree: 'Urgence',
      }

      // create consultation
      const {loading, onFetchResponse, onFetchError, data} = useMyFetch('consultations/').post(consultation).json()

      onFetchResponse((response)=>{
        if(response.status === 201){
          toast.add({
            severity: 'success',
            detail: 'Patient enregistré avec succès',
            life: 3000
          })
        }
      })
    }
  })

  onFetchError((error)=>{
    toast.add({
      severity: 'error',
      detail: 'Une erreur est survenu',
      life: 3000
    })
  })
}



</script>

<style scoped>

</style>
