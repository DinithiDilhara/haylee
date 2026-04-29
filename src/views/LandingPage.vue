<template>
  <div class="landing-root">
    <div class="overlay"></div>
    <div class="noise"></div>

    <nav :class="['top-nav', stage === 2 ? 'visible' : '']">
      <button @click="router.push('/about')" class="nav-link">About us</button>
      <span class="nav-divider">·</span>
      <button @click="router.push('/contact')" class="nav-link">Contact</button>
    </nav>

    <main class="hero-content">
      <p :class="['eyebrow', stage === 2 ? 'visible' : '']">
        <span class="eyebrow-line"></span>
        Natural · Curated · Yours
        <span class="eyebrow-line"></span>
      </p>

      <h1 :class="['brand-name', stage === 2 ? 'visible' : '']">
        <span class="letter" style="--i:0">H</span><span
          class="letter" style="--i:1">a</span><span
          class="letter" style="--i:2">y</span><span
          class="letter" style="--i:3">l</span><span
          class="letter" style="--i:4">e</span><span
          class="letter" style="--i:5">e</span>
      </h1>

      <p :class="['tagline', stage === 2 ? 'visible' : '']">
        Beauty rooted in nature,<br />crafted for you.
      </p>

      <div :class="['cta-wrap', stage === 2 ? 'visible' : '']">
        <button class="cta-btn" @click="router.push('/login')">
          <span class="cta-text">Shop the Collection</span>
          <span class="cta-arrow">→</span>
          <span class="cta-bg"></span>
        </button>
      </div>

      <div :class="['scroll-hint', stage === 2 ? 'visible' : '']">
        <span class="scroll-line"></span>
        <span class="scroll-label">scroll</span>
      </div>
    </main>

    <div :class="['brand-stamp', stage === 2 ? 'visible' : '']">
      <p>Est. 2024</p>
      <p>Premium Beauty</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const stage = ref(1)

onMounted(() => {
  setTimeout(() => {
    stage.value = 2
  }, 400)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

.landing-root {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #0d1a0e;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 40%,
    rgba(30, 58, 26, 0.7) 0%,
    rgba(6, 13, 6, 0.95) 100%
  );
  z-index: 1;
}

.noise {
  position: absolute;
  inset: 0;
  z-index: 2;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  pointer-events: none;
}

.top-nav {
  position: absolute;
  top: 2rem;
  right: 2.5rem;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  opacity: 0;
  transform: translateY(-12px);
  transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
}
.top-nav.visible {
  opacity: 1;
  transform: translateY(0);
}

.nav-link {
  font-family: 'Jost', sans-serif;
  font-weight: 300;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #b8c9a3;
  background: rgba(232, 219, 180, 0.06);
  border: 1px solid rgba(184, 201, 163, 0.2);
  backdrop-filter: blur(8px);
  padding: 0.45rem 1.1rem;
  border-radius: 100px;
  cursor: pointer;
  transition: background 0.25s, color 0.25s;
}
.nav-link:hover {
  background: #b8c9a3;
  color: #0d1a0e;
}

.nav-divider {
  color: #b8c9a3;
  opacity: 0.4;
  font-size: 1rem;
}

.hero-content {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
  text-align: center;
}

.eyebrow {
  font-family: 'Jost', sans-serif;
  font-weight: 200;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #8a9e75;
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s;
}
.eyebrow.visible { opacity: 1; transform: translateY(0); }

.eyebrow-line {
  display: inline-block;
  width: 32px;
  height: 1px;
  background: #4a6640;
  opacity: 0.8;
}

.brand-name {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(5rem, 14vw, 11rem);
  line-height: 0.9;
  letter-spacing: -0.02em;
  color: #e8dbb4;
  display: flex;
  gap: 0.01em;
  margin: 0;
}

.letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(40px) rotate(3deg);
  transition:
    opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) calc(0.3s + var(--i) * 0.07s),
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) calc(0.3s + var(--i) * 0.07s);
}
.brand-name.visible .letter {
  opacity: 1;
  transform: translateY(0) rotate(0deg);
}

.tagline {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 300;
  font-size: clamp(1rem, 2.2vw, 1.4rem);
  color: rgba(232, 219, 180, 0.55);
  line-height: 1.7;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.9s ease 0.75s, transform 0.9s ease 0.75s;
}
.tagline.visible { opacity: 1; transform: translateY(0); }

.cta-wrap {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.9s ease 1s, transform 0.9s ease 1s;
  margin-top: 0.5rem;
}
.cta-wrap.visible { opacity: 1; transform: translateY(0); }

.cta-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 2.2rem;
  border-radius: 100px;
  border: 1.5px solid rgba(184, 201, 163, 0.5);
  background: transparent;
  cursor: pointer;
  overflow: hidden;
  transition: color 0.35s;
}

.cta-text {
  font-family: 'Jost', sans-serif;
  font-weight: 300;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #b8c9a3;
  position: relative;
  z-index: 1;
  transition: color 0.35s;
}

.cta-arrow {
  font-size: 1rem;
  color: #b8c9a3;
  position: relative;
  z-index: 1;
  transition: color 0.35s, transform 0.35s;
}

.cta-bg {
  position: absolute;
  inset: 0;
  background: #b8c9a3;
  border-radius: 100px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.cta-btn:hover .cta-bg { transform: scaleX(1); }
.cta-btn:hover .cta-text { color: #0d1a0e; }
.cta-btn:hover .cta-arrow { color: #0d1a0e; transform: translateX(4px); }

.scroll-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  opacity: 0;
  transition: opacity 1s ease 1.4s;
}
.scroll-hint.visible { opacity: 1; }

.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, #4a6640, transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}

.scroll-label {
  font-family: 'Jost', sans-serif;
  font-weight: 200;
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #4a6640;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.4; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.2); }
}

.brand-stamp {
  position: absolute;
  bottom: 2rem;
  left: 2.5rem;
  z-index: 10;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.8s ease 1.2s, transform 0.8s ease 1.2s;
}
.brand-stamp.visible { opacity: 1; transform: translateY(0); }

.brand-stamp p {
  font-family: 'Jost', sans-serif;
  font-weight: 200;
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #4a6640;
  opacity: 0.7;
  line-height: 1.8;
}
</style>