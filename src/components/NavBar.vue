<template>
  <nav class="bg-gray-900 h-16 flex items-center px-6 gap-4">
    <span class="text-white font-bold text-xl">Haylee</span>
    <input
      v-model="searchQuery"
      @input="$emit('search', searchQuery)"
      type="text"
      placeholder="Search products..."
      class="flex-1 max-w-md mx-auto bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 text-sm outline-none"
    />
    <span
      @click="$emit('openCart')"
      class="text-white text-sm ml-auto cursor-pointer hover:text-indigo-300 transition-colors">
      Cart
      <span class="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full ml-1">
        {{ cartStore.totalItems }}
      </span>
    </span>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'

const searchQuery = ref('')
const cartStore = useCartStore()

defineEmits<{
  search: [query: string]
  openCart: []
}>()
</script>