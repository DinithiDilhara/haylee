<template>
  <div
    class="min-h-screen"
    :style="{ backgroundImage: `url(${im3})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }"
  >
    <NavBar @openCart="showCart = true" />

    <div class="max-w-4xl mx-auto px-6 py-10">
      <button
        @click="router.back()"
        class="mb-6 text-sm font-medium"
        style="color: #E8E9E0;"
      >← Back</button>

      <div
        v-if="product"
        class="rounded-2xl p-8 flex gap-10"
        style="background: rgba(232,233,224,0.85); backdrop-filter: blur(8px);"
      >
        <img :src="product.thumbnail" class="w-64 h-64 object-contain rounded-xl bg-white p-4" />
        <div class="flex flex-col gap-4">
          <p class="text-xs uppercase tracking-wide" style="color: #45553D;">{{ product.brand }}</p>
          <h1 class="text-2xl font-bold" style="color: #0D120E;">{{ product.title }}</h1>
          <p style="color: #45553D;">{{ product.description }}</p>
          <div class="flex items-center gap-3">
            <span class="text-2xl font-bold" style="color: #45553D;">${{ product.price }}</span>
            <span
              class="text-sm px-3 py-1 rounded-full"
              style="background: #6D7E5F; color: #E8E9E0;"
            >In Stock</span>
          </div>
          <p class="text-sm" style="color: #6D7E5F;">★ {{ product.rating }} rating</p>
          <button
            @click="cartStore.addToCart(product!)"
            class="mt-2 text-white px-6 py-3 rounded-xl transition-colors"
            style="background: #45553D;"
            onmouseover="this.style.background='#6D7E5F'"
            onmouseout="this.style.background='#45553D'"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div v-else class="text-center mt-20" style="color: #E8E9E0;">Loading...</div>
    </div>

    <CartDrawer v-if="showCart" @close="showCart = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import type { Product } from '../types/product'
import NavBar from '../components/NavBar.vue'
import CartDrawer from '../components/CartDrawer.vue'
import im3 from '../assets/im3.jpg'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const product = ref<Product | null>(null)
const showCart = ref(false)

onMounted(async () => {
  const res = await fetch(`https://dummyjson.com/products/${route.params.id}`)
  product.value = await res.json()
})
</script>