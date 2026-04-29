<template>
  <div class="min-h-screen bg-main">
    <div class="sticky-header">
      <NavBar :showSearch="false" @openCart="showCart = true" />

      <FilterBar
        :categories="categories"
        :selected="selectedCategory"
        @filter="goToCategory"
      />
    </div>

    <main class="product-page">
      <button @click="router.back()" class="back-btn">← Back</button>

      <section v-if="product" class="product-layout">
        <div class="image-section">
          <img :src="product.thumbnail" :alt="product.title" class="main-img" />
        </div>

        <div class="detail-section">
          <p class="brand">{{ product.brand || product.category }}</p>

          <h1>{{ product.title }}</h1>

          <p class="rating">
            ★★★★★ <span>{{ product.rating }} reviews</span>
          </p>

          <p class="price">${{ product.price }}</p>

          <div class="quantity-box">
            <p>Quantity</p>

            <div class="quantity-control">
              <button @click="decreaseQty">−</button>
              <span>{{ quantity }}</span>
              <button @click="increaseQty">+</button>
            </div>
          </div>

          <p class="description">
            {{ product.description }}
          </p>

          <button class="wishlist">♡ Add to Wishlist</button>

          <button class="add-cart" @click="addProductToCart">
            Add to Cart
          </button>
        </div>
      </section>

      <p v-else class="loading">Loading...</p>
    </main>

    <div v-if="showCart" class="fixed inset-0 cart-layer flex">
      <div class="flex-1 bg-black/60" @click="showCart = false"></div>
      <CartDrawer @close="showCart = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Product } from '../types/product'

import NavBar from '../components/NavBar.vue'
import FilterBar from '../components/FilterBar.vue'
import CartDrawer from '../components/CartDrawer.vue'

import { useCartStore } from '../stores/cart'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const product = ref<Product | null>(null)
const showCart = ref(false)
const quantity = ref(1)

const selectedCategory = ref('All')

const categories = [
  'All',
  'beauty',
  'fragrances',
  'furniture',
  'groceries',
  'home-decoration',
  'kitchen-accessories',
  'laptops',
  'mens-shirts',
  'mens-shoes',
  'mens-watches',
  'mobile-accessories'
]

function goToCategory(category: string) {
  selectedCategory.value = category

  if (category === 'All') {
    router.push('/')
  } else {
    router.push({ path: '/', query: { category } })
  }
}

function increaseQty() {
  quantity.value++
}

function decreaseQty() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

function addProductToCart() {
  if (!product.value) return

  for (let i = 0; i < quantity.value; i++) {
    cartStore.addToCart(product.value)
  }

  showCart.value = true
}

onMounted(async () => {
  const res = await fetch(`https://dummyjson.com/products/${route.params.id}`)
  product.value = await res.json()
})
</script>

<style scoped>
.bg-main {
  background: linear-gradient(
    to bottom,
    #fffaf5 0%,
    #f5f2ec 50%,
    #f8f6f2 100%
  );
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
}

.cart-layer {
  z-index: 9999;
}

.product-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 35px 50px 70px;
}

.back-btn {
  margin-bottom: 28px;
  font-size: 14px;
  color: #333;
  background: none;
  border: none;
  cursor: pointer;
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: 60px;
  align-items: start;
}

.image-section {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  min-height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-img {
  width: 80%;
  max-height: 520px;
  object-fit: contain;
}

.detail-section {
  padding: 20px 10px;
}

.brand {
  text-transform: uppercase;
  color: #555;
  letter-spacing: 1px;
  font-size: 14px;
  margin-bottom: 18px;
}

h1 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 52px;
  line-height: 1.1;
  letter-spacing: 0.5px;
  color: #111;
  margin-bottom: 18px;
}

.rating {
  color: #f5b400;
  font-size: 20px;
  margin-bottom: 22px;
}

.rating span {
  color: #333;
  font-size: 16px;
  margin-left: 8px;
}

.price {
  font-size: 32px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #2e3b2c;
  margin-bottom: 28px;
}

.quantity-box p {
  text-transform: uppercase;
  font-family: Georgia, 'Times New Roman', serif;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.quantity-control {
  width: 160px;
  height: 54px;
  border: 1px solid #999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.quantity-control button {
  width: 50px;
  height: 100%;
  border: none;
  background: white;
  font-size: 22px;
  cursor: pointer;
}

.quantity-control span {
  font-size: 18px;
}

.description {
  max-width: 650px;
  font-size: 17px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 35px;
}

.wishlist {
  display: block;
  margin: 0 auto 24px;
  background: none;
  border: none;
  font-family: Georgia, 'Times New Roman', serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 18px;
  cursor: pointer;
}

.add-cart {
  width: 100%;
  max-width: 560px;
  padding: 18px;
  background: #2e3b2c;
  color: white;
  border: none;
  border-radius: 10px;
  font-family: Georgia, 'Times New Roman', serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-cart:hover {
  background: #445a3a;
  transform: translateY(-2px);
}

.loading {
  text-align: center;
  margin-top: 80px;
  color: #333;
}

@media (max-width: 900px) {
  .product-page {
    padding: 25px 20px 50px;
  }

  .product-layout {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 34px;
  }

  .image-section {
    min-height: 360px;
  }
}
</style>