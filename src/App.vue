<script setup>
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import DynamicDialog from "primevue/dynamicdialog";
import { useAuthStore } from "./stores/auth.js";

const authStore = useAuthStore()

const toast = useToast()




</script>

<template>


  <router-view/>

  <DynamicDialog/>
  <Toast />
</template>

<style scoped>

</style>
