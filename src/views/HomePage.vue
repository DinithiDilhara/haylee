<template>
  <div
    class="min-h-screen"
    :style="{ backgroundImage: `url(${im3})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }"
  >
    <NavBar @search="searchQuery = $event" @openCart="showCart = true" />
    <FilterBar
      :categories="categories"
      :selected="selectedCategory"
      @filter="selectedCategory = $event"
    />
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

    <!-- Cart Drawer with dimmed background slot -->
    <div v-if="showCart" class="fixed inset-0 z-50 flex">
      <!-- Left dimmed side -->
      <div class="flex-1 overflow-hidden relative" style="pointer-events: none;">
        <div
          class="absolute inset-0"
          style="background: rgba(13,18,14,0.6); backdrop-filter: blur(2px); z-index: 1;"
        ></div>
        <div
          class="w-full h-full"
          :style="{ backgroundImage: `url(${im3})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
        >
          <NavBar @search="searchQuery = $event" @openCart="() => {}" />
          <FilterBar
            :categories="categories"
            :selected="selectedCategory"
            @filter="() => {}"
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
      </div>

      <!-- Right cart panel -->
      <CartDrawer @close="showCart = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Product, ProductsResponse } from '../types/product'
import NavBar from '../components/NavBar.vue'
import FilterBar from '../components/FilterBar.vue'
import ProductCard from '../components/ProductCard.vue'
import CartDrawer from '../components/CartDrawer.vue'
import { useAuthStore } from '../stores/auth'
import im3 from '../assets/im3.jpg'

const authStore = useAuthStore()
const products = ref<Product[]>([])
const selectedCategory = ref('All')
const searchQuery = ref('')
const showCart = ref(false)

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

async function loadProducts() {
  const response = await fetch('https://dummyjson.com/products?limit=100')
  const data: ProductsResponse = await response.json()
  products.value = data.products
}

watch(() => authStore.isLoggedIn, async (loggedIn) => {
  if (loggedIn) await loadProducts()
}, { immediate: true })
</script>