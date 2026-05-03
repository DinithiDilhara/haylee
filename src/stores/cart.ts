import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '../types/product'

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  )

  function addToCart(product: Product) {
    const existing = items.value.find(i => i.product.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
  }

  function removeFromCart(productId: number) {
    items.value = items.value.filter(i => i.product.id !== productId)
  }

  function increaseQuantity(productId: number) {
    const item = items.value.find(i => i.product.id === productId)
    if (item) item.quantity++
  }

  function decreaseQuantity(productId: number) {
    const item = items.value.find(i => i.product.id === productId)
    if (item) {
      if (item.quantity > 1) {
        item.quantity--
      } else {
        removeFromCart(productId)
      }
    }
  }

  return { items, totalItems, totalPrice, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }
})