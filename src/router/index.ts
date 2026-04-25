import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import HomePage from '../views/HomePage.vue'
import ProductPage from '../views/ProductPage.vue'
import LoginPage from '../components/LoginPage.vue'
import AboutPage from '../views/AboutPage.vue'
import ContactPage from '../views/ContactPage.vue'
import CheckoutPage from '../views/CheckoutPage.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: LoginPage },
  { path: '/home', component: HomePage },
  { path: '/product/:id', component: ProductPage },
  { path: '/about', component: AboutPage },
  { path: '/contact', component: ContactPage },
  { path: '/checkout', component: CheckoutPage }
]

export default createRouter({ history: createWebHistory(), routes })