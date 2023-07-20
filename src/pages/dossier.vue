<template>
  <PageLayout :page-title="'Dossier Patient '+ patient.code_patient">
    <section id="patient-profile">
      <div class="row match-height">
        <div class="col-lg-6 col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-4 col-md-4 d-flex justify-content-around">
                  <div class="patient-img-name text-center">
                    <vue-qr size="150" text="patient.code_patient"/>
                    <h4>{{ patient.code_patient }} </h4>
                  </div>
                </div>
                <div class="col-lg-8 col-md-8 justify-content-around">
                  <div class="patient-info">
                    <ul class="list-unstyled">
                      <li>
                        <div class="patient-info-heading d-flex justify-content-between  "> <span class="small">Nom:</span> <strong class="text-right w-100"> {{patient.nom}}  </strong></div>
                      </li>
                      <li>
                        <div class="patient-info-heading d-flex justify-content-between  "> <span class="small">Prénoms:</span> <strong class="text-right w-100"> {{patient.prenoms}}  </strong></div>
                      </li>
                      <li>
                        <div class="patient-info-heading d-flex justify-content-between  "> <span class="small"> Date et lieu de Naissance:</span> <strong class="text-right w-100"> {{patient.date_naissance}} à {{patient.lieu_naissance}} </strong></div>
                      </li>
                      <li>
                        <div class="patient-info-heading d-flex justify-content-between"> <span class="small">Nationalité :</span> <strong>  {{ patient.nationalite}} </strong></div>
                      </li>
                      <li>
                        <div class="patient-info-heading d-flex justify-content-between">  <span class="small">Contact:</span><strong>  {{patient.contact}} </strong></div>
                      </li>
                      <li>
                        <div class="patient-info-heading d-flex justify-content-between">  <span class="small">Sexe:</span><strong> {{patient.genre == 'M' ? 'Homme' : 'Femme'}} </strong></div>
                      </li>
                      <li>
                        <div class="patient-info-heading d-flex justify-content-between">  <span class="small">Profession   :</span><strong> {{patient.profession}} </strong></div>
                      </li>
                      <li>
                        <div class="patient-info-heading d-flex justify-content-between">  <span class="small">Situation matrimoniale  :</span><strong>  {{ patient.situation_matrimoniale}} , {{ patient.nombre_enfants}} enfants </strong></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-2">
          <div class="card bg-gradient-y-info">
            <div class="card-body">
              <ul class="list-unstyled text-white patient-info-card">
                <li><span class="patient-info-heading">Group Sanguin :</span> <span class="badge badge-sm diesase-badge badge-danger"> AB+ </span></li>
                <li><span class="patient-info-heading">Allergies :</span> Lait, Annanas, Kiwi</li>
                <li><span class="patient-info-heading">Maladie :</span> Diabete</li>
                <li><span class="patient-info-heading">Derniere Visite:</span>12 Juillet 2023</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-2">
          <div class="card bg-gradient-y-warning">
            <div class="card-header">
              <h5 class="card-title text-white">Personnel Intervenant</h5>
            </div>
            <div class="card-content mx-2">
              <ul class="list-unstyled text-white">
                <li>Dr. Diallo Zelica <span class="float-right">Spécialiste VIH </span></li>
                <li>Dr. Dine <span class="float-right">Spécialiste Himmuno </span></li>
                <li>Dr. Coulibaly <span class="float-right"> Nerologue</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-12 col-md-2">
          <div class="card ">
            <div class="card-body">
              <h5 class="card-title text-black-50"> <i class="ft-users text-lg-right"></i> Suivie (VIH)</h5>
              <div class="d-flex">
                <Button size="small" class="mr-1">Fiche de prelevement au Bilan initial</Button>
                <Button size="small" @click="goTo('/fiche/bilan-initial')" class="mr-1">Fiche de bilan initial pour prise en charge</Button>
                <Button size="small" class="mr-1">Fiche de suivi des personnes vivant du VIH</Button>
                <Button size="small" class="mr-1">Fiche de routine</Button>
                <Button size="small" class="mr-1">Fiche en cas d'exposition</Button>

              </div>
            </div>
          </div>
        </div>


        <div class="col-lg-4 col-md-2">
          <div class="card bg-gradient-y-primary">
            <div class="card-header">
              <h5 class="card-title text-white">Mode de Vie</h5>
            </div>
            <div class="card-content mx-2">
              <ul class="list-unstyled text-white">
                <li>Dr. Diallo Zelica <span class="float-right">Spécialiste VIH </span></li>
                <li>Dr. Dine <span class="float-right">Spécialiste Himmuno </span></li>
                <li>Dr. Coulibaly <span class="float-right"> Nerologue</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-2">
          <div class="card bg-gradient-y-purple">
            <div class="card-header">
              <h5 class="card-title text-white">Familiaux</h5>
            </div>
            <div class="card-content mx-2">
              <ul class="list-unstyled text-white">
                <li>Vie solitaire <span class="float-right"> Jan 2022 - Maintenant </span></li>
                <li>En couple <span class="float-right">Aout 2017 - Fev 2021</span></li>
                <li>Maison Familliale  <span class="float-right"> 2020 </span></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-2">
          <div class="card bg-gradient-y-blue-grey">
            <div class="card-header">
              <h5 class="card-title text-white">Domiciles </h5>
            </div>
            <div class="card-content mx-2">
              <ul class="list-unstyled text-white">
                <li v-for="(domicile, index) in patient.domiciles">{{ domicile.ville}} {{ domicile.quartier}} <span class="float-right">{{ domicile.date_debut}} -> {{ domicile.date_fin ?? 'actuel'}} </span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">Historique Consultation </h2>
              <div class="table-responsive">
                <table class="table patient-wrapper">
                  <tbody>
                  <tr v-for="consultation in patient.consultation_set" :key="consultation.id">
                    <td class=" border-top-0 align-middle">
                      <img src="/images/prof_heolie.jpg" width="30" alt="" class="rounded-circle doctor-img">
                    </td>
                    <td class="align-middle border-top-0">
                      <i class="la la-calendar-check-o"></i> {{ consultation.created_at}}
                    </td>
                    <td class="align-middle border-top-0">{{ consultation.user?.username}}</td>
                    <td class="align-middle border-top-0">{{ consultation.service?.nom}}</td>
                    <td class="align-middle border-top-0">{{ consultation.mode_entree}}</td>

                    <td class="align-middle border-top-0">
                      <div class="action">
                        <a href="#"><i class="ft-eye text-success"></i></a>

                      </div>
                    </td>
                  </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">Examens réalisés </h2>
              <div class="table-responsive">
                <table class="table patient-wrapper">
                  <tbody>
                  <tr>
                    <td class=" border-top-0 align-middle">
                      <img src="" width="30" alt="" class="rounded-circle doctor-img">
                    </td>
                    <td class="align-middle border-top-0">
                      <i class="la la-calendar-check-o"></i> 15/10/18
                    </td>
                    <td class="align-middle border-top-0">Test VIH Rapid  </td>
                    <td class="align-middle border-top-0">Test Anti-Génique</td>
                    <td class="align-middle border-top-0">
                      <i class="la la-circle text-danger"></i> Patient en cas contact                                                    </td>
                    <td class="align-middle border-top-0">
                      <div class="action">
                        <a href="#"><i class="ft-eye text-success"></i></a>

                      </div>
                    </td>
                  </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">Diagnostics </h2>
              <div class="table-responsive">
                <table class="table patient-wrapper">
                  <tbody>
                  <tr>
                    <td class=" border-top-0 align-middle">
                      <img src="/images/prof_heolie.jpg" width="30" alt="" class="rounded-circle doctor-img">
                    </td>
                    <td class="align-middle border-top-0">
                      <i class="la la-calendar-check-o"></i> 15/10/18
                    </td>
                    <td class="align-middle border-top-0">Test VIH Rapid  </td>
                    <td class="align-middle border-top-0">Test Anti-Génique</td>
                    <td class="align-middle border-top-0">
                      <i class="la la-circle text-danger"></i> Patient en cas contact                                                    </td>
                    <td class="align-middle border-top-0">
                      <div class="action">
                        <a href="#"><i class="ft-eye text-success"></i></a>

                      </div>
                    </td>
                  </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-2">
          <div class="card ">
            <div class="card-body">
              <h5 class="card-title text-black-50"> <i class="ft-droplet text-lg-right"></i> Signes fonctionnels </h5>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="row">
            <div class="col-lg-4 col-md-4">
              <div class="card pull-up">
                <div class="card-content">
                  <div class="card-body">
                    <div class="row">
                      <div class="text-left">
                        <h5 class="mb-0">Diarhée</h5>
                        <small> Oui </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="card pull-up">
                <div class="card-content">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-7  text-left">
                        <h5 class="mb-0">Constipation </h5>
                        <small class="text-light">Depuis 3 jours</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="card pull-up">
                <div class="card-content">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-7 text-left">
                        <h5 class="mb-0">Glucose</h5>
                        <small class="text-light">97 mg/dl</small>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="card pull-up">
                <div class="card-content">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-7 text-left">
                        <h5 class="mb-0">Cholestrol</h5>
                        <small class="text-light">85 mg/dl</small>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-12">
          <div class="card">
            <div class="card-header">
              <h2 class="card-title font-medium-3">Symptoms</h2>
            </div>
            <div class="card-body">
              <p class="card-text font-medium-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Doloribus, excepturi voluptatem! Ab iste pariatur quos. Architecto quasi dolores deserunt
                saepe! Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, corporis! </p>
              <span class="badge badge-sm diesase-badge badge-primary">Dental</span><span class="badge badge-sm badge-warning">Hair
                                        Fall</span>
              <span class="badge badge-sm diesase-badge
                        diesase-bad diesase-badge badge-info">Headache</span><span class="badge badge-sm badge-danger">Skin</span>
              <span class="badge badge-sm badge-primary">Back Pain</span>
            </div>
          </div>
        </div>
      </div>




      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="card pull-up">
                <div class="card-content">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-7 text-left">
                        <h5 class="mb-0">Blood Pressure</h5>
                        <small class="text-light">120/89 mm/hg</small>
                      </div>
                      <div class="col-5 ">
                        <div>
                          <canvas id="patient-blood-pressure" class="height-75"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="card pull-up">
                <div class="card-content">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-7  text-left">
                        <h5 class="mb-0">Heart Rate</h5>
                        <small class="text-light">102 Beats Per Min</small>
                      </div>
                      <div class="col-5 ">
                        <div>
                          <canvas id="patient-heart-rate" class="height-75"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="card pull-up">
                <div class="card-content">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-7 text-left">
                        <h5 class="mb-0">Glucose</h5>
                        <small class="text-light">97 mg/dl</small>
                      </div>
                      <div class="col-5">
                        <div>
                          <canvas id="patient-glucose" class="height-75"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="card pull-up">
                <div class="card-content">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-7 text-left">
                        <h5 class="mb-0">Cholestrol</h5>
                        <small class="text-light">85 mg/dl</small>
                      </div>
                      <div class="col-5">
                        <div>
                          <canvas id="patient-cholestrol" class="height-75"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-12">
          <div class="card">
            <div class="card-header">
              <h2 class="card-title font-medium-3">Symptoms</h2>
            </div>
            <div class="card-body">
              <p class="card-text font-medium-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Doloribus, excepturi voluptatem! Ab iste pariatur quos. Architecto quasi dolores deserunt
                saepe! Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, corporis! </p>
              <span class="badge badge-sm diesase-badge badge-primary">Dental</span><span class="badge badge-sm badge-warning">Hair
                                        Fall</span>
              <span class="badge badge-sm diesase-badge
                        diesase-bad diesase-badge badge-info">Headache</span><span class="badge badge-sm badge-danger">Skin</span>
              <span class="badge badge-sm badge-primary">Back Pain</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
</template>

<script setup>
import PageLayout from "../components/PageLayout.vue";
import {useRouter, useRoute} from "vue-router";
import {onMounted, reactive, watch, ref, computed} from "vue";
import useMyFetch from "../compoables/useMyFetch.js";
import {useToast} from "primevue/usetoast";
import vueQr from 'vue-qr/src/packages/vue-qr.vue'

const router = useRouter()
const route = useRoute()
const toast = useToast()
var Patient = reactive({})
const patient_id = ref(0)

const loading = ref(false)
const patient = ref({})


onMounted(async()=>{
  patient_id.value = route.params.id
  try {
    loading.value = true
    const {data, error} = await  useMyFetch('patients/'+patient_id.value+'/').json()
    console.log(data.value)
    patient.value = data.value
    }catch (e){
    console.log(e)
    toast.add({
      severity: 'error',
      message: e
    })
  }finally {
    loading.value = false
  }

})

const goTo = (path) => {
  router.push(path)
}

</script>

<style scoped>

</style>
