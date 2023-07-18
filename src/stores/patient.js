import {defineStore} from "pinia";
import client from "../api/axios_base";



export const usePatientStore = defineStore({
    id: "patient",
    state: () => ({
        patients: [],
    }),
    getters: {
        getPatients() {
            return this.patients
        },
        getPatientUrgence() {
            return this.patients.filter(patient => patient.urgence === true)
        }
    },
    actions: {
        async addPatient(patient) {
            try{
                const response = await client.post('patients/', patient)
                return response.data
            }catch (e) {
                console.log(e)
            }
        },
        async fetchPatients() {
            try{
                const response = await client.get('patients/')
                this.patients = response.data
                console.log(this.patients)
            }catch (e) {
                console.log(e)
            }
        },
        async fetchRdvs() {
            try {
                const response = await client.get('rdv/')
                console.log(response.data)
                return response.data
            }catch (e) {
                console.error(e)
            }
        },
        async addRdv(rdv) {
            try {
                const response = await client.post('rdv/', rdv)
                return response.data
            }catch (e) {
                console.error(e)
            }
        }
    }
})
