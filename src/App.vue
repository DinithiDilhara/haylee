<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />
    <main class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product, ProductsResponse } from './types/product'
import NavBar from './components/NavBar.vue'
import ProductCard from './components/ProductCard.vue'

const products = ref<Product[]>([])

onMounted(async () => {
  const response = await fetch('https://dummyjson.com/products?limit=20')
  const data: ProductsResponse = await response.json()
  products.value = data.products
})
</script>