<template>
  <Nav/>
  <MainMenu/>


  <router-view/>
  <FastView/>



</template>

<script setup>
import Nav from "../components/Nav.vue";
import MainMenu from "../components/MainMenu.vue";
import Sidebar from "primevue/sidebar";
import {useOverviewState} from "../stores/overview.js";
import {onMounted, ref} from "vue";
import FastView from "../components/FastView.vue";


let showSidebar = ref(false)
let {selectedPatient} = useOverviewState()
</script>

<style scoped>

</style>
