<template>
  <Nav/>
  <MainMenu/>


  <router-view/>

  <FastView/>
  <ConstanteForm/>
</template>

<script setup>
import Nav from "../components/Nav.vue";
import MainMenu from "../components/MainMenu.vue";

import {useOverviewState} from "../stores/overview.js";
import {onMounted, ref} from "vue";
import FastView from "../components/FastView.vue";
import {useConstanteForm} from "../compoables/useConstanteForm.js";
import ConstanteForm from "../components/ConstanteForm.vue";


let showSidebar = ref(false)
let {selectedPatient} = useOverviewState()
let constanteForm = useConstanteForm()
</script>

<style scoped>

</style>
