import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入ele
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vueEditor from 'vue-editor-interline'
Vue.use(ElementUI)

Vue.use(vueEditor)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
