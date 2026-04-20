<template>
  <div
    class="min-h-screen"
    :style="{ backgroundImage: `url(${im3})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }"
  >
    <NavBar @openCart="showCart = true" />

    <div class="max-w-4xl mx-auto px-6 py-10">
      <div
        class="rounded-2xl p-12"
        style="background: rgba(232,233,224,0.55); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.4);"
      >
        <p class="text-xs uppercase tracking-widest mb-2" style="color: #45553D;">Who we are</p>
        <h1 class="text-4xl font-bold mb-6" style="color: #0D120E;">About Haylee</h1>
        <p class="text-base leading-relaxed mb-4" style="color: #45553D;">
          Haylee is an online store offering curated beauty, electronics and lifestyle products.
          We believe shopping should be simple, personal, and enjoyable.
        </p>
        <p class="text-base leading-relaxed mb-8" style="color: #45553D;">
          Every product on Haylee is hand-picked to ensure quality and value — so you spend less
          time searching and more time enjoying.
        </p>

        <hr style="border-color: rgba(69,85,61,0.3); margin-bottom: 32px;" />

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="rounded-xl p-6" style="background: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.5);">
            <h3 class="font-bold mb-2" style="color: #0D120E;">Curated Selection</h3>
            <p class="text-sm" style="color: #45553D;">100+ products across beauty, electronics and lifestyle categories.</p>
          </div>
          <div class="rounded-xl p-6" style="background: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.5);">
            <h3 class="font-bold mb-2" style="color: #0D120E;">Trusted Brands</h3>
            <p class="text-sm" style="color: #45553D;">Only verified brands with real customer ratings you can trust.</p>
          </div>
          <div class="rounded-xl p-6" style="background: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.5);">
            <h3 class="font-bold mb-2" style="color: #0D120E;">Easy Shopping</h3>
            <p class="text-sm" style="color: #45553D;">Filter, search, and checkout in seconds from any device.</p>
          </div>
        </div>

        <div class="mt-8">
          <button
            @click="router.push('/home')"
            class="text-white px-6 py-3 rounded-xl transition-colors"
            style="background: #45553D;"
            onmouseover="this.style.background='#6D7E5F'"
            onmouseout="this.style.background='#45553D'"
          >
            Start Shopping
          </button>
        </div>
      </div>
    </div>

    <CartDrawer v-if="showCart" @close="showCart = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import CartDrawer from '../components/CartDrawer.vue'
import im3 from '../assets/im3.jpg'

const router = useRouter()
const showCart = ref(false)
</script>