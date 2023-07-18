import {createRouter, createWebHashHistory} from "vue-router";


const routes = [
    {path:'/', component: () => import('./pages/home.vue')},
    {path:'/connexion', component: () => import('./pages/login.vue')},
    {path:'/pharmacie/list-medicaments', component: () => import('./pages/pharmacie/ListMedicaments.vue')},
    {path:'/pharmacie/ordonance', component: () => import('./pages/pharmacie/Ordonances.vue')},
    {path:'/hospitalisation/liste', component: () => import('./pages/hospitalisation/HospitalisationList.vue')},
    {path:'/hospitalisation/unites', component: () => import('./pages/hospitalisation/UniteList.vue')},
    {path: '/new-patient', component: () => import('./pages/acceuil/NewPatient.vue')},
    {path: '/patient-attente', component: () => import('./pages/acceuil/PatientAttente.vue')},
    {path: '/recherche-global', component: () => import('./pages/RecherchePatient.vue')},
    {path: '/patient-urgence', component: () => import('./pages/acceuil/PatientUrgence.vue')},
    {path: '/new-urgence', component: ()=>import('./pages/acceuil/NewUrgence.vue')},
    {path: '/rdv-liste', component: ()=>import('./pages/acceuil/RendezVousList.vue')},
    {path: '/rdv-new', component: ()=>import('./pages/acceuil/NewRdv.vue')},
    {path: '/service/liste/:service_id/:service_name', component: ()=>import('./pages/services/ListPatient.vue')},
    {path: '/dossier/:id', component: ()=> import('./pages/dossier.vue')},
    {path: '/analyse/encours', component: ()=> import('./pages/analyse/AnalyseEnCour.vue')}

];


const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
