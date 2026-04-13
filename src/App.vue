<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar @search="searchQuery = $event" />
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
          @click="selectedProduct = product"
        />
      </div>
    </main>
    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="selectedProduct = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Product, ProductsResponse } from './types/product'
import NavBar from './components/NavBar.vue'
import FilterBar from './components/FilterBar.vue'
import ProductCard from './components/ProductCard.vue'
import ProductModal from './components/ProductModal.vue'

const products = ref<Product[]>([])
const selectedCategory = ref('All')
const searchQuery = ref('')
const selectedProduct = ref<Product | null>(null)

const categories = computed(() => {
  const cats = [...new Set(products.value.map(p => p.category))]
  return ['All', ...cats]
})

const filteredProducts = computed(() => {
  let result = products.value
  if (selectedCategory.value !== 'All') {
    result = result.filter(p => p.category === selectedCategory.value)
  }
  if (searchQuery.value.trim()) {
    result = result.filter(p =>
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  return result
})

onMounted(async () => {
  const response = await fetch('https://dummyjson.com/products?limit=100')
  const data: ProductsResponse = await response.json()
  products.value = data.products
})
</script>