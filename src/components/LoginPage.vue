<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Haylee</h1>
        <p class="text-gray-500 text-sm mt-1">Sign in to your account</p>
      </div>

      <div class="mb-4">
        <label class="text-sm font-medium text-gray-700 block mb-2">Username</label>
        <input
          v-model="username"
          type="text"
          placeholder="emilys"
          class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-400"
        />
      </div>

      <div class="mb-6">
        <label class="text-sm font-medium text-gray-700 block mb-2">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="••••••••"
          class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-400"
        />
      </div>

      <p v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</p>

      <button
        @click="handleLogin"
        :disabled="loading"
        class="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
      >
        {{ loading ? 'Signing in...' : 'Sign In' }}
      </button>

      <div class="mt-4 bg-gray-50 rounded-lg p-3 text-center">
        <p class="text-xs text-gray-500">Demo credentials</p>
        <p class="text-xs text-gray-700 mt-1">emilys / emilyspass</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    console.log('Attempting login with:', username.value, password.value)
    await authStore.login({ username: username.value, password: password.value })
    console.log('Login successful, token:', localStorage.getItem('token'))
  } catch (e) {
    console.log('Login error:', e)
    error.value = 'Invalid username or password'
  } finally {
    loading.value = false
  }
}

</script>