import axios from "axios";
import {defineStore} from "pinia";
import client from "../api/axios_base";

export const useConsultationStore = defineStore({
    id: 'consultation',
    state: () => ({
        consultations: []
    }),
    getters: {
        consultationsAttente() {
            return this.consultations.filter(consultation => consultation.status === 0);
        },
    },
    actions: {
        async fetchConsultations() {
            console.log('fetching consultations')
            try{
                const response = await client.get('consultations/');
                this.consultations = response.data;
            }catch (e) {
                console.log(e)
            }
        },

        async addConsultation(consultation) {
            try{
                const response = await client.post('consultations/', consultation)
                console.log(response)
                return response.data
            }catch (e) {
                console.log(e)
            }
        },

        async addContantes(consultationId, constantes){
            try{
                constantes.consultation_id = consultationId
                const {data} = await client.post('constantes/', constantes)
                console.log(data)
                return data
            }catch (e) {
                cnosole.log(e)
            }
        },

        async setState(id, state){
            this.consultations.filter()
        },

        async fetchConsultationsForService(service_id){
            try{
                const {data} = await client.get(`services/${service_id}/consultations/`)
                console.log(data)
                return data;
            }catch (e) {
                console.log(e)
            }
        }

    },

})
