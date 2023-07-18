<template>
<div>
  <Button text @click="togglePanel">{{ code_patient}}</Button>
  <OverlayPanel style="width: 500px" ref="op">
    <div>
      <div class="row">
        <div class="col-3 text-center">
          <small>Poids</small>
          <div>{{ constante.poids}}</div>
        </div>
        <div class="col text-center">
          <h3 class="pi pi-user" style="font-size: 3em"></h3>
        </div>
        <div class="col-3 text-center">
          <small>Taille</small>
          <div>{{ constante.taille}}</div>
        </div>
      </div>
      <div class="row">

        <div class="col text-center">
          <small for="">IMC</small>
          <div>{{ Math.round(constante.imc)}}</div>
          <div>{{ constante.imc_status}}</div>
        </div>
        <div class="col text-center">
          <small for="">Pouls</small>
          <div>{{ constante.pouls}}</div>
          <div>{{ constante.pouls_status}}</div>
        </div>
        <div class="col text-center">
          <small for="">Température</small>
          <div>{{ constante.temperature}}</div>
          <div>{{ constante.temperature_status}}</div>
        </div>
        <div class="col text-center">
          <small for="">Tension</small>
          <div>{{ constante.tension}}</div>
          <div>{{ constante.tension_status}}</div>
        </div>
      </div>
    </div>
  </OverlayPanel>
</div>
</template>

<script setup>
import OverlayPanel from "primevue/overlaypanel";
import {defineProps, ref} from 'vue'

const op = ref()

const props = defineProps({
  constante: {
    type: Object,
    required: true
  },
  code_patient: {
    type: String,
    required: true
  }
})

const togglePanel = () => {
  op.value.toggle(event)
}
</script>

<style scoped>

</style>
