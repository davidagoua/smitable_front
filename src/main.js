import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice'
import "primevue/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import router from "./routes.js";
import InputText from "primevue/inputtext";
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Dialog from "primevue/dialog";
import HighchartsVue from 'highcharts-vue'
import ConfirmationService from 'primevue/confirmationservice';

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
app.use(DialogService);
app.use(pinia);
app.use(router);
app.use(HighchartsVue);
app.component(DataTable);
app.component(Column);
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('InputText', InputText);
app.mount('#app')
