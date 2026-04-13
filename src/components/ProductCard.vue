<template>
  <div class="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
    <img :src="product.thumbnail" :alt="product.title" class="w-full h-48 object-cover bg-gray-100"/>
    <div class="p-3">
      <p class="text-xs text-gray-500 uppercase tracking-wide">{{ product.brand }}</p>
      <p class="text-sm font-medium text-gray-900 mt-1 line-clamp-2">{{ product.title }}</p>
      <div class="flex justify-between items-center mt-3">
        <span class="text-indigo-600 font-bold">${{ product.price }}</span>
        <span class="text-xs text-gray-500">★ {{ product.rating }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types/product'

defineProps<{
  product: Product
}>()
</script>