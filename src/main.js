import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router/index'
import 'primevue/resources/themes/aura-light-green/theme.css'
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret , faHouse,faCaretDown,faCalendarMinus,faGraduationCap,faPersonChalkboard,faSchool,faList} from '@fortawesome/free-solid-svg-icons'
import { faFacebook ,faGithub} from '@fortawesome/free-brands-svg-icons'
import Panel from 'primevue/panel';
import Steps from 'primevue/steps';
import 'material-icons/iconfont/material-icons.css';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';

library.add(faFacebook,faGithub,faUserSecret,faHouse,faCaretDown,faCalendarMinus,faGraduationCap,faPersonChalkboard,faSchool,faList)
const app = createApp(App);
app.component('Panel', Panel);
app.component('Button', Button);
app.component('Steps', Steps);
app.component('Password', Password);
app.component('InputText', InputText);
app.component('Checkbox', Checkbox);
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(PrimeVue);
app.use(router).mount('#app');

