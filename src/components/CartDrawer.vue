<template>
  <div class="fixed inset-0 z-50 flex justify-end">
    <div class="absolute inset-0 bg-ash-500 bg- bg-opacity-50" @click="$emit('close')"></div>
    <div class="relative bg-white w-full max-w-md h-full flex flex-col shadow-xl">
      <div class="flex items-center justify-between p-6 border-b">
        <h2 class="text-lg font-bold text-gray-900">Cart ({{ cartStore.totalItems }})</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-900 text-2xl font-bold">✕</button>
      </div>

      <div class="flex-1 overflow-y-auto p-6">
        <div v-if="cartStore.items.length === 0" class="text-center text-gray-400 mt-20">
          <p class="text-4xl mb-4">🛒</p>
          <p>Your cart is empty</p>
        </div>
        <div v-else class="flex flex-col gap-4">
          <div
            v-for="item in cartStore.items"
            :key="item.product.id"
            class="flex gap-4 items-center border-b pb-4"
          >
            <img :src="item.product.thumbnail" :alt="item.product.title" class="w-16 h-16 object-cover rounded-lg bg-gray-100"/>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 line-clamp-1">{{ item.product.title }}</p>
              <p class="text-sm text-indigo-600 font-bold">${{ item.product.price }}</p>
              <p class="text-xs text-gray-500">Qty: {{ item.quantity }}</p>
            </div>
            <button
              @click="cartStore.removeFromCart(item.product.id)"
              class="text-red-400 hover:text-red-600 text-sm"
            >Remove</button>
          </div>
        </div>
      </div>

      <div class="p-6 border-t">
        <div class="flex justify-between items-center mb-4">
          <span class="font-bold text-gray-900">Total</span>
          <span class="font-bold text-indigo-600 text-xl">${{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>
        <button class="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
          Checkout
        </button>
      </div>
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