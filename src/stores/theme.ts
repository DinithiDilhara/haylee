import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  function toggleDark() {
    isDark.value = !isDark.value
    // This is the missing line — actually applies dark mode to the DOM
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  return { isDark, toggleDark }
})