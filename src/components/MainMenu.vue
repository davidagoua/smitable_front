<template>

  <div class="main-menu menu-fixed menu-light menu-accordion    menu-shadow " data-scroll-to-active="true"
       data-img="/theme-assets/images/backgrounds/02.jpg">
    <div class="navbar-header">
      <ul class="nav navbar-nav flex-row">
        <li class="nav-item mr-auto">
          <router-link to="/" class="navbar-brand"><img class="brand-logo"
                                                        alt=""
                                                        src=""/>
            <h3 class="brand-text">SMIT</h3></router-link>
        </li>
        <li class="nav-item d-md-none"><a class="nav-link close-navbar"><i class="ft-x"></i></a></li>
      </ul>
    </div>
    <div class="main-menu-content">
      <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
        <li class="nav-item ml-2">
          <span class="" style="color: var(--primary-color)">Générale</span>
        </li>
        <li class="">
          <router-link active-class="border-indigo-500 text-gray-900 focus:border-indigo-700" to="/" selected><i
              class="ft-home"></i><span class="menu-title"
                                        data-i18n="">Dashboard</span></router-link>
        </li>
        <li class="">
          <router-link to="/recherche-global"><i class="ft-search"></i><span class="menu-title"
                                                                             data-i18n="">Recherche</span></router-link>
        </li>
        <li class="nav-item ml-2">
          <span class="" style="color: var(--primary-color)">Acceuil</span>
        </li>
        <li class=" nav-item">
          <router-link to="/patient-attente"><i class="ft-users"></i><span class="menu-title" data-i18n="">Salle d'attente</span>
          </router-link>
        </li>
        <li class=" nav-item">
          <router-link to="/patient-urgence"><i class="la la-ambulance"></i><span class="menu-title" data-i18n="">Urgence</span>
          </router-link>
        </li>
        <li class=" nav-item">
          <router-link to="/rdv-liste"><i class="la la-history"></i><span class="menu-title"
                                                                          data-i18n="">Rendez-vous</span></router-link>
        </li>


        <li class="nav-item ml-2">
          <span style="color: var(--primary-color)">Hospitalisation</span>
        </li>
        <li class=" nav-item">
          <router-link to="/hospitalisation/liste"><i class="ft-users"></i><span class="menu-title" data-i18n="">Patients</span>
          </router-link>
        </li>
        <li class=" nav-item">
          <router-link to="/hospitalisation/unites"><i class="la la-hotel"></i><span class="menu-title" data-i18n="">Unités</span>
          </router-link>
        </li>

        <template v-if="authStore.isInGroup('medecin')">
          <li class="nav-item ml-2">
            <span style="color: var(--primary-color)">Services</span>
          </li>
          <suspense>
            <template #default>
              <li v-for="service in services" :key="service.id" class=" nav-item">
                <router-link :to="'/service/liste/'+ service.id + '/'+ service.nom" class="d-flex w-100">
                  <i class="ft-layers"></i>
                  <span class="menu-title" data-i18n="">{{ service.nom }}</span>
                  <div class="text-right flex-grow-1">
                    <Badge severity="primary">{{ service.consultation_count }}</Badge>
                  </div>
                </router-link>
              </li>
            </template>
            <template #fallback>
              <li class="nav-items">loading</li>
            </template>
          </suspense>
        </template>

        <li class="nav-item ml-2">
          <span style="color: var(--primary-color)">Laboratoire</span>
        </li>
        <template v-if="authStore.isInGroup('laboratoire')">
          <li class=" nav-item">
            <router-link to="/analyse/prelevements"><i class="la la-stethoscope"></i><span class="menu-title"
                                                                                           data-i18n="">Prélevements</span>
            </router-link>
          </li>
          <li class=" nav-item">
            <router-link to="/analyse/encours"><i class="la la-stethoscope"></i><span class="menu-title" data-i18n="">Analyses en cours</span>
            </router-link>
          </li>
        </template>
        <li class=" nav-item">
          <router-link to="/analyse/analyse-termines"><i class="la la-stethoscope"></i><span class="menu-title"
                                                                                             data-i18n="">Analyses terminées</span>
          </router-link>
        </li>

        <template v-if="authStore.isInGroup('pharmacie')">

          <li class="nav-item ml-2">
            <span style="color: var(--primary-color)">Pharmacie</span>
          </li>
          <li class=" nav-item">
            <router-link to="/pharmacie/ordonance"><i class="ft-file-text"></i><span class="menu-title"
                                                                                     data-i18n="">Ordonances</span>
            </router-link>
          </li>
          <li class=" nav-item">
            <router-link to="/pharmacie/list-medicaments"><i class="la la-cubes"></i>
              <span class="menu-title" data-i18n="">Stocks</span>
            </router-link>
          </li>
        </template>
        <template v-if="authStore.isInGroup('administrateur')">
          <li class="nav-item ml-2">
            <span style="color: var(--primary-color)">Paramètres</span>
          </li>
          <li class=" nav-item"><a href=""><i
              class="la la-cogs"></i><span class="menu-title" data-i18n="">Générales</span></a>
          </li>
          <li class=" nav-item">
            <router-link to="/settings/personnel"><i
                class="la la-user-cogs"></i><span class="menu-title" data-i18n="">Personnel</span></router-link>
          </li>
          <li class=" nav-item"><a href=""><i
              class="ft-book"></i><span class="menu-title" data-i18n="">Documentation</span></a>
          </li>
        </template>
      </ul>
    </div>
    <div class="navigation-background"></div>
  </div>

</template>

<script setup>
import {useAuthStore} from "../stores/auth.js";
import {storeToRefs} from "pinia";
import Badge from "primevue/badge";
import useMyFetch from "../compoables/useMyFetch.js";
import {useRoute} from 'vue-router'

let authStore = useAuthStore()
let {user} = storeToRefs(authStore)
let route = useRoute()

let {data: services, isFinished, isFetching} = useMyFetch('services/').json()
let isRoute = (path) => {
  return route.path === path
}


</script>

<style scoped>
.router-link-active {
  color: #fa626b !important;;
}
</style>
