<template>
  <div class="min-h-screen" style="background: #f0ede6;">

    <!-- Top bar -->
    <div class="flex items-center justify-between px-8 py-4" style="background: #45553D;">
      <button @click="router.back()" style="color: rgba(232,223,200,0.5); font-size: 11px; letter-spacing: 2.5px; font-family: sans-serif;">← RETURN</button>
      <span style="color: #e8dfc8; font-size: 17px; letter-spacing: 5px; font-style: italic; font-family: Georgia, serif;">Haylee</span>
      <div class="flex items-center gap-2" style="font-family: sans-serif; font-size: 9px; letter-spacing: 2px;">
        <span style="color: #e8dfc8;">BAG</span>
        <span style="color: rgba(232,223,200,0.3);">—</span>
        <span style="color: #fff; border-bottom: 1px solid #fff; padding-bottom: 1px;">DETAILS</span>
        <span style="color: rgba(232,223,200,0.3);">—</span>
        <span style="color: rgba(232,223,200,0.3);">CONFIRM</span>
      </div>
    </div>

    <!-- Empty cart -->
    <div v-if="cartStore.items.length === 0" class="flex flex-col items-center justify-center h-96 gap-4">
      <p style="color: #45553D; font-size: 14px; letter-spacing: 2px; font-family: sans-serif;">YOUR BAG IS EMPTY</p>
      <button @click="router.push('/home')"
        class="px-8 py-3 text-white"
        style="background: #45553D; border-radius: 3px; font-size: 9px; letter-spacing: 3px; font-family: sans-serif;">
        CONTINUE SHOPPING
      </button>
    </div>

    <div v-else class="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

      <!-- LEFT: Form -->
      <div class="flex flex-col gap-8">

        <!-- Contact -->
        <section>
          <p style="font-size: 8px; letter-spacing: 3.5px; color: #45553D; opacity: 0.7; font-family: sans-serif; margin-bottom: 16px;">CONTACT INFORMATION</p>
          <div class="grid grid-cols-2 gap-4 mb-3">
            <div>
              <label style="display:block; font-size:8px; letter-spacing:1.8px; color:rgba(69,85,61,0.5); margin-bottom:5px; font-family:sans-serif;">FIRST NAME</label>
              <input v-model="form.firstName" type="text" placeholder="Jane"
                style="width:100%; background:transparent; border:none; border-bottom:0.5px solid rgba(69,85,61,0.3); height:30px; font-family:Georgia,serif; font-size:13px; color:#2c3527; outline:none; padding: 0 2px;" />
              <p v-if="errors.firstName" style="color:#c0392b; font-size:10px; margin-top:3px;">{{ errors.firstName }}</p>
            </div>
            <div>
              <label style="display:block; font-size:8px; letter-spacing:1.8px; color:rgba(69,85,61,0.5); margin-bottom:5px; font-family:sans-serif;">LAST NAME</label>
              <input v-model="form.lastName" type="text" placeholder="Doe"
                style="width:100%; background:transparent; border:none; border-bottom:0.5px solid rgba(69,85,61,0.3); height:30px; font-family:Georgia,serif; font-size:13px; color:#2c3527; outline:none; padding: 0 2px;" />
              <p v-if="errors.lastName" style="color:#c0392b; font-size:10px; margin-top:3px;">{{ errors.lastName }}</p>
            </div>
          </div>
          <div class="mb-3">
            <label style="display:block; font-size:8px; letter-spacing:1.8px; color:rgba(69,85,61,0.5); margin-bottom:5px; font-family:sans-serif;">EMAIL ADDRESS</label>
            <input v-model="form.email" type="email" placeholder="jane@example.com"
              style="width:100%; background:transparent; border:none; border-bottom:0.5px solid rgba(69,85,61,0.3); height:30px; font-family:Georgia,serif; font-size:13px; color:#2c3527; outline:none; padding: 0 2px;" />
            <p v-if="errors.email" style="color:#c0392b; font-size:10px; margin-top:3px;">{{ errors.email }}</p>
          </div>
          <div>
            <label style="display:block; font-size:8px; letter-spacing:1.8px; color:rgba(69,85,61,0.5); margin-bottom:5px; font-family:sans-serif;">PHONE</label>
            <input v-model="form.phone" type="tel" placeholder="+1 234 567 8900"
              style="width:100%; background:transparent; border:none; border-bottom:0.5px solid rgba(69,85,61,0.3); height:30px; font-family:Georgia,serif; font-size:13px; color:#2c3527; outline:none; padding: 0 2px;" />
            <p v-if="errors.phone" style="color:#c0392b; font-size:10px; margin-top:3px;">{{ errors.phone }}</p>
          </div>
        </section>

        <div style="height:0.5px; background:rgba(69,85,61,0.1);"></div>

        <!-- Shipping -->
        <section>
          <p style="font-size: 8px; letter-spacing: 3.5px; color: #45553D; opacity: 0.7; font-family: sans-serif; margin-bottom: 16px;">DELIVERY ADDRESS</p>
          <div class="mb-3">
            <label style="display:block; font-size:8px; letter-spacing:1.8px; color:rgba(69,85,61,0.5); margin-bottom:5px; font-family:sans-serif;">STREET ADDRESS</label>
            <input v-model="form.address" type="text" placeholder="123 Main Street"
              style="width:100%; background:transparent; border:none; border-bottom:0.5px solid rgba(69,85,61,0.3); height:30px; font-family:Georgia,serif; font-size:13px; color:#2c3527; outline:none; padding: 0 2px;" />
            <p v-if="errors.address" style="color:#c0392b; font-size:10px; margin-top:3px;">{{ errors.address }}</p>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-3">
            <div>
              <label style="display:block; font-size:8px; letter-spacing:1.8px; color:rgba(69,85,61,0.5); margin-bottom:5px; font-family:sans-serif;">CITY</label>
              <input v-model="form.city" type="text" placeholder="New York"
                style="width:100%; background:transparent; border:none; border-bottom:0.5px solid rgba(69,85,61,0.3); height:30px; font-family:Georgia,serif; font-size:13px; color:#2c3527; outline:none; padding: 0 2px;" />
              <p v-if="errors.city" style="color:#c0392b; font-size:10px; margin-top:3px;">{{ errors.city }}</p>
            </div>
            <div>
              <label style="display:block; font-size:8px; letter-spacing:1.8px; color:rgba(69,85,61,0.5); margin-bottom:5px; font-family:sans-serif;">POSTAL CODE</label>
              <input v-model="form.postalCode" type="text" placeholder="10001"
                style="width:100%; background:transparent; border:none; border-bottom:0.5px solid rgba(69,85,61,0.3); height:30px; font-family:Georgia,serif; font-size:13px; color:#2c3527; outline:none; padding: 0 2px;" />
              <p v-if="errors.postalCode" style="color:#c0392b; font-size:10px; margin-top:3px;">{{ errors.postalCode }}</p>
            </div>
          </div>
          <div>
            <label style="display:block; font-size:8px; letter-spacing:1.8px; color:rgba(69,85,61,0.5); margin-bottom:5px; font-family:sans-serif;">COUNTRY</label>
            <input v-model="form.country" type="text" placeholder="United States"
              style="width:100%; background:transparent; border:none; border-bottom:0.5px solid rgba(69,85,61,0.3); height:30px; font-family:Georgia,serif; font-size:13px; color:#2c3527; outline:none; padding: 0 2px;" />
            <p v-if="errors.country" style="color:#c0392b; font-size:10px; margin-top:3px;">{{ errors.country }}</p>
          </div>
        </section>

        <div style="height:0.5px; background:rgba(69,85,61,0.1);"></div>

        <!-- Payment -->
        <section>
          <p style="font-size: 8px; letter-spacing: 3.5px; color: #45553D; opacity: 0.7; font-family: sans-serif; margin-bottom: 16px;">PAYMENT</p>
          <div class="mb-3">
            <label style="display:block; font-size:8px; letter-spacing:1.8px; color:rgba(69,85,61,0.5); margin-bottom:5px; font-family:sans-serif;">CARD NUMBER</label>
            <input v-model="form.cardNumber" type="text" placeholder="1234  5678  9012  3456" maxlength="19" @input="formatCard"
              style="width:100%; background:transparent; border:none; border-bottom:0.5px solid rgba(69,85,61,0.3); height:30px; font-family:Georgia,serif; font-size:13px; color:#2c3527; outline:none; padding: 0 2px;" />
            <p v-if="errors.cardNumber" style="color:#c0392b; font-size:10px; margin-top:3px;">{{ errors.cardNumber }}</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label style="display:block; font-size:8px; letter-spacing:1.8px; color:rgba(69,85,61,0.5); margin-bottom:5px; font-family:sans-serif;">EXPIRY</label>
              <input v-model="form.expiry" type="text" placeholder="08 / 27" maxlength="5" @input="formatExpiry"
                style="width:100%; background:transparent; border:none; border-bottom:0.5px solid rgba(69,85,61,0.3); height:30px; font-family:Georgia,serif; font-size:13px; color:#2c3527; outline:none; padding: 0 2px;" />
              <p v-if="errors.expiry" style="color:#c0392b; font-size:10px; margin-top:3px;">{{ errors.expiry }}</p>
            </div>
            <div>
              <label style="display:block; font-size:8px; letter-spacing:1.8px; color:rgba(69,85,61,0.5); margin-bottom:5px; font-family:sans-serif;">CVV</label>
              <input v-model="form.cvv" type="password" placeholder="• • •" maxlength="4"
                style="width:100%; background:transparent; border:none; border-bottom:0.5px solid rgba(69,85,61,0.3); height:30px; font-family:Georgia,serif; font-size:13px; color:#2c3527; outline:none; padding: 0 2px;" />
              <p v-if="errors.cvv" style="color:#c0392b; font-size:10px; margin-top:3px;">{{ errors.cvv }}</p>
            </div>
          </div>
        </section>
      </div>

      <!-- RIGHT: Order Summary -->
      <div>
        <div class="sticky top-6" style="background: #e8e3d8; border-radius: 12px; padding: 28px; border: 0.5px solid rgba(69,85,61,0.1);">
          <p style="font-size: 8px; letter-spacing: 3.5px; color: #45553D; opacity: 0.7; font-family: sans-serif; margin-bottom: 6px;">YOUR ORDER</p>
          <div style="width: 20px; height: 0.5px; background: #45553D; opacity: 0.4; margin-bottom: 20px;"></div>

          <div v-for="item in cartStore.items" :key="item.product.id"
            class="flex items-center gap-3"
            style="padding-bottom: 14px; margin-bottom: 14px; border-bottom: 0.5px solid rgba(69,85,61,0.1);">
            <img :src="item.product.thumbnail" :alt="item.product.title"
              style="width:44px; height:44px; border-radius:6px; object-fit:cover; background:#ddd8ce; border: 0.5px solid rgba(69,85,61,0.1); flex-shrink:0;" />
            <div style="flex:1;">
              <p style="font-size:12px; color:#2c3527; font-family:Georgia,serif;">{{ item.product.title }}</p>
              <p style="font-size:9px; letter-spacing:1.5px; color:rgba(69,85,61,0.4); font-family:sans-serif;">{{ item.product.brand?.toUpperCase() }}</p>
              <p style="font-size:9px; color:rgba(69,85,61,0.35); font-family:sans-serif; margin-top:2px;">QTY {{ item.quantity }}</p>
            </div>
            <p style="font-size:12px; color:#45553D; font-family:sans-serif; font-weight:600; flex-shrink:0;">
              ${{ (item.product.price * item.quantity).toFixed(2) }}
            </p>
          </div>

          <div style="margin-top: 4px;">
            <div class="flex justify-between mb-2">
              <span style="font-size:9px; letter-spacing:1.5px; color:rgba(69,85,61,0.4); font-family:sans-serif;">SUBTOTAL</span>
              <span style="font-size:11px; color:rgba(69,85,61,0.6); font-family:sans-serif;">${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between mb-2">
              <span style="font-size:9px; letter-spacing:1.5px; color:rgba(69,85,61,0.4); font-family:sans-serif;">SHIPPING</span>
              <span style="font-size:11px; color:#45553D; font-family:sans-serif;">COMPLIMENTARY</span>
            </div>
          </div>

          <div class="flex justify-between" style="margin-top:14px; padding-top:14px; border-top:0.5px solid rgba(69,85,61,0.15);">
            <span style="font-size:9px; letter-spacing:2.5px; color:rgba(69,85,61,0.5); font-family:sans-serif;">TOTAL</span>
            <span style="font-size:17px; color:#45553D; font-family:Georgia,serif;">${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>

          <button
            @click="handlePlaceOrder"
            :disabled="loading"
            style="width:100%; margin-top:18px; padding:13px; background:#45553D; border:none; border-radius:3px; font-size:9px; letter-spacing:4px; color:#e8dfc8; font-family:sans-serif; font-weight:600; cursor:pointer;">
            {{ loading ? 'PROCESSING...' : 'PLACE ORDER' }}
          </button>

          <p style="font-size:8px; letter-spacing:1.5px; color:rgba(69,85,61,0.3); text-align:center; margin-top:10px; font-family:sans-serif;">
            ⟠ &nbsp; SECURED · ENCRYPTED · PRIVATE
          </p>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccess"
      style="position:fixed; inset:0; background:rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center; z-index:50;">
      <div style="background:#f0ede6; border-radius:16px; padding:48px 40px; max-width:380px; width:90%; text-align:center;">
        <div style="width:56px; height:56px; border-radius:50%; background:#45553D; display:flex; align-items:center; justify-content:center; margin:0 auto 20px; color:#e8dfc8; font-size:22px;">✓</div>
        <p style="font-size:20px; color:#2c3527; font-family:Georgia,serif; margin-bottom:8px;">Order Placed</p>
        <p style="font-size:9px; letter-spacing:2px; color:rgba(69,85,61,0.5); font-family:sans-serif; margin-bottom:6px;">THANK YOU, {{ form.firstName.toUpperCase() }}</p>
        <p style="font-size:12px; color:rgba(69,85,61,0.5); font-family:Georgia,serif; margin-bottom:28px;">Your order has been received and is being prepared.</p>
        <button @click="handleDone"
          style="width:100%; padding:13px; background:#45553D; border:none; border-radius:3px; font-size:9px; letter-spacing:4px; color:#e8dfc8; font-family:sans-serif; font-weight:600; cursor:pointer;">
          CONTINUE SHOPPING
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cartStore = useCartStore()

const loading = ref(false)
const showSuccess = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
})

const errors = reactive<Record<string, string>>({})

function formatCard() {
  form.cardNumber = form.cardNumber
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

function formatExpiry() {
  form.expiry = form.expiry
    .replace(/\D/g, '')
    .slice(0, 4)
    .replace(/^(\d{2})(\d)/, '$1/$2')
}

function validate(): boolean {
  Object.keys(errors).forEach(k => delete errors[k])
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
  if (!validate()) return
  loading.value = true
  await new Promise(r => setTimeout(r, 1500))
  loading.value = false
  showSuccess.value = true
}

function handleDone() {
  cartStore.items.splice(0)
  showSuccess.value = false
  router.push('/home')
}
</script>