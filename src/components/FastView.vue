<script setup>
import {useOverviewState} from "../stores/overview.js";
import {computed, ref, watch} from "vue";
import Sidebar from "primevue/sidebar";
import Toolbar from "primevue/toolbar";
import {useConstanteForm} from "../compoables/useConstanteForm.js";
import Chart from 'primevue/chart';
import SpeedDial from 'primevue/speeddial'


const {selectedPatient, isShowed} = await useOverviewState()

let constante = ref(()=>{
  if(selectedPatient.value.constante_set.length <= 0){
    return false
  }
  return selectedPatient.value.constante_set[selectedPatient.value.constante_set.length - 1]
})

const constanteForm = useConstanteForm()
constanteForm.onSubmit((value)=>{
  console.log(value)
  constante = ref(value)
})

const speedDialItems = ref([
  {label: "Constante", command: ()=>constanteForm.selectItem(selectedPatient), icon: 'pi pi-home'},
  {label: "Dose", icon: 'pi -pi-home'}
])
</script>
<template>
  <Sidebar style="z-index: 1000; width: 800px" v-model:visible="isShowed" @close="isShowed = false " position="right">
      <div class="d-flex flex-column h-100">
          <div class="flex-grow-1">

            <div v-if="constante">
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
            <div v-else class="text-center">Aucunes constantes enregistrées</div>
            <div>
              <table>
                <tr>
                  <td v-for="(constantes, index) in selectedPatient.constante_set" :key="index">
                    {{ selectedPatient.created_at}}
                  </td>
                </tr>
                <tr>
                  <td v-for="(constantes, index) in selectedPatient.constante_set" :key="index">
                    {{ constantes.temperature}}
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="text-right flex-grow-1 w-full">
            <SpeedDial class="align-rigth" :models="items" direction="left"/>
          </div>

      </div>
  </Sidebar>
</template>


<style scoped>

</style>
