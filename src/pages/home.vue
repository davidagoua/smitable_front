<script setup>
import Nav from "../components/Nav.vue";
import MainMenu from "../components/MainMenu.vue";
import {onMounted, ref} from "vue";
import {useAuthStore} from "../stores/auth.js";
import admin from "../components/dashboards/admin.vue";
import DefaultDashboard from "../components/dashboards/DefaultDashboard.vue";
import MedecinDashboard from "../components/dashboards/MedecinDashboard.vue";


const dashboardComponent = ref('')
const authStore = useAuthStore()
onMounted(()=>{
    switch (true) {
        case authStore.isInGroup('administrateur'):
            dashboardComponent.value = admin;
            break;
        case authStore.isInGroup('medecin'):
            dashboardComponent.value = MedecinDashboard
        default:
            dashboardComponent.value = DefaultDashboard
    }
})
</script>

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
        <component :is="dashboardComponent"/>
      </div>
    </div>
  </div>


</template>

<style scoped>

</style>
