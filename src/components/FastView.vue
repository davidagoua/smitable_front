<template>
  <Sidebar style="z-index: 1000; width: 600px" v-model:visible="isShowed" @close="isShowed = false " position="right">
      <div class="d-flex flex-column h-100">
          <div class="flex-grow-1"></div>
          <Toolbar>
              <template #start>
                  <Button label="constantes" icon="pi pi-plus" size="small" />&nbsp;
                  <Button label="dose" icon="pi pi-plus" size="small" />
              </template>
          </Toolbar>
      </div>
  </Sidebar>
</template>

<script setup>
import {useOverviewState} from "../stores/overview.js";
import {computed, watch} from "vue";
import Sidebar from "primevue/sidebar";
import Toolbar from "primevue/toolbar";

const {showSidebar, selectedPatient, isShowed} = useOverviewState()
watch(isShowed, (value)=>{
  console.log(selectedPatient.value)
})

</script>

<style scoped>

</style>
