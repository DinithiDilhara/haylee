<template>
  <div class="signup-wrapper">
    <!-- Left: Image + text -->
    <div class="signup-left">
      <img :src="loginBg" alt="Haylee lifestyle" class="signup-bg-img" />
      <div class="signup-left-text">
        <p>Create your</p>
        <p>account</p>
      </div>
    </div>

    <!-- Right: Form -->
    <div class="signup-right">
      <div class="signup-card">
        <h1>Create account</h1>
        <p class="subtitle">
          Already have an account?
          <span @click="router.push('/login')" class="link">Sign in</span>
        </p>

        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

        <div class="name-row">
          <div class="field">
            <label>First name</label>
            <input v-model="form.firstName" type="text" placeholder="Enter your first name" />
            <span v-if="errors.firstName" class="field-error">{{ errors.firstName }}</span>
          </div>
          <div class="field">
            <label>Last name</label>
            <input v-model="form.lastName" type="text" placeholder="Enter your last name" />
            <span v-if="errors.lastName" class="field-error">{{ errors.lastName }}</span>
          </div>
        </div>

        <div class="field">
          <label>Email address</label>
          <input v-model="form.email" type="email" placeholder="Enter your email address" />
          <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
        </div>

        <div class="field">
          <label>Password</label>
          <input v-model="form.password" type="password" placeholder="Create a password" />
          <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
        </div>

        <div class="field">
          <label>Confirm Password</label>
          <input v-model="form.confirmPassword" type="password" placeholder="Confirm your password" />
          <span v-if="errors.confirmPassword" class="field-error">{{ errors.confirmPassword }}</span>
        </div>

        <button @click="handleSignup" class="sign-btn">Create account</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import loginBg from '../assets/loginpage.png'

const router = useRouter()
const authStore = useAuthStore()

const errorMsg = ref('')

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errors = reactive<Record<string, string>>({})

function validate(): boolean {
  Object.keys(errors).forEach(key => delete errors[key])
  if (!form.firstName.trim()) errors.firstName = 'Required'
  if (!form.lastName.trim()) errors.lastName = 'Required'
  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'Valid email required'
  if (form.password.length < 6) errors.password = 'At least 6 characters'
  if (form.password !== form.confirmPassword) errors.confirmPassword = 'Passwords do not match'
  return Object.keys(errors).length === 0
}

function handleSignup() {
  errorMsg.value = ''
  if (!validate()) return

  localStorage.setItem('signup_user', JSON.stringify({
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
  }))

  authStore.loginLocal('signup-token')
  router.push('/')
}
</script>

<style scoped>
.signup-wrapper {
  display: grid;
  grid-template-columns: 55% 45%;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: #f5ede0;
}

/* ── LEFT SIDE ── */
.signup-left {
  position: relative;
  overflow: hidden;
  height: 100vh;
}

.signup-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left center;
  display: block;
}

.signup-left-text {
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
.signup-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 48px;
  background: #f5ede0;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
}

.signup-card {
  background: white;
  border-radius: 16px;
  padding: 36px 44px;
  width: 100%;
  max-width: 100%;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.signup-card h1 {
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
  margin-bottom: 24px;
}

.link {
  color: #16452f;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}

.link:hover {
  color: #45553d;
}

/* ── FIELDS ── */
.name-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.field {
  margin-bottom: 14px;
}

.field label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #222;
  margin-bottom: 5px;
}

.field input {
  width: 100%;
  padding: 11px 14px;
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

.field-error {
  font-size: 12px;
  color: #c0392b;
  margin-top: 3px;
  display: block;
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
  margin-top: 6px;
}

.sign-btn:hover {
  background: #1e5c3f;
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .signup-wrapper {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 100vh;
  }

  .signup-left {
    height: 240px;
  }

  .signup-left-text {
    font-size: 24px;
  }

  .signup-right {
    height: auto;
    padding: 40px 24px;
  }

  .signup-card {
    padding: 32px 24px;
  }
}
</style>