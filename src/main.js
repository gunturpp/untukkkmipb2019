// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// src https://bootstrap-vue.js.org/docs
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import VueResource from 'vue-resource'
// npm library
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.config.productionTip = false

// make custom tag in each component to App.vue
let app
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App }
    })
  }
})
