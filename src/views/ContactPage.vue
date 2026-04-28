<template>
  <div
    class="min-h-screen"
    :style="{ backgroundImage: `url(${im3})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }"
  >
    <button @click="router.push('/')" class="back-btn">Back</button>
    <div class="max-w-4xl mx-auto px-6 py-10">
      <div
        class="rounded-2xl p-12"
        style="background: rgba(232,233,224,0.55); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.4);"
      >
        <p class="text-xs uppercase tracking-widest mb-2" style="color: #45553D;">Get in touch</p>
        <h1 class="text-4xl font-bold mb-8" style="color: #0D120E;">Contact us</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2" style="color: #45553D;">Name</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Your name"
                class="w-full rounded-lg px-4 py-3 text-sm outline-none"
                style="background: rgba(255,255,255,0.8); border: 1px solid #C4C8AC; color: #0D120E;"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2" style="color: #45553D;">Email</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="your@email.com"
                class="w-full rounded-lg px-4 py-3 text-sm outline-none"
                style="background: rgba(255,255,255,0.8); border: 1px solid #C4C8AC; color: #0D120E;"
              />
            </div>
            <div class="mb-6">
              <label class="block text-sm font-medium mb-2" style="color: #45553D;">Message</label>
              <textarea
                v-model="form.message"
                placeholder="How can we help?"
                rows="4"
                class="w-full rounded-lg px-4 py-3 text-sm outline-none resize-none"
                style="background: rgba(255,255,255,0.8); border: 1px solid #C4C8AC; color: #0D120E;"
              ></textarea>
            </div>
            <button
              @click="handleSubmit"
              class="text-white px-6 py-3 rounded-xl transition-colors w-full"
              style="background: #45553D;"
              onmouseover="this.style.background='#6D7E5F'"
              onmouseout="this.style.background='#45553D'"
            >
              {{ submitted ? 'Message Sent!' : 'Send Message' }}
            </button>
          </div>
          <div class="flex flex-col gap-4 justify-center">
            <div
              class="rounded-xl p-6"
              style="background: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.5);"
            >
              <h3 class="font-bold mb-2" style="color: #0D120E;">Email us</h3>
              <p class="text-sm" style="color: #45553D;">support@haylee.com</p>
            </div>
            <div
              class="rounded-xl p-6"
              style="background: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.5);"
            >
              <h3 class="font-bold mb-2" style="color: #0D120E;">Response time</h3>
              <p class="text-sm" style="color: #45553D;">We reply within 24 hours on weekdays.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import im3 from '../assets/im3.jpg'

const router = useRouter()
const submitted = ref(false)
const form = ref({
  name: '',
  email: '',
  message: ''
})

function handleSubmit() {
  if (form.value.name && form.value.email && form.value.message) {
    submitted.value = true
    form.value = { name: '', email: '', message: '' }
    setTimeout(() => submitted.value = false, 3000)
  }
}
</script>

<style scoped>
.back-btn {
  position: absolute;
  top: 25px;
  right: 40px;
  background: #45553D;
  color: white;
  border: none;
  padding: 8px 28px;
  border-radius: 25px;
  font-size: 15px;
  cursor: pointer;
}
</style>