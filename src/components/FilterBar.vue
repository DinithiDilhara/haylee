<template>
  <div
    class="px-6 py-3 flex items-center gap-3 flex-wrap"
    :style="themeStore.isDark
      ? 'background: #1a2a1c; border-bottom: 1px solid #45553D;'
      : 'background: #ffffff; border-bottom: 1px solid #C4C8AC;'"
  >
    <span class="text-sm" :style="themeStore.isDark ? 'color: #C4C8AC;' : 'color: #45553D;'">Category:</span>
    <button
      v-for="cat in categories"
      :key="cat"
      @click="$emit('filter', cat)"
      :style="selected === cat
        ? 'background: #6D7E5F; color: #E8E9E0; border-color: #6D7E5F;'
        : themeStore.isDark
          ? 'background: transparent; color: #C4C8AC; border-color: #45553D;'
          : 'background: transparent; color: #45553D; border-color: #45553D;'"
      class="px-4 py-1.5 rounded-full text-sm border transition-colors"
    >
      {{ cat }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()

defineProps<{
  categories: string[]
  selected: string
}>()

defineEmits<{
  filter: [category: string]
}>()
</script>