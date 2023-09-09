import './assets/css/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { Howl } from 'howler'
import vClickOutside from 'v-click-outside';
const { bind, unbind } = vClickOutside.directive;

import { createApp } from 'vue'
import App from './vue/App.vue'

const app = createApp(App)

//Custom Directives
app.directive('click-outside', {
  mounted(el, bindling) {
    bind(el, { value: bindling.value });
  },
  beforeUnmount(el) {
    unbind(el);
  },
});

app.mount('#app') //Mount the App
