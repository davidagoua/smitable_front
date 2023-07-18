<template>

  <div v-if="isAuthenticated" class="main-menu menu-fixed menu-light menu-accordion    menu-shadow " data-scroll-to-active="true"
       data-img="">
    <div class="navbar-header">
      <ul class="nav navbar-nav flex-row">
        <li class="nav-item mr-auto"><router-link to="/" class="navbar-brand"><img class="brand-logo"
                                                                                    alt="Chameleon admin logo"
                                                                                    src=""/>
          <h3 class="brand-text">SMIT-SGH</h3></router-link></li>
        <li class="nav-item d-md-none"><a class="nav-link close-navbar"><i class="ft-x"></i></a></li>
      </ul>
    </div>
    <div class="main-menu-content">
      <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
        <li class="nav-item ml-2">
          <span class="text-primary">Générale</span>
        </li>
        <li class="active"><a href="index.html"><i class="ft-home"></i><span class="menu-title"
                                                                             data-i18n="">Dashboard</span></a>
        </li>
        <li class=""><router-link to="/recherche-global"><i class="ft-search"></i><span class="menu-title"
                                                                             data-i18n="">Recherche</span></router-link>
        </li>
        <li  class="nav-item ml-2">
          <span class="text-primary">Acceuil</span>
        </li>
          <li class=" nav-item"><router-link to="/patient-attente"><i class="ft-users"></i><span class="menu-title" data-i18n="">Salle d'attente</span></router-link>
          </li>
          <li class=" nav-item"><router-link to="/patient-urgence"><i class="la la-ambulance"></i><span class="menu-title" data-i18n="">Urgence</span></router-link>
          </li>
        <li class=" nav-item"><router-link to="/rdv-liste"><i class="la la-history"></i><span class="menu-title" data-i18n="">Rendez-vous</span></router-link>
        </li>



        <li class="nav-item ml-2">
          <span class="text-primary">Hospitalisation</span>
        </li>
        <li class=" nav-item"><router-link to="/hospitalisation/liste"><i class="ft-users"></i><span class="menu-title" data-i18n="">Patients</span></router-link>
        </li>
        <li class=" nav-item"><router-link to="/hospitalisation/unites"><i class="ft-home"></i><span class="menu-title" data-i18n="">Unités</span></router-link>
        </li>

        <li class="nav-item ml-2">
          <span class="text-primary">Services</span>
        </li>
        <li v-for="service in services"  :key="service.id" class=" nav-item"><router-link :to="'/service/liste/'+ service.id + '/'+ service.nom"><i class="ft-layers"></i><span class="menu-title" data-i18n="">{{ service.nom }}</span></router-link>
        </li>

        <li class="nav-item ml-2">
          <span class="text-primary">Laboratoire</span>
        </li>
        <li class=" nav-item"><router-link to="/analyse/encours"><i class="ft-stethoscope"></i><span class="menu-title" data-i18n="">Analyses en cours</span></router-link>
        </li>
        <li class=" nav-item"><a href="charts.html"><i class="ft-stethoscope"></i><span class="menu-title" data-i18n="">Analyses terminées</span></a>
        </li>

        <li class="nav-item ml-2">
          <span class="text-primary">Pharmacie</span>
        </li>
        <li class=" nav-item"><router-link to="/pharmacie/ordonance"><i class="ft-file-text"></i><span class="menu-title"
                                                                                   data-i18n="">Ordonances</span></router-link>
        </li>
        <li class=" nav-item"><router-link to="/pharmacie/list-medicaments"><i class="ft-medkit"></i><span class="menu-title"
                                                                                  data-i18n="">Stock Medicaments</span></router-link>
        </li>
        <li class="nav-item ml-2">
          <span class="text-primary">Paramètres</span>
        </li>
        <li class=" nav-item"><a href="https://themeselection.com/demo/chameleon-admin-template/documentation"><i
            class="ft-cogs"></i><span class="menu-title" data-i18n="">Générales</span></a>
        </li>
        <li class=" nav-item"><a href="https://themeselection.com/demo/chameleon-admin-template/documentation"><i
            class="ft-book"></i><span class="menu-title" data-i18n="">Documentation</span></a>
        </li>
      </ul>
    </div>
    <div class="navigation-background"></div>
  </div>

</template>

<script setup>
import {reactive, onMounted, watch} from 'vue'
import {useStorage} from '@vueuse/core'
import {useRouter} from "vue-router";
import {useAuthStore} from "../stores/auth.js";


let isAuthenticated = localStorage.getItem('token') !== null
let services = useStorage('services', [])
const fetchServices = async ()=>{
  try {
    const data = await ((await fetch('http://localhost:8000/api/v1/services/')).json())
    services = data
    localStorage.setItem('services', JSON.stringify(services))
  }catch (e) {
    console.error("verifail: "+e)
  }
}



onMounted(()=>{
  fetchServices().then(()=> console.log('service loaded'))
})
watch(()=>services, (newVal, oldVal)=>{
  localStorage.setItem('services', JSON.stringify(newVal))
})

</script>

<style scoped>

</style>
