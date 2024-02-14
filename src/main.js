// Setup
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/main.css'
import './index.css'
import 'primevue/resources/themes/aura-light-green/theme.css'


// Style
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret , faHouse,faCaretDown,faCalendarMinus,faGraduationCap,faPersonChalkboard,faSchool,faList,faGear} from '@fortawesome/free-solid-svg-icons'
import { faFacebook ,faGithub} from '@fortawesome/free-brands-svg-icons'
import 'material-icons/iconfont/material-icons.css';

// PrimeVue
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import Steps from 'primevue/steps';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Message from 'primevue/message';

// Vuex
import store from './store/store';

library.add(faGear,faFacebook,faGithub,faUserSecret,faHouse,faCaretDown,faCalendarMinus,faGraduationCap,faPersonChalkboard,faSchool,faList)

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('Panel', Panel);
app.component('Button', Button);
app.component('Steps', Steps);
app.component('Password', Password);
app.component('InputText', InputText);
app.component('Checkbox', Checkbox);
app.component('Message', Message);

app.use(PrimeVue);
app.use(store);
app.use(router).mount('#app');

