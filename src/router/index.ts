import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProductPage from '../views/ProductPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/product/:id', component: ProductPage }
]

export default createRouter({ history: createWebHistory(), routes })