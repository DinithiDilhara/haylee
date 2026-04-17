
<template>
  <div
    class="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden"
    :style="{ backgroundImage: `url(${im1})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <!-- Nav — only on stage 2 -->
    <div v-if="stage === 2" class="absolute top-6 right-8 flex gap-3">
      <button class="bg-green-400 text-white text-sm px-4 py-1 rounded-full">About us</button>
      <button class="bg-green-500 text-white text-sm px-4 py-1 rounded-full">Contact</button>
    </div>

    <!-- Center content — both stages -->
    <h1 class="text-6xl font-bold text-gray-800 mb-4">Haylee</h1>
    <p class="text-gray-500 text-center text-base mb-8">
      Access your account and explore<br />curated products just for you.
    </p>

    <!-- Shop Now — only on stage 2 -->
    <button
      v-if="stage === 2"
      @click="router.push('/login')"
      class="flex items-center gap-2 bg-green-600 bg-opacity-60 text-white px-8 py-3 rounded-full hover:bg-opacity-80 transition-all"
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