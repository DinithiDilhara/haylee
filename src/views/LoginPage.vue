<template>
  <div class="login-wrapper">
    <!-- Left: Image + text -->
    <div class="login-left">
      <img :src="loginBg" alt="Haylee lifestyle" class="login-bg-img" />
      <div class="login-left-text">
        <p>Shop the</p>
        <p>product you love</p>
      </div>
    </div>

    <!-- Right: Form -->
    <div class="login-right">
      <div class="login-card">
        <h1>Welcome back</h1>
        <p class="subtitle">Sign into your account</p>

        <div class="field">
          <label>Email address</label>
          <input
            v-model="username"
            type="text"
            placeholder="Enter your mail"
          />
        </div>

        <div class="field">
          <label>Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <p v-if="error" class="error-msg">{{ error }}</p>

        <button @click="handleLogin" :disabled="loading" class="sign-btn">
          {{ loading ? 'Signing in...' : 'Sign in' }}
        </button>

        <div class="demo-hint">
          <p>Demo: <strong>emilys</strong> / <strong>emilyspass</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import loginBg from '../assets/loginpage.png'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  if (!username.value.trim() || !password.value.trim()) {
    error.value = 'Please enter your username and password.'
    return
  }
  loading.value = true
  try {
    await authStore.login({
      username: username.value,
      password: password.value,
    })
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch (e) {
    error.value = 'Invalid username or password.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrapper {
  display: grid;
  grid-template-columns: 55% 45%;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: #f5ede0;
}

/* ── LEFT SIDE ── */
.login-left {
  position: relative;
  overflow: hidden;
  height: 100vh;
}

.login-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left center;
  display: block;
}

.login-left-text {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: Georgia, serif;
  font-size: 50px;
  font-weight: 500;
  color: #16452f;
  line-height: 1.3;
  white-space: nowrap;
}

/* ── RIGHT SIDE ── */
.login-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 48px;
  background: #f5ede0;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
}

.login-card {
  background: white;
  border-radius: 16px;
  padding: 48px 44px;
  width: 100%;
  max-width: 100%;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.login-card h1 {
  font-size: 28px;
  font-weight: 700;
  color: #111;
  text-align: center;
  margin-bottom: 6px;
}

.subtitle {
  text-align: center;
  font-size: 13px;
  color: #888;
  margin-bottom: 32px;
}

/* ── FIELDS ── */
.field {
  margin-bottom: 20px;
}

.field label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #222;
  margin-bottom: 6px;
}

.field input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.field input:focus {
  border-color: #16452f;
}

.field input::placeholder {
  color: #bbb;
}

/* ── ERROR ── */
.error-msg {
  color: #c0392b;
  font-size: 13px;
  margin-bottom: 12px;
  text-align: center;
}

/* ── BUTTON ── */
.sign-btn {
  width: 100%;
  padding: 14px;
  background: #16452f;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;
}

.sign-btn:hover {
  background: #1e5c3f;
}

.sign-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ── DEMO HINT ── */
.demo-hint {
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
  color: #999;
}

.demo-hint strong {
  color: #555;
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .login-wrapper {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 100vh;
  }

  .login-left {
    height: 240px;
  }

  .login-left-text {
    font-size: 24px;
  }

  .login-right {
    height: auto;
    padding: 40px 24px;
  }

  .login-card {
    padding: 32px 24px;
  }
}
</style>