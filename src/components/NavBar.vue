<template>
  <nav class="h-16 flex items-center px-6 gap-4" style="background: #0D120E;">
    <span
      class="text-xl font-bold cursor-pointer"
      style="color: #E8E9E0; font-family: 'Alegreya Sans', serif;"
      @click="router.push('/')"
    >Haylee</span>
    <input
      v-model="searchQuery"
      @input="$emit('search', searchQuery)"
      type="text"
      placeholder="Search products..."
      class="flex-1 max-w-md mx-auto rounded-lg px-4 py-2 text-sm outline-none"
      style="background: #1a2a1c; color: #E8E9E0; border: 1px solid #45553D;"
    />
    <span
      @click="$emit('openCart')"
      class="text-sm cursor-pointer transition-colors"
      style="color: #E8E9E0;"
    >
      Cart
      <span class="text-xs px-2 py-0.5 rounded-full ml-1" style="background: #6D7E5F; color: #E8E9E0;">
        {{ cartStore.totalItems }}
      </span>
    </span>
    <button
      @click="themeStore.toggleDark()"
      class="text-sm transition-colors"
      style="color: #C4C8AC;"
    >
      {{ themeStore.isDark ? '☀️' : '🌙' }}
    </button>
    <button
      @click="handleLogout"
      class="text-sm transition-colors"
      style="color: #C4C8AC;"
    >
      Logout
    </button>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import { useThemeStore } from '../stores/theme'

const searchQuery = ref('')
const cartStore = useCartStore()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const router = useRouter()

defineEmits<{
  search: [query: string]
  openCart: []
}>()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>