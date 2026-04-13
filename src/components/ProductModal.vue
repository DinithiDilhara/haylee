<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
      <div class="flex justify-end p-4">
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-900 text-2xl font-bold">✕</button>
      </div>
      <div class="flex flex-col md:flex-row gap-6 px-6 pb-6">
        <img :src="product.thumbnail" :alt="product.title" class="w-full md:w-64 h-64 object-cover rounded-xl bg-gray-100"/>
        <div class="flex-1">
          <p class="text-xs text-gray-500 uppercase tracking-wide">{{ product.brand }}</p>
          <h2 class="text-2xl font-bold text-gray-900 mt-1">{{ product.title }}</h2>
          <div class="flex items-center gap-3 mt-3">
            <span class="text-2xl font-bold text-indigo-600">${{ product.price }}</span>
            <span class="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">-{{ product.discountPercentage }}%</span>
          </div>
          <span class="inline-block mt-2 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">{{ product.availabilityStatus }}</span>
          <p class="text-sm text-gray-600 mt-4 leading-relaxed">{{ product.description }}</p>
          <div class="flex items-center gap-2 mt-4">
            <span class="text-yellow-400">★</span>
            <span class="text-sm text-gray-600">{{ product.rating }} rating</span>
          </div>
          <button class="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types/product'

defineProps<{
  product: Product
}>()

defineEmits<{
  close: []
}>()
</script>