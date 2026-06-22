import { ref, computed } from 'vue'

// Reactive state
export const cart = ref([])
export const isCartOpen = ref(false)
export const activeProduct = ref(null)
export const isSearchOpen = ref(false)
export const searchQuery = ref('')

// Helpers
const getCartItemKey = (productId, size, color) => {
  return `${productId}-${size}-${color}`
}

// Get total price helper (parses currency like "$2,890" -> 2890)
const parsePrice = (priceStr) => {
  if (!priceStr) return 0
  return parseFloat(priceStr.replace(/[^0-9.]/g, ''))
}

// Computed properties
export const cartTotalItems = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0)
})

export const cartSubtotal = computed(() => {
  const total = cart.value.reduce((total, item) => {
    const price = parsePrice(item.product.price)
    return total + price * item.quantity
  }, 0)
  // Format as USD currency
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)
})

// Actions
export const addToCart = (product, quantity = 1, size = 'M', color = 'Champagne Gold') => {
  const itemKey = getCartItemKey(product.id, size, color)
  
  const existingItemIndex = cart.value.findIndex(
    (item) => getCartItemKey(item.product.id, item.selectedSize, item.selectedColor) === itemKey
  )

  if (existingItemIndex > -1) {
    cart.value[existingItemIndex].quantity += quantity
  } else {
    cart.value.push({
      id: itemKey,
      product,
      quantity,
      selectedSize: size,
      selectedColor: color,
    })
  }

  // Open the cart drawer automatically for feedback
  isCartOpen.value = true
}

export const removeFromCart = (itemId) => {
  cart.value = cart.value.filter((item) => item.id !== itemId)
}

export const updateCartQuantity = (itemId, newQuantity) => {
  if (newQuantity <= 0) {
    removeFromCart(itemId)
    return
  }
  const item = cart.value.find((item) => item.id === itemId)
  if (item) {
    item.quantity = newQuantity
  }
}

export const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value
}

export const openProductModal = (product) => {
  activeProduct.value = product
}

export const closeProductModal = () => {
  activeProduct.value = null
}

export const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (!isSearchOpen.value) {
    searchQuery.value = ''
  }
}
