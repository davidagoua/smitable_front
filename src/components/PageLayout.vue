<template>
  <Nav/>

  <MainMenu/>

  <div class="app-content content">
    <div class="content-wrapper">
      <div  class="content-wrapper-before"></div>
      <div class="content-header row">
        <div class="content-header-left col-md-4 col-12 mb-2">
          <h3 class="content-header-title">{{ pageTitle }}</h3>
        </div>
        <div class="content-header-right col-md-8 col-12">

        </div>
      </div>
      <div class="content-body">
        <slot/>
      </div>
    </div>
  </div>

</template>

<script setup>
import {defineProps} from 'vue'
import Nav from "./Nav.vue";
import MainMenu from "./MainMenu.vue";
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import {useAuthStore} from "../stores/auth.js";

const router = useRouter()
const store = useAuthStore()

onMounted(() => {
  if (!store.isAuth) {
    router.push('/connexion')
  }
})


const props = defineProps({
  pageTitle: {
    type: String,
    default: 'Home'
  }
})
</script>

<style scoped>

</style>
