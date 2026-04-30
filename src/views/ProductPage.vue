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

      <!-- Loading State -->
      <div v-if="loading" class="product-layout">
        <div class="skeleton-image"></div>
        <div class="skeleton-detail">
          <div class="skeleton-line short"></div>
          <div class="skeleton-line long"></div>
          <div class="skeleton-line medium"></div>
          <div class="skeleton-line short"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-box">
        <p>{{ error }}</p>
        <button @click="loadProduct">Try Again</button>
      </div>

      <!-- Product -->
      <section v-else-if="product" class="product-layout">
        <div class="image-section">
          <img :src="product.thumbnail" :alt="product.title" class="main-img" />
        </div>

        <div class="detail-section">
          <p class="brand">{{ product.brand || product.category }}</p>
          <h1>{{ product.title }}</h1>

          <p class="rating">
            ★★★★★
            <span>{{ product.rating }} ({{ product.stock }} reviews)</span>
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

          <p class="description">{{ product.description }}</p>

          <div class="tags">
            <span class="tag">{{ product.category }}</span>
            <span v-if="product.brand" class="tag">{{ product.brand }}</span>
          </div>

          <button class="add-cart" @click="addProductToCart">
            Add to Cart
          </button>
        </div>
      </section>
    </main>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-grid">
        <div>
          <h3>Haylee</h3>
          <p>Everything you need, thoughtfully curated — beauty, tech, home &amp; more.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <RouterLink to="/">Beauty</RouterLink>
          <RouterLink to="/">Electronics</RouterLink>
          <RouterLink to="/">Furniture</RouterLink>
          <RouterLink to="/">Groceries</RouterLink>
        </div>
        <div>
          <h4>Company</h4>
          <RouterLink to="/about">About us</RouterLink>
          <RouterLink to="/">Our story</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Email: hello@haylee.com</p>
          <p>Phone: +94 70 123 4324</p>
          <p>Address: No.20, Grandpass, Colombo 10.</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="copyright">©2026 Haylee. All rights reserved.</p>
        <div class="footer-legal">
          <a href="#">Privacy policy</a>
          <a href="#">Terms of use</a>
          <a href="#">Cookie settings</a>
        </div>
      </div>
    </footer>

    <!-- CART DRAWER -->
    <div v-if="showCart" class="fixed inset-0 cart-layer flex">
      <div class="flex-1 bg-black/60" @click="showCart = false"></div>
      <CartDrawer @close="showCart = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Product, ProductsResponse } from '../types/product'

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
const loading = ref(false)
const error = ref('')

// ── Categories fetched dynamically (not hardcoded) ──
const selectedCategory = ref('All')
const categories = ref<string[]>(['All'])

async function loadCategories() {
  try {
    const res = await fetch('https://dummyjson.com/products?limit=100')
    if (!res.ok) return
    const data: ProductsResponse = await res.json()
    const cats = [...new Set(data.products.map((p) => p.category))]
    categories.value = ['All', ...cats]
  } catch {
    // silently fail — categories just stay as ['All']
  }
}

async function loadProduct() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch(`https://dummyjson.com/products/${route.params.id}`)
    if (!res.ok) throw new Error('Product not found')
    product.value = await res.json()
  } catch (e) {
    error.value = 'Could not load product. Please try again.'
  } finally {
    loading.value = false
  }
}

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
  if (quantity.value > 1) quantity.value--
}

function addProductToCart() {
  if (!product.value) return
  for (let i = 0; i < quantity.value; i++) {
    cartStore.addToCart(product.value)
  }
  showCart.value = true
}

onMounted(() => {
  loadProduct()
  loadCategories()
})
</script>

<style scoped>
.bg-main {
  background: linear-gradient(to bottom, #fffaf5 0%, #f5f2ec 50%, #f8f6f2 100%);
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
}

.cart-layer {
  z-index: 9999;
}

/* ── PRODUCT PAGE ── */
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
  transition: color 0.2s;
}

.back-btn:hover {
  color: #16452f;
}

/* ── SKELETON LOADING ── */
.skeleton-image {
  height: 560px;
  border-radius: 20px;
  background: linear-gradient(90deg, #e8e0d4 25%, #f0e8dc 50%, #e8e0d4 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-detail {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 10px;
}

.skeleton-line {
  height: 20px;
  border-radius: 6px;
  background: linear-gradient(90deg, #e8e0d4 25%, #f0e8dc 50%, #e8e0d4 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-line.short { width: 30%; }
.skeleton-line.medium { width: 60%; }
.skeleton-line.long { width: 80%; height: 48px; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── ERROR ── */
.error-box {
  text-align: center;
  padding: 80px 24px;
  color: #c0392b;
}

.error-box button {
  margin-top: 12px;
  padding: 10px 24px;
  background: #16452f;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

/* ── PRODUCT LAYOUT ── */
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
  margin-bottom: 28px;
}

.tags {
  display: flex;
  gap: 10px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.tag {
  padding: 6px 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 13px;
  color: #555;
  text-transform: capitalize;
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

/* ── FOOTER ── */
.footer {
  background: #3f5745;
  color: white;
  padding: 42px 70px 18px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.4fr;
  gap: 40px;
  margin-bottom: 28px;
}

.footer-grid > div {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.footer h3 {
  font-family: Georgia, serif;
  font-size: 24px;
  margin-bottom: 4px;
}

.footer h4 {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
  color: white;
}

.footer p,
.footer a {
  color: #c8cfc0;
  font-size: 13px;
  line-height: 1.5;
  text-decoration: none;
}

.footer a:hover {
  color: #d6b15c;
  transition: color 0.2s;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.copyright {
  font-size: 11px;
  color: #aab5a2;
}

.footer-legal {
  display: flex;
  gap: 20px;
}

.footer-legal a {
  font-size: 11px;
  color: #aab5a2;
}

.footer-legal a:hover {
  color: #d6b15c;
}

/* ── RESPONSIVE ── */
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

  .skeleton-image {
    height: 360px;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer {
    padding: 35px 24px 18px;
  }
}

@media (max-width: 480px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>