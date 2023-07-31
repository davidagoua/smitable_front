<template>
  <PageLayout page-title="Liste des unités d'hospitalisations">
    <section class="card">
      <div class="card-body">
        <template v-for="unite in unites" :key="unite.id">
          <div class="">
            <div class="w-100 p-2 border text-center">
              {{ unite.nom }}

            </div>
            <div class="row">
              <div class="col " v-for="chambre in unite.chambres" :key="chambre.id">
                <div class="p-2 border text-center">{{ chambre.nom }}</div>
                <div class="row align-items-stretch">
                  <div class="col " v-for="box in chambre.boxes" :key="box">
                    <div class="p-1 border text-center text-white"
                         :style="{'background-color': box.occuper ? '#ff7675' : '#636e72'}">
                      <small>{{ box.nom }} ({{ box.capacite }})</small><br>
                      <div v-if="box.occupant">
                        <router-link :to="{name:'dossier_patient', params: {id: box.occupant?.id}}">
                          <small>{{ box.occupant?.code_patient }}</small>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>


    </section>
  </PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
import useMyFetch from "../../compoables/useMyFetch.js";

const {data: unites} = useMyFetch('unites/').json()
</script>

<style scoped>

</style>
