import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './pages/flow/index.css'

Vue.use(ElementUI, {
  size: 'mini',
  zIndex: 3000
})

Vue.config.productionTip = false

const bus = new Vue()
Vue.prototype.$bus = bus

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
