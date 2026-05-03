import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuthResponse, LoginCredentials } from '../types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthResponse | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))

  const isLoggedIn = computed(() => !!token.value)

  async function login(credentials: LoginCredentials) {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    if (!response.ok) throw new Error('Invalid credentials')
    const data: AuthResponse = await response.json()
    user.value = data
    token.value = data.accessToken
    localStorage.setItem('token', data.accessToken)
  }

  function loginLocal(fakeToken: string) {
    token.value = fakeToken
    localStorage.setItem('token', fakeToken)
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  return { user, token, isLoggedIn, login, loginLocal, logout }
})