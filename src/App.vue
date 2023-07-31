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

let pusher = new Pusher('app-key',
    {
      wsHost: 'smitci.com',
      wsPort: 6001,
      forceTLS: false,
      enabledTransports: ['ws'],
      cluster: 'smitci.com'
    }
)

pusher.connection.bind('connected', () => {
  console.log('ws connected')
})

let user_channel = pusher.subscribe('channel_1')

user_channel.bind('notification', (message)=>{
  console.log('message')
  console.log(message)
  toast.add({
    severity: "success",
    detail: message.message
  })
})


</script>

<template>
  <router-view/>
  <DynamicDialog/>
  <Toast />

  <div v-show="!online" style="z-index: 10000; top: 0" class="p-1 text-white w-100 position-fixed text-center bg-danger">Vous êtes hors connexion :(</div>
</template>

<style scoped>

</style>
