import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

window.Dash = new Vue({
  render: h => h(App),
}).$mount('#app')
// console.log(w)
