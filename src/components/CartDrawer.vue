<template>
  <div class="w-96 h-full flex flex-col shadow-xl overflow-y-auto" style="background: #E8E9E0; min-width: 380px;">
    <div class="flex items-center justify-between p-6" style="border-bottom: 1px solid #C4C8AC;">
      <h2 class="text-lg font-bold" style="color: #0D120E;">
        Cart
        <span class="text-sm px-2 py-0.5 rounded-full ml-1" style="background: #6D7E5F; color: #E8E9E0;">
          {{ cartStore.totalItems }}
        </span>
      </h2>
      <button @click="$emit('close')" class="text-xl font-bold" style="color: #45553D;">✕</button>
    </div>

    <div class="flex-1 overflow-y-auto p-6">
      <div v-if="cartStore.items.length === 0" class="text-center mt-20" style="color: #6D7E5F;">
        <p class="text-4xl mb-4">🛒</p>
        <p>Your cart is empty</p>
      </div>
      <div v-else class="flex flex-col gap-4">
        <div
          v-for="item in cartStore.items"
          :key="item.product.id"
          class="flex gap-4 items-center pb-4"
          style="border-bottom: 1px solid #C4C8AC;"
        >
          <img
            :src="item.product.thumbnail"
            :alt="item.product.title"
            class="w-16 h-16 object-cover rounded-lg"
            style="background: #fff;"
          />
          <div class="flex-1">
            <p class="text-xs uppercase tracking-wide" style="color: #45553D;">{{ item.product.brand }}</p>
            <p class="text-sm font-medium line-clamp-1" style="color: #0D120E;">{{ item.product.title }}</p>
            <p class="text-sm font-bold" style="color: #45553D;">${{ item.product.price }}</p>
            <p class="text-xs" style="color: #6D7E5F;">Qty: {{ item.quantity }}</p>
          </div>
          <div class="flex flex-col items-end gap-2">
            <button
              @click="cartStore.removeFromCart(item.product.id)"
              class="text-sm"
              style="color: #c0392b;"
            >Remove</button>
            <span class="text-xs" style="color: #6D7E5F;">★ {{ item.product.rating }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="p-6" style="border-top: 1px solid #C4C8AC;">
      <div class="flex justify-between items-center mb-4">
        <span class="font-bold text-lg" style="color: #0D120E;">Total</span>
        <span class="font-bold text-xl" style="color: #45553D;">${{ cartStore.totalPrice.toFixed(2) }}</span>
      </div>
      <button
        class="w-full text-white py-3 rounded-xl font-medium transition-colors"
        style="background: #45553D;"
        onmouseover="this.style.background='#6D7E5F'"
        onmouseout="this.style.background='#45553D'"
      >
        Checkout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart'
const cartStore = useCartStore()
defineEmits<{
  close: []
}>()
</script>