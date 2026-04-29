import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import HomePage from '../views/HomePage.vue'
import ProductPage from '../views/ProductPage.vue'
import LoginPage from '../components/LoginPage.vue'
import AboutPage from '../views/AboutPage.vue'
import ContactPage from '../views/ContactPage.vue'
import CheckoutPage from '../views/CheckoutPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/landing', component: LandingPage },
  { path: '/login', component: LoginPage },
  { path: '/home', redirect: '/' },
  { path: '/product/:id', component: ProductPage },
  { path: '/about', component: AboutPage },
  { path: '/contact', component: ContactPage },
  { path: '/checkout', component: CheckoutPage, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router