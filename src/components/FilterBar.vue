<template>
  <div class="px-6 py-3 flex items-center gap-3 flex-wrap" style="background: #0D120E; border-bottom: 1px solid #45553D;">
    <span class="text-sm" style="color: #C4C8AC;">Category:</span>
    <button
      v-for="cat in categories"
      :key="cat"
      @click="$emit('filter', cat)"
      :style="selected === cat
        ? 'background: #6D7E5F; color: #E8E9E0; border-color: #6D7E5F;'
        : 'background: transparent; color: #E8E9E0; border-color: #45553D;'"
      class="px-4 py-1.5 rounded-full text-sm border transition-colors"
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