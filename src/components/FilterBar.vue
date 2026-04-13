<template>
  <div class="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3 flex-wrap">
    <span class="text-sm text-gray-500">Category:</span>
    <button
      v-for="cat in categories"
      :key="cat"
      @click="$emit('filter', cat)"
      :class="[
        'px-4 py-1.5 rounded-full text-sm border transition-colors',
        selected === cat
          ? 'bg-indigo-600 text-white border-indigo-600'
          : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-400'
      ]"
    >
      {{ cat }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  categories: string[]
  selected: string
}>()

defineEmits<{
  filter: [category: string]
}>()
</script>