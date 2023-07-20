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
                    <h2 class="text-center">0</h2>
                    <h6 class="text-center">Patients</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body">
                    <h2 class="text-center">0</h2>
                    <h6 class="text-center">Prestations</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body ">
                    <h2 class="text-center">0</h2>
                    <h6 class="text-center">Personnels</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-body text-center">
                    <ProgressBar class="progress" style=""/>
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
import ProgressSpinner from "primevue/progressspinner";
import useMyFetch from "../compoables/useMyFetch.js";
import {watch} from "vue";



const {data: statistiques} = useMyFetch("statistiques/").json();

watch(statistiques, (value)=>{
  console.log(value)
})

</script>

<style scoped>

</style>
