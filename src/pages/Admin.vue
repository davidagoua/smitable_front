<template>
  <Nav/>
  <MainMenu/>


  <router-view/>
  <Sidebar style="z-index: 1000" v-model:visible="showSidebar" position="right">
    <div>
      Patient Selectionner {{ selectedPatient}}
    </div>
  </Sidebar>
</template>

<script>
import Nav from "../components/Nav.vue";
import MainMenu from "../components/MainMenu.vue";
import Sidebar from "primevue/sidebar";

import {useOverviewState} from "../stores/overview.js";
import {ref} from "vue";


let showSidebar = ref(false)
let {selectedPatient} = useOverviewState()
</script>

<style scoped>

</style>
