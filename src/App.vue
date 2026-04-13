<template>
  <div class="min-h-screen bg-gray-50">
    <h1 class="text-2xl font-bold p-8">Products: {{ products.length }}</h1>
    <div v-for="product in products" :key="product.id" class="p-4">
      {{ product.title }} - ${{ product.price }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product, ProductsResponse } from './types/product'

const products = ref<Product[]>([])

onMounted(async () => {
  const response = await fetch('https://dummyjson.com/products?limit=20')
  const data: ProductsResponse = await response.json()
  products.value = data.products
})
</script>