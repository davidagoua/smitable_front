<script setup>
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import DynamicDialog from "primevue/dynamicdialog";
import { useAuthStore } from "./stores/auth.js";
import Pusher from 'pusher-js'
import {onMounted} from "vue";
import {useOnline} from "@vueuse/core"


const authStore = useAuthStore()
const toast = useToast()
const online = useOnline()

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

  <Suspense>
    <router-view/>

  </Suspense>

  <DynamicDialog/>
  <Toast />

  <div v-show="!online" style="z-index: 10000; top: 0" class="p-1 text-white w-100 position-fixed text-center bg-danger">Vous êtes hors connexion :(</div>
</template>

<style scoped>

</style>
