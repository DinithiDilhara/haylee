<template>
  <div
    class="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden"
    :style="{ backgroundImage: `url(${im1})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <div v-if="stage === 2" class="absolute top-6 right-8 flex gap-3">
      <button
        @click="router.push('/about')"
        class="text-white text-sm px-4 py-1 rounded-full"
        style="background: #45553D;"
      >About us</button>
      <button
        @click="router.push('/contact')"
        class="text-white text-sm px-4 py-1 rounded-full"
        style="background: #45553D;"
      >Contact</button>
    </div>
    <h1 class="text-6xl font-bold text-gray-800 mb-4">Haylee</h1>
    <p class="text-gray-500 text-center text-base mb-8">
      Access your account and explore<br />curated products just for you.
    </p>
    <button
      v-if="stage === 2"
      @click="router.push('/login')"
      class="flex items-center gap-2 text-white px-8 py-3 rounded-full transition-all"
      style="background: #45553D;"
      onmouseover="this.style.background='#6D7E5F'"
      onmouseout="this.style.background='#45553D'"
    >
      shop now →
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import im1 from '../assets/im1.jpg'

const router = useRouter()
const stage = ref(1)

onMounted(() => {
  setTimeout(() => {
    stage.value = 2
  }, 800)
})
</script>