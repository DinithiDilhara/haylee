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
    <span class="text-white text-sm ml-auto">Cart (0)</span>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

defineEmits<{
  search: [query: string]
}>()
</script>