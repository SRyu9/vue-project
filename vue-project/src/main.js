import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Notifications from '@kyvg/vue3-notification'
import router from './router'
import store from '@/store'
import axios from 'axios'
import VueAxios from 'vue-axios'


loadFonts()

createApp(App).use(router)
  .use(store)
  .use(vuetify)
  .use(Notifications)
  .use(VueAxios, axios)
  .mount('#app')