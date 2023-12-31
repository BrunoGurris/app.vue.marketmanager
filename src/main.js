import 'primevue/resources/themes/lara-light-green/theme.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import api from './services/axios'
import ToastService from 'primevue/toastservice'
import { useToast } from 'primevue/usetoast'

import Button from 'primevue/button'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'
import Listbox from 'primevue/listbox'
import Row from 'primevue/row'
import Toast from 'primevue/toast'

const app = createApp(App)

app.config.globalProperties.$api = api
app.config.globalProperties.$toast = useToast

app.use(router)
app.use(PrimeVue)
app.use(ToastService)

app.component('Button', Button)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('DataTable', DataTable)
app.component('Dialog', Dialog)
app.component('Divider', Divider)
app.component('InputText', InputText)
app.component('Listbox', Listbox)
app.component('Row', Row)
app.component('Toast', Toast)

app.mount('#app')