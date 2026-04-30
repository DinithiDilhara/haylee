<template>
  <div
    class="min-h-screen flex items-center justify-center p-4"
    :style="{ backgroundImage: `url(${im2})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <div
      class="rounded-2xl p-8 w-full max-w-md"
      style="background: rgba(255,255,255,0.15); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.3);"
    >
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-black">Haylee</h1>
        <p class="text-black text-sm mt-1 opacity-80">Sign in to your account</p>
      </div>
      <div class="mb-4">
        <label class="text-sm font-medium text-black block mb-2">Email</label>
        <input
          v-model="username"
          type="text"
          placeholder="user@gmail.com"
          class="w-full rounded-lg px-4 py-3 text-sm outline-none placeholder-transparent"
          style="background: rgba(255,255,255,0.85); border: 1px solid rgba(255,255,255,0.4);"
        />
      </div>
      <div class="mb-6">
        <label class="text-sm font-medium text-black block mb-2">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="••••••••"
          class="w-full rounded-lg px-4 py-3 text-sm outline-none placeholder-transparent"
          style="background: rgba(232, 225, 225, 0.91); border: 1px solid rgba(255,255,255,0.4);"
        />
      </div>
      <p v-if="error" class="text-red-300 text-sm mb-4">{{ error }}</p>
      <button
        @click="handleLogin"
        :disabled="loading"
        class="w-full text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
        style="background: rgba(6, 52, 23, 0.75);"
      >
        {{ loading ? 'Signing in...' : 'Sign In' }}
      </button>
      <div
        class="mt-4 rounded-lg p-3 text-center"
        style="background: rgba(255,255,255,0.2);"
      >
        <p class="text-xs text-white opacity-70">Demo credentials</p>
        <p class="text-xs text-white mt-1">emilys / emilyspass</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import im2 from '../assets/im2.jpeg'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true

  try {
    await authStore.login({
      username: username.value,
      password: password.value
    })

    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch (e) {
    error.value = 'Invalid username or password'
  } finally {
    loading.value = false
  }
}
</script>