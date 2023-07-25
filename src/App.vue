<script setup>
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import DynamicDialog from "primevue/dynamicdialog";
import { useAuthStore } from "./stores/auth.js";
import Pusher from 'pusher-js'
import {onMounted} from "vue";
const authStore = useAuthStore()

const toast = useToast()


onMounted(()=>{
  let pusher = new Pusher('78473876483763764',
    {
      wsHost: 'smitci.com',
      wsPort: 6001,
      forceTLS: false,
      enabledTransports: ['ws'],
      cluster: ''
    }
  )
  pusher.subscribe('channel_1').bind('notification', (message)=>{
    console.log(message)
    toast.add({
      severity: "success",
      detail: message.message
    })
  })
})

</script>

<template>


  <router-view/>

  <DynamicDialog/>
  <Toast />
</template>

<style scoped>

</style>
