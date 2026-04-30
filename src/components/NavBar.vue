<template>
  <nav class="nav">
    <!-- LEFT -->
    <div class="nav-left">
      <input
        v-if="showSearch"
        v-model="searchQuery"
        @input="$emit('search', searchQuery)"
        type="text"
        placeholder="Search Products Here"
        class="search"
      />
    </div>

    <!-- CENTER -->
    <div class="nav-center" @click="router.push('/')">
      Haylee
    </div>

    <!-- RIGHT -->
    <div class="nav-right">
      <!-- CART -->
      <span class="cart" @click="$emit('openCart')">
        Cart
        <span class="badge">{{ cartStore.totalItems }}</span>
      </span>

      <!-- LOGIN / LOGOUT -->
      <span class="auth-btn" @click="handleAuth">
        {{ authStore.isLoggedIn ? 'Logout' : 'Login' }}
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
import { useAuthStore } from '../stores/auth'

withDefaults(defineProps<{
  showSearch?: boolean
}>(), {
  showSearch: true
})

const searchQuery = ref('')
const cartStore = useCartStore()
const themeStore = useThemeStore()
const authStore = useAuthStore()
const router = useRouter()

defineEmits<{
  search: [query: string]
  openCart: []
}>()

function handleAuth() {
  if (authStore.isLoggedIn) {
    authStore.logout()
    router.push('/')
  } else {
    router.push('/login')
  }
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
  font-size: 13px;
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
  gap: 20px;
}

/* CART */
.cart {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #E8E9E0;
  font-weight: 500;
}

.badge {
  background: #6D7E5F;
  color: white;
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 50%;
  line-height: 1.4;
}

/* AUTH */
.auth-btn {
  font-size: 14px;
  color: #E8E9E0;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s;
}

.auth-btn:hover {
  opacity: 0.7;
}

/* THEME */
.icon {
  font-size: 18px;
  cursor: pointer;
  color: #E8E9E0;
  background: none;
  border: none;
}

/* RESPONSIVE */
@media (max-width: 600px) {
  .nav-center {
    font-size: 32px;
  }

  .search {
    width: 160px;
  }
}
</style>