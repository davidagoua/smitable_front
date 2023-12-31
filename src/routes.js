import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import {useAuthStore} from "./stores/auth.js";


const routes = [
    {path:'/connexion', component: () => import('./pages/login.vue')},
    {
        path: '/',
        component: () => import('./pages/Admin.vue'),
        auth: true,
        children: [
            {path:'/', component: () => import('./pages/home.vue')},
            {path:'/pharmacie/list-medicaments', component: () => import('./pages/pharmacie/ListMedicaments.vue')},
            {path:'/pharmacie/ordonance', component: () => import('./pages/pharmacie/Ordonances.vue')},
            {path:'/hospitalisation/liste', component: () => import('./pages/hospitalisation/HospitalisationList.vue')},
            {path:'/hospitalisation/unites', component: () => import('./pages/hospitalisation/UniteList.vue')},
            {path: '/new-patient/:patient_id?', component: () => import('./pages/acceuil/NewPatient.vue')},
            {path: '/patient-attente', component: () => import('./pages/acceuil/PatientAttente.vue')},
            {path: '/recherche-global', component: () => import('./pages/RecherchePatient.vue')},
            {path: '/patient-urgence', component: () => import('./pages/acceuil/PatientUrgence.vue')},
            {path: '/new-urgence', component: ()=>import('./pages/acceuil/NewUrgence.vue')},
            {path: '/rdv-liste', component: ()=>import('./pages/acceuil/RendezVousList.vue')},
            {path: '/rdv-new', component: ()=>import('./pages/acceuil/NewRdv.vue')},
            {path: '/service/liste/:service_id/:service_name', component: ()=>import('./pages/services/ListPatient.vue')},
            {path: '/dossier/:id', component: ()=> import('./pages/dossier.vue'), name: 'dossier_patient'},
            {path: '/analyse/encours', component: ()=> import('./pages/analyse/AnalyseEnCour.vue')},
            {path: '/fiche/bilan-initial/:id/:analyse_id?', component: ()=> import('./pages/dossiers/FicheBilan.vue')},
            {path: '/analyse/analyse-termines', component: ()=> import('./pages/analyse/AnalyseTermines.vue')},
            {path: '/analyse/prelevements', component: ()=> import('./pages/analyse/Prelevements.vue')},
            {path: '/settings/personnel', component: ()=> import('./pages/settings/personnel.vue')},
        ]
    }

];


const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (to.path !== '/connexion' && !authStore.isLoggedIn) {
        next('/connexion');
    } else {
        next();
    }
})


export default router;
