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
import Tooltip from 'primevue/tooltip';

import AutoComplete from 'primevue/autocomplete'
import Button from 'primevue/button'
import Chart from 'primevue/chart'
import Checkbox from 'primevue/checkbox'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import Dropdown from 'primevue/dropdown'
import FileUpload from 'primevue/fileupload'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Listbox from 'primevue/listbox'
import MultiSelect from 'primevue/multiselect'
import RadioButton from 'primevue/radiobutton'
import Row from 'primevue/row'
import Sidebar from 'primevue/sidebar'
import Toast from 'primevue/toast'

const app = createApp(App)

app.config.globalProperties.$api = api
app.config.globalProperties.$toast = useToast

app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.directive('tooltip', Tooltip);

app.component('AutoComplete', AutoComplete)
app.component('Button', Button)
app.component('Chart', Chart)
app.component('Checkbox', Checkbox)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('DataTable', DataTable)
app.component('Dialog', Dialog)
app.component('Divider', Divider)
app.component('Dropdown', Dropdown)
app.component('FileUpload', FileUpload)
app.component('InputGroup', InputGroup)
app.component('InputGroupAddon', InputGroupAddon)
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.component('Listbox', Listbox)
app.component('MultiSelect', MultiSelect)
app.component('RadioButton', RadioButton)
app.component('Row', Row)
app.component('Sidebar', Sidebar)
app.component('Toast', Toast)

app.mount('#app')