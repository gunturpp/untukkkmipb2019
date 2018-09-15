import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Landing from '@/components/Landing'
import firebaseConfig from '@/components/firebaseConfig'

firebase.initializeApp(firebaseConfig)

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    }
  ]
})
