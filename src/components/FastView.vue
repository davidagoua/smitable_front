<template>
  <Sidebar style="z-index: 1000; width: 600px" v-model:visible="isShowed" @close="isShowed = false " position="right">
  </Sidebar>
</template>

<script setup>
import {useOverviewState} from "../stores/overview.js";
import {computed, watch} from "vue";
import Sidebar from "primevue/sidebar";

const {showSidebar, selectedPatient, isShowed} = useOverviewState()
watch(isShowed, (value)=>{
  console.log(selectedPatient.value)
})

</script>

<style scoped>

</style>
