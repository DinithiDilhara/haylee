<template>
  <div class="min-h-screen bg-[#f0ede6]">
    <!-- Top bar -->
    <div class="flex items-center justify-between px-8 py-4 bg-[#45553D]">
      <button
        @click="currentStep > 1 ? currentStep-- : router.back()"
        class="text-sm font-medium text-[#E8E9E0]/70 hover:text-[#E8E9E0] transition"
      >
        ← Back
      </button>

      <span class="text-xl font-bold italic text-[#E8E9E0] font-serif">Haylee</span>

      <div class="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E8E9E0]">
        <button
          @click="goToStep(1)"
          :class="[
            'transition pb-1',
            currentStep === 1
              ? 'border-b border-[#E8E9E0] opacity-100'
              : currentStep > 1
              ? 'opacity-70 hover:opacity-100'
              : 'opacity-40 cursor-not-allowed'
          ]"
        >BAG</button>

        <span class="opacity-40">—</span>

        <button
          @click="goToStep(2)"
          :class="[
            'transition pb-1',
            currentStep === 2
              ? 'border-b border-[#E8E9E0] opacity-100'
              : currentStep > 2
              ? 'opacity-70 hover:opacity-100'
              : 'opacity-40 cursor-not-allowed'
          ]"
        >DETAILS</button>

        <span class="opacity-40">—</span>

        <button
          @click="goToStep(3)"
          :class="[
            'transition pb-1',
            currentStep === 3
              ? 'border-b border-[#E8E9E0] opacity-100'
              : 'opacity-40 cursor-not-allowed'
          ]"
        >CONFIRM</button>
      </div>
    </div>

    <!-- Empty cart -->
    <div v-if="cartStore.items.length === 0 && !showSuccess" class="flex flex-col items-center justify-center h-96 gap-5">
      <p class="text-xs uppercase tracking-widest text-[#45553D]">Your bag is empty</p>
      <button
        @click="router.push('/')"
        class="px-8 py-3 rounded-xl text-white text-sm font-semibold bg-[#45553D] hover:bg-[#6D7E5F]"
      >Continue Shopping</button>
    </div>

    <div v-else-if="!showSuccess" class="max-w-5xl mx-auto px-6 py-10">

      <!-- ═══════════════ STEP 1: BAG ═══════════════ -->
      <div v-if="currentStep === 1">
        <h1 class="text-3xl font-bold mb-8 text-[#0D120E]">Your Bag ({{ cartStore.items.length }})</h1>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <!-- Items list -->
          <div class="rounded-2xl p-8 space-y-4" style="background: rgba(232,233,224,0.65); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.4);">
            <div
              v-for="item in cartStore.items"
              :key="item.product.id"
              class="flex items-center gap-4 pb-4 border-b border-[#45553D]/10 last:border-0 last:pb-0"
            >
              <img :src="item.product.thumbnail" class="w-16 h-16 rounded-xl object-cover bg-white p-2" />
              <div class="flex-1">
                <p class="text-base font-medium text-[#0D120E]">{{ item.product.title }}</p>
                <p class="text-xs uppercase tracking-wide text-[#45553D]/60">{{ item.product.brand }}</p>
                <p class="text-sm text-[#45553D] font-semibold mt-1">${{ item.product.price }}</p>
                <p class="text-xs text-[#6D7E5F]">Qty: {{ item.quantity }}</p>
              </div>
              <div class="flex flex-col items-end gap-2">
                <p class="text-sm font-bold text-[#45553D]">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
                <button
                  @click="cartStore.removeFromCart(item.product.id)"
                  class="text-xs text-red-400 hover:text-red-600 transition uppercase tracking-wide"
                >Remove</button>
              </div>
            </div>
          </div>

          <!-- Summary + proceed -->
          <div class="rounded-2xl p-8 sticky top-6" style="background: rgba(232,233,224,0.8); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.4);">
            <p class="text-xs uppercase tracking-widest text-[#45553D]/70 mb-4">Order Summary</p>
            <div class="space-y-3">
              <div class="flex justify-between text-sm text-[#45553D]/70">
                <span>Sub Total</span><span>${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm text-[#45553D]/70">
                <span>Shipping</span><span>Free</span>
              </div>
            </div>
            <div class="flex justify-between items-center mt-6 pt-6 border-t border-[#45553D]/20">
              <span class="text-sm uppercase tracking-widest text-[#45553D]/70">Total</span>
              <span class="text-3xl font-bold text-[#45553D]">${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>

            <!-- KEY FIX: checks auth before proceeding -->
            <button
              @click="proceedToDetails"
              class="w-full mt-6 py-3 rounded-xl text-white text-sm font-semibold bg-[#45553D] hover:bg-[#6D7E5F] transition"
            >
              Proceed to Details →
            </button>
            <button
              @click="router.push('/')"
              class="w-full mt-3 py-3 rounded-xl text-sm font-medium text-[#45553D] bg-[#45553D]/10 hover:bg-[#45553D]/20 transition"
            >
              continue shopping
            </button>
          </div>
        </div>
      </div>

      <!-- ═══════════════ STEP 2: DETAILS ═══════════════ -->
      <div v-if="currentStep === 2">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div class="rounded-2xl p-10" style="background: rgba(232,233,224,0.65); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.4);">
            <h1 class="text-3xl font-bold mb-8 text-[#0D120E]">Checkout Details</h1>

            <section class="mb-8">
              <p class="text-xs uppercase tracking-widest text-[#45553D]/70 mb-4">Contact Information</p>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <InputField label="First Name" v-model="form.firstName" :error="errors.firstName" />
                <InputField label="Last Name" v-model="form.lastName" :error="errors.lastName" />
              </div>
              <div class="mb-4">
                <InputField label="Email Address" type="email" v-model="form.email" :error="errors.email" />
              </div>
              <InputField label="Phone" type="tel" v-model="form.phone" :error="errors.phone" />
            </section>

            <div class="h-px bg-[#45553D]/10 mb-8"></div>

            <section class="mb-8">
              <p class="text-xs uppercase tracking-widest text-[#45553D]/70 mb-4">Delivery Address</p>
              <div class="mb-4">
                <InputField label="Street Address" v-model="form.address" :error="errors.address" />
              </div>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <InputField label="City" v-model="form.city" :error="errors.city" />
                <InputField label="Postal Code" v-model="form.postalCode" :error="errors.postalCode" />
              </div>
              <InputField label="Country" v-model="form.country" :error="errors.country" />
            </section>

            <div class="h-px bg-[#45553D]/10 mb-8"></div>

            <section>
              <p class="text-xs uppercase tracking-widest text-[#45553D]/70 mb-4">Payment</p>
              <div class="mb-4">
                <InputField label="Card Number" v-model="form.cardNumber" :error="errors.cardNumber" maxlength="19" @input="formatCard" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <InputField label="Expiry" v-model="form.expiry" :error="errors.expiry" maxlength="5" @input="formatExpiry" />
                <InputField label="CVV" type="password" v-model="form.cvv" :error="errors.cvv" maxlength="4" />
              </div>
            </section>
          </div>

          <!-- Order summary -->
          <div>
            <div class="sticky top-6 rounded-2xl p-8" style="background: rgba(232,233,224,0.8); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.4);">
              <p class="text-xs uppercase tracking-widest text-[#45553D]/70 mb-2">Your Order</p>
              <div class="w-8 h-px bg-[#45553D]/40 mb-6"></div>

              <div v-for="item in cartStore.items" :key="item.product.id" class="flex items-center gap-4 pb-4 mb-4 border-b border-[#45553D]/10">
                <img :src="item.product.thumbnail" class="w-16 h-16 rounded-xl object-cover bg-white p-2" />
                <div class="flex-1">
                  <p class="text-base font-medium text-[#0D120E]">{{ item.product.title }}</p>
                  <p class="text-xs uppercase tracking-wide text-[#45553D]/60">{{ item.product.brand }}</p>
                  <p class="text-sm text-[#6D7E5F] mt-1">Qty {{ item.quantity }}</p>
                </div>
                <p class="text-sm font-bold text-[#45553D]">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
              </div>

              <div class="space-y-3 mt-4">
                <div class="flex justify-between text-sm text-[#45553D]/70">
                  <span>Subtotal</span><span>${{ cartStore.totalPrice.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm text-[#45553D]/70">
                  <span>Shipping</span><span>Free</span>
                </div>
              </div>

              <div class="flex justify-between items-center mt-6 pt-6 border-t border-[#45553D]/20">
                <span class="text-sm uppercase tracking-widest text-[#45553D]/70">Total</span>
                <span class="text-3xl font-bold text-[#45553D]">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>

              <button
                @click="proceedToConfirm"
                class="w-full mt-6 py-3 rounded-xl text-white text-sm font-semibold bg-[#45553D] hover:bg-[#6D7E5F] transition"
              >
                Review Order →
              </button>
              <p class="text-xs text-center text-[#45553D]/50 mt-4">Secured · Encrypted · Private</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════════════ STEP 3: CONFIRM ═══════════════ -->
      <div v-if="currentStep === 3">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div class="rounded-2xl p-10 space-y-8" style="background: rgba(232,233,224,0.65); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.4);">
            <h1 class="text-3xl font-bold text-[#0D120E]">Confirm Order</h1>

            <div>
              <p class="text-xs uppercase tracking-widest text-[#45553D]/70 mb-3">Contact</p>
              <p class="text-sm text-[#0D120E] font-medium">{{ form.firstName }} {{ form.lastName }}</p>
              <p class="text-sm text-[#45553D]/70">{{ form.email }}</p>
              <p class="text-sm text-[#45553D]/70">{{ form.phone }}</p>
            </div>

            <div class="h-px bg-[#45553D]/10"></div>

            <div>
              <p class="text-xs uppercase tracking-widest text-[#45553D]/70 mb-3">Delivery Address</p>
              <p class="text-sm text-[#0D120E]">{{ form.address }}</p>
              <p class="text-sm text-[#45553D]/70">{{ form.city }}, {{ form.postalCode }}</p>
              <p class="text-sm text-[#45553D]/70">{{ form.country }}</p>
            </div>

            <div class="h-px bg-[#45553D]/10"></div>

            <div>
              <p class="text-xs uppercase tracking-widest text-[#45553D]/70 mb-3">Payment</p>
              <p class="text-sm text-[#0D120E]">•••• •••• •••• {{ form.cardNumber.slice(-4) }}</p>
              <p class="text-sm text-[#45553D]/70">Expires {{ form.expiry }}</p>
            </div>

            <button
              @click="goToStep(2)"
              class="text-xs uppercase tracking-widest text-[#45553D]/60 hover:text-[#45553D] transition"
            >
              ← Edit Details
            </button>
          </div>

          <div>
            <div class="sticky top-6 rounded-2xl p-8" style="background: rgba(232,233,224,0.8); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.4);">
              <p class="text-xs uppercase tracking-widest text-[#45553D]/70 mb-2">Your Order</p>
              <div class="w-8 h-px bg-[#45553D]/40 mb-6"></div>

              <div v-for="item in cartStore.items" :key="item.product.id" class="flex items-center gap-4 pb-4 mb-4 border-b border-[#45553D]/10">
                <img :src="item.product.thumbnail" class="w-16 h-16 rounded-xl object-cover bg-white p-2" />
                <div class="flex-1">
                  <p class="text-base font-medium text-[#0D120E]">{{ item.product.title }}</p>
                  <p class="text-xs uppercase tracking-wide text-[#45553D]/60">{{ item.product.brand }}</p>
                  <p class="text-sm text-[#6D7E5F] mt-1">Qty {{ item.quantity }}</p>
                </div>
                <p class="text-sm font-bold text-[#45553D]">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
              </div>

              <div class="space-y-3 mt-4">
                <div class="flex justify-between text-sm text-[#45553D]/70">
                  <span>Subtotal</span><span>${{ cartStore.totalPrice.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm text-[#45553D]/70">
                  <span>Shipping</span><span>Free</span>
                </div>
              </div>

              <div class="flex justify-between items-center mt-6 pt-6 border-t border-[#45553D]/20">
                <span class="text-sm uppercase tracking-widest text-[#45553D]/70">Total</span>
                <span class="text-3xl font-bold text-[#45553D]">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>

              <button
                @click="handlePlaceOrder"
                :disabled="loading"
                class="w-full mt-6 py-3 rounded-xl text-white text-sm font-semibold bg-[#45553D] hover:bg-[#6D7E5F] disabled:opacity-60 transition"
              >
                {{ loading ? 'Processing...' : 'Place Order' }}
              </button>
              <p class="text-xs text-center text-[#45553D]/50 mt-4">Secured · Encrypted · Private</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccess" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-[#f0ede6] rounded-2xl p-10 max-w-sm w-[90%] text-center">
        <div class="w-14 h-14 rounded-full bg-[#45553D] flex items-center justify-center mx-auto mb-5 text-[#E8E9E0] text-2xl">✓</div>
        <h2 class="text-3xl font-bold text-[#0D120E] mb-2">Order Placed</h2>
        <p class="text-sm text-[#45553D]/70 mb-6">Thank you, {{ form.firstName }}. Your order has been received.</p>
        <button @click="handleDone" class="w-full py-3 rounded-xl text-white text-sm font-semibold bg-[#45553D] hover:bg-[#6D7E5F]">
          Continue Shopping
        </button>
      </div>
    </div>

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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineComponent, h } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

const currentStep = ref(1)
const loading = ref(false)
const showSuccess = ref(false)

const form = reactive({
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', postalCode: '', country: '',
  cardNumber: '', expiry: '', cvv: '',
})

const errors = reactive<Record<string, string>>({})

function goToStep(step: number) {
  if (step < currentStep.value) currentStep.value = step
}

// ── KEY FIX: auth check before details ──
function proceedToDetails() {
  if (!authStore.isLoggedIn) {
    router.push({ path: '/login', query: { redirect: '/checkout' } })
    return
  }
  currentStep.value = 2
}

function proceedToConfirm() {
  if (validate()) currentStep.value = 3
}

const InputField = defineComponent({
  props: {
    label: String, modelValue: String, error: String,
    type: { type: String, default: 'text' }, maxlength: String,
  },
  emits: ['update:modelValue', 'input'],
  setup(props, { emit }) {
    return () => h('div', [
      h('label', { class: 'block text-xs uppercase tracking-wide text-[#45553D]/60 mb-2' }, props.label),
      h('input', {
        value: props.modelValue, type: props.type, maxlength: props.maxlength,
        onInput: (e: Event) => {
          emit('update:modelValue', (e.target as HTMLInputElement).value)
          emit('input')
        },
        class: 'w-full bg-transparent border-b border-[#45553D]/30 h-9 text-base text-[#2c3527] outline-none px-1 font-serif focus:border-[#45553D]',
      }),
      props.error ? h('p', { class: 'text-red-700 text-xs mt-1' }, props.error) : null,
    ])
  },
})

function formatCard() {
  form.cardNumber = form.cardNumber.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry() {
  form.expiry = form.expiry.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2')
}

function validate(): boolean {
  Object.keys(errors).forEach((key) => delete errors[key])
  if (!form.firstName.trim()) errors.firstName = 'Required'
  if (!form.lastName.trim()) errors.lastName = 'Required'
  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'Valid email required'
  if (!form.phone.trim()) errors.phone = 'Required'
  if (!form.address.trim()) errors.address = 'Required'
  if (!form.city.trim()) errors.city = 'Required'
  if (!form.postalCode.trim()) errors.postalCode = 'Required'
  if (!form.country.trim()) errors.country = 'Required'
  if (form.cardNumber.replace(/\s/g, '').length !== 16) errors.cardNumber = 'Enter a valid 16-digit card number'
  if (!form.expiry.match(/^\d{2}\/\d{2}$/)) errors.expiry = 'Format: MM/YY'
  if (form.cvv.length < 3) errors.cvv = 'Invalid CVV'
  return Object.keys(errors).length === 0
}

async function handlePlaceOrder() {
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 1500))
  loading.value = false
  showSuccess.value = true
}

function handleDone() {
  cartStore.items.splice(0)
  showSuccess.value = false
  router.push('/')
}
</script>

<style scoped>
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

@media (max-width: 900px) {
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