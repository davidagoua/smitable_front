<template>
<div>
  <Button text class="p-button-text" @click="togglePanel" :aria-controls="'general_options_'+patient.id">
    <span :id="'general_options_'+patient.id" class="la la-ellipsis-v"></span>
  </Button>
  <Menu :model="options" :popup="true" ref="panel"></Menu>

  <Dialog modal v-model:visible="showRdvForm" @hide="closeDialog">
    <RdvForm :patient="props.patient"></RdvForm>
  </Dialog>

  <Dialog modal v-model:visible="showTestRapideForm" @hide="closeDialog">
    <TestRapideForm :patient="props.patient"></TestRapideForm>
  </Dialog>
</div>
</template>

<script setup>
import Button from "primevue/button";
import Menu  from "primevue/menu";
import {ref, defineProps, provide, toRaw} from "vue";
import {PrimeIcons} from "primevue/api";
import {useDialog} from "primevue/usedialog";
import RdvForm from "./RdvForm.vue";
import TestRapideForm from "./TestRapideForm.vue";
import Dialog from "primevue/dialog";


const props = defineProps({
  patient: {
    type: Object,
    default: () => {}
  }
})
const dialog = useDialog()
const showTestRapideForm = ref(false)
const showRdvForm = ref(false)
const panel = ref()


const options = ref([
  {
    label: 'Rendez-vous',
    icon: 'pi pi-calendar',
    command: (event) => {
      showRdvForm.value = true
    },
  },
  {
    label: 'Test rapide',
    icon: PrimeIcons.EYE,
    command: (event) => {
      showTestRapideForm.value = true
    }
  },
])

const togglePanel = (event, patient) => {
  panel.value.toggle(event)
}

const closeDialog = ()=>{
  showRdvForm.value = false
  showRdvForm.value = false
}
</script>

<style scoped>

</style>
