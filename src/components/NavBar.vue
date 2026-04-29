<template>
  <nav class="nav">

    <!-- LEFT -->
    <div class="nav-left">
      <input
        v-if="showSearch"
        v-model="searchQuery"
        @input="$emit('search', searchQuery)"
        type="text"
        placeholder="Search products..."
        class="search"
      />
    </div>

    <!-- CENTER -->
    <div class="nav-center" @click="router.push('/')">
      Haylee
    </div>

    <!-- RIGHT -->
    <div class="nav-right">

      <!-- USER ICON -->
      <span class="icon" @click="goToLogin">
        👤
      </span>

      <!-- CART -->
      <span class="cart" @click="$emit('openCart')">
        🛒
        <span class="badge">{{ cartStore.totalItems }}</span>
      </span>

      <!-- THEME -->
      <button @click="themeStore.toggleDark()" class="icon">
        {{ themeStore.isDark ? '☀️' : '🌙' }}
      </button>

    </div>

  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useThemeStore } from '../stores/theme'

withDefaults(defineProps<{
  showSearch?: boolean
}>(), {
  showSearch: true
})

const searchQuery = ref('')
const cartStore = useCartStore()
const themeStore = useThemeStore()
const router = useRouter()

defineEmits<{
  search: [query: string]
  openCart: []
}>()

function goToLogin() {
  router.push('/login')
}
</script>

<style scoped>
.nav {
  height: 70px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 20px;
  background: #0D120E;
}

/* LEFT */
.nav-left {
  display: flex;
  align-items: center;
}

.search {
  width: 260px;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: white;
  color: #222;
}

/* CENTER */
.nav-center {
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  font-family: 'Alegreya Sans', serif;
  color: #E8E9E0;
  cursor: pointer;
}

/* RIGHT */
.nav-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 18px;
}

/* ICONS */
.icon {
  font-size: 18px;
  cursor: pointer;
  color: #E8E9E0;
}

/* CART */
.cart {
  position: relative;
  cursor: pointer;
  font-size: 18px;
}

.badge {
  position: absolute;
  top: -6px;
  right: -10px;
  background: #6D7E5F;
  color: white;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 50%;
}
</style>