<template>
  <div class="about-page">
    <button @click="router.push('/')" class="back-btn">
      Back
    </button>

    <section class="about-wrap">
      <div class="left-section">
        <p class="story-label">Our story</p>

        <h1>
          Rooted in<br />
          nature,<br />
          crafted with<br />
          care.
        </h1>

        <p class="story-text">
          Haylee was born from a belief that the things we surround ourselves with
          should mean something. We seek out pieces that carry history, purpose,
          and quiet beauty — objects that don't shout for attention, but earn it
          slowly, gracefully.
        </p>

        <p class="story-text second">
          Every product in our collection is chosen by hand, held to the same
          standard: would we keep it ourselves?
        </p>
      </div>

      <div class="right-section">
        <div class="founded-card">
          <h2>2019</h2>
          <p>FOUNDED</p>
        </div>

        <div class="small-cards">
          <div class="stat-card">
            <h3>400+</h3>
            <p>PRODUCTS</p>
          </div>

          <div class="stat-card">
            <h3>12k</h3>
            <p>HAPPY<br />CUSTOMERS</p>
          </div>
        </div>
      </div>
    </section>

    <CartDrawer v-if="showCart" @close="showCart = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CartDrawer from '../components/CartDrawer.vue'

const router = useRouter()
const showCart = ref(false)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap');

.about-page {
  min-height: 100vh;
  background: #eef0e8;
  position: relative;
  padding: 50px 70px;
}

.back-btn {
  position: absolute;
  top: 25px;
  right: 40px;
  background: #14552f;
  color: white;
  border: none;
  padding: 8px 28px;
  border-radius: 25px;
  font-family: 'Lora', serif;
  font-size: 15px;
  cursor: pointer;
}

.about-wrap {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 80px;
  align-items: start;
}

.story-label {
  font-family: 'Lora', serif;
  color: #c59b27;
  font-size: 23px;
  font-weight: 600;
  margin-bottom: 55px;
}

h1 {
  font-family: 'Playfair Display', serif;
  color: #14552f;
  font-size: 72px;
  line-height: 1.18;
  font-weight: 800;
  margin-bottom: 85px;
}

.story-text {
  font-family: 'Lora', serif;
  color: #3f5146;
  font-size: 20px;
  line-height: 1.75;
  max-width: 680px;
}

.story-text.second {
  margin-top: 80px;
}

.right-section {
  padding-top: 165px;
}

.founded-card {
  background: #14552f;
  width: 400px;
  height: 175px;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.18);
}

.founded-card h2 {
  font-family: 'Playfair Display', serif;
  color: #d8ad2f;
  font-size: 40px;
  margin: 0 0 14px 0;
}

.founded-card p {
  font-family: 'Lora', serif;
  color: white;
  font-size: 18px;
  margin: 0;
}

.small-cards {
  display: flex;
  gap: 40px;
}

.stat-card {
  background: white;
  width: 205px;
  height: 185px;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
}

.stat-card h3 {
  font-family: 'Playfair Display', serif;
  color: #5f8675;
  font-size: 42px;
  margin: 0 0 22px 0;
}

.stat-card p {
  font-family: 'Lora', serif;
  color: #111;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  margin: 0;
}

@media (max-width: 900px) {
  .about-page {
    padding: 40px 28px;
  }

  .about-wrap {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  h1 {
    font-size: 54px;
  }

  .right-section {
    padding-top: 20px;
  }

  .founded-card {
    width: 100%;
  }

  .small-cards {
    flex-direction: column;
  }

  .stat-card {
    width: 100%;
  }
}
</style>