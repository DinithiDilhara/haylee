<template>
  <div>
    <NavBar @openCart="showCart = true" />
    
    <div class="max-w-4xl mx-auto px-6 py-10">
      <button @click="router.back()" class="mb-6 text-sm text-gray-500 hover:text-gray-800">← Back</button>

      <div v-if="product" class="bg-white dark:bg-gray-800 rounded-2xl shadow p-8 flex gap-10">
        <img :src="product.thumbnail" class="w-64 h-64 object-contain rounded-xl" />
        <div class="flex flex-col gap-4">
          <p class="text-xs text-gray-400 uppercase tracking-wide">{{ product.brand }}</p>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ product.title }}</h1>
          <p class="text-gray-500 dark:text-gray-300">{{ product.description }}</p>
          <div class="flex items-center gap-3">
            <span class="text-2xl font-bold text-indigo-600">${{ product.price }}</span>
            <span class="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">In Stock</span>
          </div>
          <p class="text-sm text-yellow-500">★ {{ product.rating }} rating</p>
          <button
            @click="cartStore.addToCart(product!)"
            class="mt-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700">
            Add to Cart
          </button>
        </div>
      </div>

      <div v-else class="text-center text-gray-400 mt-20">Loading...</div>
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