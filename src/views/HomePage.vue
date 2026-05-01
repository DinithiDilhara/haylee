<template>
  <div class="min-h-screen page-bg">
    <!-- STICKY HEADER -->
    <div class="sticky-header">
      <NavBar @search="searchQuery = $event" @openCart="showCart = true" />
      <FilterBar
        :categories="categories"
        :selected="selectedCategory"
        @filter="handleFilter"
      />
    </div>

    <HeroBanner />

    <!-- PRODUCTS SECTION -->
    <main class="max-w-7xl mx-auto px-6 py-12">
      <p class="featured-label">FEATURED</p>
      <p class="shop-label">Shop by Category</p>

      <!-- Loading State -->
      <div v-if="loading" class="loading-grid">
        <div v-for="n in 8" :key="n" class="skeleton-card"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-box">
        <p>{{ error }}</p>
        <button @click="loadProducts">Try Again</button>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredProducts.length === 0" class="empty-state">
        <p>No products found for "<strong>{{ searchQuery || selectedCategory }}</strong>"</p>
      </div>

      <!-- Product Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <RouterLink
          v-for="product in filteredProducts"
          :key="product.id"
          :to="`/product/${product.id}`"
          class="product-link"
        >
          <ProductCard :product="product" />
        </RouterLink>
      </div>
    </main>

    <!-- STORY SECTION -->
    <section class="story-section">
      <div class="story-inner">
        <div class="story-left">
          <p class="small-title">Our story</p>
          <h2>
            Rooted in<br />
            nature,<br />
            crafted with<br />
            care.
          </h2>
        </div>
        <div class="story-right">
          <div class="year-box">2019</div>
          <div class="stats">
            <div class="stat-card">
              <strong>400+</strong>
              <span>PRODUCTS</span>
            </div>
            <div class="stat-card">
              <strong>12k</strong>
              <span>HAPPY<br />CUSTOMERS</span>
            </div>
          </div>
        </div>
      </div>
      <p class="story-text">
        Haylee was born from a belief that the things we surround ourselves with should mean
        something. We seek out pieces that carry history, purpose, and quiet beauty — objects that
        don't shout for attention, but earn it slowly, gracefully.
      </p>
    </section>

    <!-- CONTACT SECTION -->
    <section class="contact-section">
      <div class="contact-left">
        <p class="contact-small">GET IN TOUCH</p>
        <h2>We'd love to<br />hear from you.</h2>
        <div class="contact-info">
          <p><strong>Email</strong><br />hello@haylee.com</p>
          <p><strong>Instagram</strong><br />@haylee.store</p>
          <p><strong>Hours</strong><br />Mon–Fri, 9am–6pm</p>
        </div>
      </div>
      <div class="contact-form">
        <p v-if="formError" class="form-error">{{ formError }}</p>
        <p v-if="submitted" class="form-success">Message sent! We'll be in touch soon.</p>
        <input v-model="form.name" placeholder="Your Name" />
        <input v-model="form.email" type="email" placeholder="Email Address" />
        <textarea v-model="form.message" placeholder="Tell us what's on your mind..."></textarea>
        <button @click="handleSubmit">Send a message</button>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-grid">
        <div>
          <h3>Haylee</h3>
          <p>Everything you need, thoughtfully curated — beauty, tech, home &amp; more.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <RouterLink to="/" @click="selectedCategory = 'beauty'">Beauty</RouterLink>
          <RouterLink to="/" @click="selectedCategory = 'electronics'">Electronics</RouterLink>
          <RouterLink to="/" @click="selectedCategory = 'furniture'">Furniture</RouterLink>
          <RouterLink to="/" @click="selectedCategory = 'groceries'">Groceries</RouterLink>
        </div>
        <div>
          <h4>Company</h4>
          <RouterLink to="/about">About us</RouterLink>
          <a href="#story" @click.prevent="scrollToStory">Our story</a>
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
      <div class="flex-1 bg-black/50" @click="showCart = false"></div>
      <CartDrawer @close="showCart = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Product, ProductsResponse } from '../types/product'

import NavBar from '../components/NavBar.vue'
import HeroBanner from '../components/HeroBanner.vue'
import FilterBar from '../components/FilterBar.vue'
import ProductCard from '../components/ProductCard.vue'
import CartDrawer from '../components/CartDrawer.vue'

// ── State ──
const products = ref<Product[]>([])
const selectedCategory = ref('All')
const searchQuery = ref('')
const showCart = ref(false)
const loading = ref(false)
const error = ref('')

// ── Contact Form ──
const submitted = ref(false)
const formError = ref('')
const form = ref({ name: '', email: '', message: '' })

// ── Computed ──
const categories = computed(() => {
  const cats = [...new Set(products.value.map((p) => p.category))]
  return ['All', ...cats]
})

const filteredProducts = computed(() => {
  let result = products.value
  if (selectedCategory.value !== 'All') {
    result = result.filter((p) => p.category === selectedCategory.value)
  }
  if (searchQuery.value.trim()) {
    result = result.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  return result
})

// ── Data Fetching ──
async function loadProducts() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch('https://dummyjson.com/products?limit=100')
    if (!res.ok) throw new Error('Failed to load products')
    const data: ProductsResponse = await res.json()
    products.value = data.products
  } catch (e) {
    error.value = 'Could not load products. Please check your connection.'
  } finally {
    loading.value = false
  }
}

// ── Contact Form ──
function handleSubmit() {
  formError.value = ''
  if (!form.value.name.trim() || !form.value.email.trim() || !form.value.message.trim()) {
    formError.value = 'Please fill in all fields before sending.'
    return
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    formError.value = 'Please enter a valid email address.'
    return
  }
  submitted.value = true
  form.value = { name: '', email: '', message: '' }
  setTimeout(() => {
    submitted.value = false
  }, 4000)
}

// ── Filter with scroll ──
function handleFilter(category: string) {
  selectedCategory.value = category
  const section = document.querySelector('.featured-label') as HTMLElement
  if (section) {
    const headerHeight = document.querySelector('.sticky-header')?.clientHeight || 0
    const top = section.getBoundingClientRect().top + window.scrollY - headerHeight - 16
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

// ── Scroll to story ──
function scrollToStory() {
  const section = document.querySelector('.story-section')
  if (section) section.scrollIntoView({ behavior: 'smooth' })
}

// ── Lifecycle ──
onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
/* ── BASE ── */
.page-bg {
  background: linear-gradient(to bottom, #fdfaf6, #f5efe6);
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
}

.cart-layer {
  z-index: 9999;
}

.product-link {
  display: block;
  text-decoration: none;
}

/* ── FEATURED LABELS ── */
.featured-label {
  font-size: 11px;
  font-weight: 700;
  color: #888;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.shop-label {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
}

/* ── LOADING SKELETON ── */
.loading-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.skeleton-card {
  height: 280px;
  border-radius: 12px;
  background: linear-gradient(90deg, #e8e0d4 25%, #f0e8dc 50%, #e8e0d4 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── ERROR / EMPTY STATES ── */
.error-box {
  text-align: center;
  padding: 48px;
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

.empty-state {
  text-align: center;
  padding: 48px;
  color: #888;
  font-size: 15px;
}

/* ── STORY SECTION ── */
.story-section {
  max-width: 1200px;
  margin: 40px auto 0;
  padding: 32px 70px 45px;
  background: #f5efe6;
}

.story-inner {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  column-gap: 60px;
  align-items: start;
  margin-bottom: 28px;
}

.story-left {
  text-align: left;
}

.small-title {
  color: #d6b15c;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 16px;
}

.story-left h2 {
  font-family: Georgia, serif;
  font-size: 40px;
  line-height: 1.15;
  color: #16452f;
  font-weight: 700;
}

.story-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 8px;
  gap: 28px;
}

.year-box {
  width: 100%;
  max-width: 420px;
  height: 76px;
  background: #16452f;
  color: #d6b15c;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Georgia, serif;
  font-size: 28px;
  font-weight: 700;
}

.stats {
  display: flex;
  gap: 20px;
}

.stat-card {
  width: 130px;
  height: 88px;
  background: white;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.stat-card strong {
  font-family: Georgia, serif;
  font-size: 26px;
  color: #6d9b82;
  line-height: 1;
}

.stat-card span {
  font-family: Georgia, serif;
  font-size: 10px;
  color: #333;
  text-align: center;
  line-height: 1.3;
  letter-spacing: 0.04em;
}

.story-text {
  max-width: 820px;
  margin: 0 auto;
  text-align: center;
  font-family: Georgia, serif;
  font-size: 13.5px;
  line-height: 1.55;
  color: #444;
}

/* ── CONTACT SECTION ── */
.contact-section {
  background: #16452f;
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 65px 90px;
  gap: 70px;
}

.contact-small {
  color: #d6b15c;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 20px;
}

.contact-left h2 {
  font-family: Georgia, serif;
  font-size: 40px;
  line-height: 1.2;
  margin-bottom: 30px;
}

.contact-info p {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 11px 0;
  color: #cdd5c5;
  font-size: 13px;
  line-height: 1.6;
}

.contact-info p strong {
  display: block;
  color: white;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 2px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
}

.form-error {
  color: #ffaaaa;
  font-size: 13px;
  padding: 8px 12px;
  background: rgba(255, 100, 100, 0.15);
  border-radius: 6px;
  margin: 0;
}

.form-success {
  color: #aaffcc;
  font-size: 13px;
  padding: 8px 12px;
  background: rgba(100, 255, 150, 0.15);
  border-radius: 6px;
  margin: 0;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 13px;
  outline: none;
  transition: background 0.2s;
}

.contact-form input:focus,
.contact-form textarea:focus {
  background: rgba(255, 255, 255, 0.18);
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.contact-form textarea {
  height: 110px;
  resize: none;
}

.contact-form button {
  background: #d6b15c;
  color: #16452f;
  padding: 13px;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.contact-form button:hover {
  opacity: 0.85;
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
@media (max-width: 1024px) {
  .loading-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .story-inner {
    grid-template-columns: 1fr;
  }

  .story-section {
    padding: 32px 24px 40px;
  }

  .year-box {
    max-width: 100%;
  }

  .contact-section {
    grid-template-columns: 1fr;
    padding: 45px 24px;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer {
    padding: 35px 24px 18px;
  }

  .loading-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .loading-grid {
    grid-template-columns: 1fr;
  }

  .footer-grid {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .stats {
    flex-wrap: wrap;
  }
}
</style>