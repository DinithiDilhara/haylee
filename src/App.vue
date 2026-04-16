<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <LoginPage v-if="!authStore.isLoggedIn" />
    <template v-else>
      <RouterView />
      <CartDrawer v-if="showCart" @close="showCart = false" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CartDrawer from './components/CartDrawer.vue'
import LoginPage from './components/LoginPage.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const showCart = ref(false)
</script>