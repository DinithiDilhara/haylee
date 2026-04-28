<template>
  <div
    class="min-h-screen transition-colors duration-300"
    :style="{
      backgroundImage: `url(${im3})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }"
  >
    <NavBar :showSearch="false" @openCart="showCart = true" />
    <div class="max-w-4xl mx-auto px-6 py-10">
      <button @click="router.back()" class="mb-6 text-sm font-medium back-btn">
        ← Back
      </button>
      <div
        v-if="product"
        class="product-card-hover rounded-2xl p-12 flex gap-10 items-center product-card"
        style="min-height: 500px;"
      >
        <img
          :src="product.thumbnail"
          class="w-72 h-72 object-contain rounded-xl p-4 flex-shrink-0 product-img"
        />
        <div class="flex flex-col gap-5 flex-1">
          <p class="text-xs uppercase tracking-wide brand-text">{{ product.brand }}</p>
          <h1 class="text-3xl font-bold title-text">{{ product.title }}</h1>
          <p class="text-base leading-relaxed desc-text">{{ product.description }}</p>
          <div class="flex items-center gap-3">
            <span class="text-3xl font-bold price-text">${{ product.price }}</span>
            <span class="text-sm px-3 py-1 rounded-full badge">In Stock</span>
          </div>
          <p class="text-sm rating-text">★ {{ product.rating }} rating</p>
          <button
            @click="cartStore.addToCart(product); showCart = true"
            class="mt-2 px-6 py-3 rounded-xl w-full add-to-cart transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div v-else class="text-center mt-20 loading-text">Loading...</div>
    </div>
    <div v-if="showCart" class="fixed inset-0 z-50 flex">
      <div class="flex-1 bg-black/60" @click="showCart = false"></div>
      <CartDrawer @close="showCart = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import type { Product } from '../types/product'
import NavBar from '../components/NavBar.vue'
import CartDrawer from '../components/CartDrawer.vue'
import im3 from '../assets/im3.jpg'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const product = ref<Product | null>(null)
const showCart = ref(false)

onMounted(async () => {
  const res = await fetch(`https://dummyjson.com/products/${route.params.id}`)
  product.value = await res.json()
})
</script>

<style scoped>
/* Light mode */
.back-btn    { color: #45553D; }
.product-card {
  background: rgba(232, 233, 224, 0.45);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.4);
}
.product-img { background: #ffffff; }
.brand-text  { color: #45553D; }
.title-text  { color: #0D120E; }
.desc-text   { color: #45553D; }
.price-text  { color: #45553D; }
.rating-text { color: #6D7E5F; }
.badge       { background: #6D7E5F; color: #E8E9E0; }
.add-to-cart { background: #45553D; color: #ffffff; }
.add-to-cart:hover { background: #6D7E5F; }
.loading-text { color: #E8E9E0; }

/* Dark mode — triggered by .dark on <html> */
:global(.dark) .back-btn { color: #A8B89A; }
:global(.dark) .product-card {
  background: rgba(20, 28, 18, 0.65);
  border: 1px solid rgba(255,255,255,0.1);
}
:global(.dark) .product-img  { background: #1e2a1c; }
:global(.dark) .brand-text   { color: #A8B89A; }
:global(.dark) .title-text   { color: #E8E9E0; }
:global(.dark) .desc-text    { color: #A8B89A; }
:global(.dark) .price-text   { color: #C5D4B5; }
:global(.dark) .rating-text  { color: #7E9870; }
:global(.dark) .badge        { background: #3a4f32; color: #C5D4B5; }
:global(.dark) .add-to-cart  { background: #3a4f32; color: #E8E9E0; }
:global(.dark) .add-to-cart:hover { background: #6D7E5F; }
:global(.dark) .loading-text { color: #A8B89A; }
</style>