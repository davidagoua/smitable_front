<script setup>
import {computed, onMounted, ref, watch, reactive} from "vue";
import Chart from "primevue/chart"
import useMyFetch from "../../compoables/useMyFetch.js";


let {data: stats} = await useMyFetch("statistiques/").json();
let { data: services } = await useMyFetch("services/").json();
let chart1 = reactive({
    data: {
        labels: services.value.map((s)=> s.nom),
        datasets: [
            {
                label: 'Maladies',
                data: services.value.map((s)=>s.consultation_count)
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
</script>


<template>
    <div class="row">
        <div class="col-md-8">
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h2 class="text-center">{{ stats?.patients}}</h2>
                            <h6 class="text-center">Patients</h6>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h2 class="text-center">{{stats?.prestations}}</h2>
                            <h6 class="text-center">Patients suivis</h6>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body ">
                            <h2 class="text-center">{{ stats?.personels}}</h2>
                            <h6 class="text-center">Personnels</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 mt-1">
                    <div class="card">
                        <div class="card-body text-center">
                            <h4>Nombre de patients par maladie et par sexe</h4>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 mt-1">
                    <div class="card">
                        <div class="card-body text-center">
                            <h4>Nombre de patients guerris par maladie et par sexe</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card">
                <div class="card-header">

                    <h4 class="card-title">Patients par services</h4>
                </div>
                <div class="card-body">
                    <div class="card-content">
                        <div id="line-chart" class="height-300 lineChart lineChartShadow">
                            <table class="table">
                                <tr>
                                    <th>Service</th>
                                    <th>Patients</th>
                                    <th>Guéris</th>
                                </tr>
                                <tr v-for="service in services" :key="service.id">
                                    <td>{{service.nom}}</td>
                                    <td>{{service.consultation_count}}</td>
                                    <td>0</td>
                                </tr>
                            </table>
                        </div>
                        <div>
                            <Chart type="bar" :data="chart1.data" :options="chart1.options"  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
