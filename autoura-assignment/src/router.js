import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import restaurants from './views/restaurants.vue'
import AccessiblePOI from './views/accessiblepoi.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/accessiblepoi',
      name: 'accessiblepoi',
      component: AccessiblePOI
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: restaurants

    }
  ]
})
