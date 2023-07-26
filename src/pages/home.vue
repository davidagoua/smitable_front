<template>

  <Nav/>
  <MainMenu/>


    <div class="app-content content">
    <div class="content-wrapper">
      <div class="content-wrapper-before"></div>
      <div class="content-header row">
        <div class="content-header-left col-md-4 col-12 mb-2">
          <h3 class="content-header-title">Tableau de bord</h3>
        </div>
        <div class="content-header-right col-md-8 col-12">
          <div class="breadcrumbs-top float-md-right">
            <div class="breadcrumb-wrapper mr-1">
              <ol class="breadcrumb">

              </ol>
            </div>
          </div>
        </div>
      </div>
      <div class="content-body">



        <div class="row">
          <div class="col-md-8">
            <div class="row">
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body">
                    <h2 class="text-center">{{ stats.patients}}</h2>
                    <h6 class="text-center">Patients</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body">
                    <h2 class="text-center">{{stats.prestations}}</h2>
                    <h6 class="text-center">Patients suivis</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body ">
                    <h2 class="text-center">{{ stats.personels}}</h2>
                    <h6 class="text-center">Personnels</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 mt-1">
                <div class="card">
                  <div class="card-body text-center">
                    <h4>Nombre de patients par maladie et par sexe</h4>
                  </div>
                </div>
              </div>
              <div class="col-md-12 mt-1">
                <div class="card">
                  <div class="card-body text-center">
                    <h4>Nombre de patients guerri par maladie et par sexe</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card">
              <div class="card-header">

                <h4 class="card-title">Patients par services</h4>
              </div>
              <div class="card-body">
                <div class="card-content">
                  <div id="line-chart" class="height-300 lineChart lineChartShadow">
                    <table class="table">
                      <tr>
                        <th>Service</th>
                        <th>Patients</th>
                        <th>Guéris</th>
                      </tr>
                      <tr v-for="service in services" :key="service.id">
                        <td>{{service.nom}}</td>
                        <td>{{service.consultation_count}}</td>
                        <td>0</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script setup>
import Nav from "../components/Nav.vue";
import MainMenu from "../components/MainMenu.vue";
import useMyFetch from "../compoables/useMyFetch.js";
import {onMounted, ref, watch} from "vue";
import {Chart} from "highcharts-vue";
import {useServiceStore} from "../stores/services.js";
import {storeToRefs} from "pinia";


let serviceStore = useServiceStore()
let {data: stats} = useMyFetch("statistiques/").json();
let { data: services } = useMyFetch("services/").json();

onMounted(async()=>{

})

watch(stats, (value)=>{
  console.log(value)
})

watch(services, (value)=>{
  console.log(value)
})

</script>

<style scoped>

</style>
