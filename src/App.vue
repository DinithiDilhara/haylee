<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />
    <FilterBar
      :categories="categories"
      :selected="selectedCategory"
      @filter="selectedCategory = $event"
    />
    <main class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Product, ProductsResponse } from './types/product'
import NavBar from './components/NavBar.vue'
import FilterBar from './components/FilterBar.vue'
import ProductCard from './components/ProductCard.vue'

const products = ref<Product[]>([])
const selectedCategory = ref('All')

const categories = computed(() => {
  const cats = [...new Set(products.value.map(p => p.category))]
  return ['All', ...cats]
})

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'All') return products.value
  return products.value.filter(p => p.category === selectedCategory.value)
})

onMounted(async () => {
  const response = await fetch('https://dummyjson.com/products?limit=100')
  const data: ProductsResponse = await response.json()
  products.value = data.products
})
</script>