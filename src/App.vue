<script setup>
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import DynamicDialog from "primevue/dynamicdialog";
import { useAuthStore } from "./stores/auth.js";
import Pusher from 'pusher-js'
import {onMounted, watch} from "vue";
import ConfirmDialog from "primevue/confirmdialog"
import {useOnline} from "@vueuse/core"
import {useSpeechRecognition} from "@vueuse/core";




const authStore = useAuthStore()
const toast = useToast()
const online = useOnline()

watch(online, (value)=>{
    console.log(value)
})
Pusher.logToConsole = true;

let pusher = new Pusher('abcac9dd524eef266863',{
  cluster: 'eu'
})

let user_channel = pusher.subscribe('channel_1')

user_channel.bind('notification', (message)=>{
  toast.add({
    severity: "success",
    detail: message.message,
    life: 3000
  })
})


</script>

<template>
    <suspense>
        <template #default>

          <router-view v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component" />
            </transition>
          </router-view>

        </template>
    </suspense>
  <DynamicDialog/>
  <Toast />
  <ConfirmDialog></ConfirmDialog>

  <div v-show="!online" style="z-index: 10000; top: 0" class="p-1 text-white w-100 position-fixed text-center bg-danger">Vous êtes hors connexion :(</div>
</template>

<style scoped>

</style>
