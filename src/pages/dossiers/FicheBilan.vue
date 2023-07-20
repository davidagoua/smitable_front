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
              <InputText class="form-control" />
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
            <div class="form-group">
              <label for="">Glycèmie ?</label>
              <SelectButton :options="['Oui','Non']"></SelectButton>
            </div>
            <div class="form-group">
              <label for="">Creatininémie ?</label>
              <SelectButton :options="['Oui','Non']"></SelectButton>
            </div>
            <div class="form-group">
              <label for="">Transaminases ?</label>
              <SelectButton :options="['Oui','Non']"></SelectButton>
            </div>



          </Fieldset>
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
</script>

<style scoped>

</style>
