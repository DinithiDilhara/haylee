<template>
  <section class="hero">
    <div class="hero-text">
      <p class="tag">NEW COLLECTION</p>
      <h1>Beauty, Fashion &<br />Home Essentials</h1>
      <p class="subtitle">
        Discover trending products from cosmetics, fragrances,
        fashion, furniture and daily essentials.
      </p>
      <div class="btn-group">
        <button class="btn" @click="scrollToProducts">
          SHOP NOW →
        </button>
        <button class="btn-secondary" @click="router.push('/signup')">
          Get Started
        </button>
      </div>
      <div class="features">
        <div class="feature">
          <span>🏅</span>
          <p><strong>Top Quality</strong><br />Premium & reliable</p>
        </div>
        <div class="feature">
          <span>🚚</span>
          <p><strong>Fast Shipping</strong><br />Quick & secure</p>
        </div>
        <div class="feature">
          <span>🎧</span>
          <p><strong>24/7 Support</strong><br />We're here to help</p>
        </div>
      </div>
    </div>
    <div class="hero-image">
      <img src="/src/assets/hero.jpeg" alt="Beauty fashion and home products" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function scrollToProducts() {
  window.scrollTo({
    top: 700,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.hero {
  min-height: 540px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  padding: 70px 90px;
  background: linear-gradient(120deg, #fffaf5 0%, #f3eee7 100%);
  overflow: hidden;
}
.hero-text {
  max-width: 600px;
}
.tag {
  color: #b16565;
  font-size: 14px;
  letter-spacing: 6px;
  margin-bottom: 22px;
}
h1 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 62px;
  line-height: 1.05;
  color: #111;
  margin-bottom: 24px;
}
.subtitle {
  max-width: 520px;
  font-size: 18px;
  line-height: 1.7;
  color: #333;
  margin-bottom: 34px;
}
.btn-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 46px;
}
.btn {
  background: #111;
  color: white;
  border: none;
  padding: 16px 38px;
  border-radius: 40px;
  font-size: 15px;
  letter-spacing: 3px;
  cursor: pointer;
}
.btn:hover {
  background: #45553d;
}
.btn-secondary {
  background: #111;
  color: white;
  border: none;
  padding: 16px 38px;
  border-radius: 40px;
  font-size: 15px;
  letter-spacing: 1px;
  cursor: pointer;
  font-weight: 600;
}
.btn-secondary:hover {
  background: #45553d;
}
.features {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}
.feature {
  display: flex;
  align-items: center;
  gap: 12px;
}
.feature span {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #f2eadf;
  display: flex;
  align-items: center;
  justify-content: center;
}
.feature p {
  font-size: 13px;
  line-height: 1.4;
  color: #333;
}
.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
}
.hero-image img {
  width: 560px;
  max-width: 100%;
  border-radius: 28px;
  object-fit: cover;
  box-shadow: 0 25px 60px rgba(13, 18, 14, 0.14);
}
@media (max-width: 1000px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 50px 25px;
  }
  h1 {
    font-size: 42px;
  }
  .subtitle {
    margin-left: auto;
    margin-right: auto;
  }
  .btn-group {
    justify-content: center;
  }
  .features {
    justify-content: center;
  }
  .hero-image img {
    width: 340px;
  }
}
</style>