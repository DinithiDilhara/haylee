<template>
  <div class="min-h-screen page-bg">
    
    <!-- Sticky Header -->
    <div class="sticky-header">
      <NavBar @search="searchQuery = $event" @openCart="showCart = true" />

      <FilterBar
        :categories="categories"
        :selected="selectedCategory"
        @filter="selectedCategory = $event"
      />
    </div>

    <!-- Hero -->
    <HeroBanner />

    <!-- Products -->
    <main class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <RouterLink
          v-for="product in filteredProducts"
          :key="product.id"
          :to="`/product/${product.id}`"
        >
          <ProductCard :product="product" />
        </RouterLink>
      </div>
    </main>

    <!-- CART FIXED LAYER -->
    <div v-if="showCart" class="fixed inset-0 cart-layer flex">
      
      <!-- Left dark overlay -->
      <div class="flex-1 bg-black/50" @click="showCart = false"></div>

      <!-- Cart Drawer -->
      <CartDrawer @close="showCart = false" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product, ProductsResponse } from '../types/product'

import NavBar from '../components/NavBar.vue'
import HeroBanner from '../components/HeroBanner.vue'
import FilterBar from '../components/FilterBar.vue'
import ProductCard from '../components/ProductCard.vue'
import CartDrawer from '../components/CartDrawer.vue'

const products = ref<Product[]>([])
const selectedCategory = ref('All')
const searchQuery = ref('')
const showCart = ref(false)

/* Dynamic categories from API */
const categories = computed(() => {
  const cats = [...new Set(products.value.map(p => p.category))]
  return ['All', ...cats]
})

/* Filtering */
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

/* Load data */
async function loadProducts() {
  const res = await fetch('https://dummyjson.com/products?limit=100')
  const data: ProductsResponse = await res.json()
  products.value = data.products
}

loadProducts()
</script>

<style scoped>
/* Clean background */
.page-bg {
  background: linear-gradient(to bottom, #fdfaf6, #f5efe6);
}

/* Sticky header (LOW z-index) */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100; /* IMPORTANT */
}

/* Cart layer ABOVE everything */
.cart-layer {
  z-index: 9999;
}
</style>