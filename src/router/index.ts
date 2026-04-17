import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import HomePage from '../views/HomePage.vue'
import ProductPage from '../views/ProductPage.vue'
import LoginPage from '../components/LoginPage.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: LoginPage },
  { path: '/home', component: HomePage },
  { path: '/product/:id', component: ProductPage }
]

export default createRouter({ history: createWebHistory(), routes })