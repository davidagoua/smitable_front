<template>
<PageLayout page-title="Fiche de bilan initial pour prise en charge ">

  <section class="card">
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <div></div>
        <div>
          <Button size="small">Mettre à jour</Button>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-6 d-flex justify-content-between">
          <div class="form-group">
            <label for="">Nom du centre</label>
            <InputText class="form-control" />
          </div>
          <div class="form-group">
            <label for="">Code du centre</label>
            <InputText class="form-control" />
          </div>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-6">
          <Fieldset :toggleable="true" >
            <div class="form-group">
              <label for="">Medecin prescipteur</label>
              <InputText  class="form-control" />
            </div>
            <div class="form-group">
              <label for="">LAB 01 (Date de prelevement)</label>
              <InputText type="date" class="form-control" />
            </div>
            <div class="form-group">
              <label for="">LAB 02 (SUJETNO)</label>
              <InputText  class="form-control" />
            </div>
            <div class="form-group">
              <label for="">LAB 03 (LABNO)</label>
              <InputText  class="form-control" />
              <small>Numero attribué par le laboratoire</small>
            </div>
            <div class="form-group">
              <label for="">LAB 04 (SEXE)</label>
              <SelectButton :options="['Masculin','Feminin']"></SelectButton>
            </div>
            <div class="form-group">
              <label for="">LAB 05 (Date de naissance)</label>
              <InputText type="date" class="form-control" />
            </div>
          </Fieldset>
        </div>
        <div class="col-md-6">
          <Fieldset legend="Biochimie Hematologie Immunologie" :toggleable="true" >
            <div class="form-group">
              <label for="">Tube Sec prélévé ?</label>
              <SelectButton :options="['Oui','Non']"></SelectButton>
            </div>
            <div class="form-group">
              <label for="">Serologie VIH a faire ?</label>
              <SelectButton :options="['Oui, pour la première fois','Non, pour les visites suivantes']"></SelectButton>
            </div>
            <div class="row">
              <div class="form-group col-4">
                <label for="">Glycèmie ?</label>
                <SelectButton :options="['Oui','Non']"></SelectButton>
              </div>

              <div class="form-group col-4">
                <label for="">Creatininémie ?</label>
                <SelectButton :options="['Oui','Non']"></SelectButton>
              </div>
              <div class="form-group col-4">
                <label for="">Transaminases ?</label>
                <SelectButton :options="['Oui','Non']"></SelectButton>
              </div>
              <div class="form-group col-4">
                <label for="">Tube EDTA prelévé ?</label>
                <SelectButton :options="['Oui','Non']"></SelectButton>
              </div>
              <div class="form-group col-4">
                <label for="">NFS ?</label>
                <SelectButton :options="['Oui','Non']"></SelectButton>
              </div>
              <div class="form-group col-4">
                <label for="">CD4/CD8</label>
                <SelectButton :options="['Oui','Non']"></SelectButton>
              </div>
            </div>



          </Fieldset>
          <Fieldset class="mt-1" legend="Autres examens">
            <div class="form-group">
              <label>Charge virale plasmique ?</label>
              <SelectButton
                :options="[
                    'Oui, Si necessaire en cas d\'echec thérapeutique',
                    'non',
                    'NA / Patient non encore sous ARV thérapie'
                ]"
              ></SelectButton>
            </div>
            <div class="form-group">
              <label>Test urinaire de grossesse</label>
              <SelectButton
                :options="[
                    'Pour les femmes, test a la demande',
                    'non',
                ]"
              ></SelectButton>
            </div>
            <div class="form-group">
              <label>Status VIH ?</label>
              <SelectButton
                :options="[
                    'VIH 1',
                    'VIH 2',
                    'VIH 1+2',
                ]"
              ></SelectButton>
            </div>
          </Fieldset>
        </div>
      </div>
      <div class="d-flex justify-content-between mt-1">
        <div>

        </div>
        <div>
          <Button size="small" class="btn-darken-1">
            <i class="pi pi-download"></i>&nbsp;
            Imprimer
          </Button>&nbsp;&nbsp;
          <Button size="small">Envoyer</Button>
        </div>

      </div>
    </div>
  </section>
</PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
import Fieldset from 'primevue/fieldset';
import SelectButton from "primevue/selectbutton";
import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive, watch} from "vue";
import useMyFetch from "../../compoables/useMyFetch.js";


let patient = reactive({})
const route = useRoute()

onMounted(async()=>{
  console.log(route.params.id)
  const {data, error} = await useMyFetch('patients/'+route.params.id+'/').json();
  patient = data.value;
})

watch(patient, (value)=>{
  console.log(value)
})
</script>

<style scoped>

</style>
