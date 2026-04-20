<template>
  <div
    class="rounded-xl overflow-hidden cursor-pointer transition-shadow hover:shadow-lg"
    :style="themeStore.isDark
      ? 'background: #1a2a1c; border: 1px solid #45553D;'
      : 'background: #E8E9E0; border: 1px solid #C4C8AC;'"
  >
    <img :src="product.thumbnail" :alt="product.title" class="w-full h-48 object-cover" style="background: #fff;" />
    <div class="p-3">
      <p class="text-xs uppercase tracking-wide" :style="themeStore.isDark ? 'color: #6D7E5F;' : 'color: #45553D;'">{{ product.brand }}</p>
      <p class="text-sm font-medium mt-1 line-clamp-2" :style="themeStore.isDark ? 'color: #E8E9E0;' : 'color: #0D120E;'">{{ product.title }}</p>
      <div class="flex justify-between items-center mt-3">
        <span class="font-bold" :style="themeStore.isDark ? 'color: #C4C8AC;' : 'color: #45553D;'">${{ product.price }}</span>
        <span class="text-xs" style="color: #6D7E5F;">★ {{ product.rating }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types/product'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()

defineProps<{
  product: Product
}>()
</script>