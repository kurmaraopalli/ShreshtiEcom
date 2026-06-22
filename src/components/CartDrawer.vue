<script setup>
import { 
  cart, 
  isCartOpen, 
  cartSubtotal, 
  cartTotalItems,
  removeFromCart, 
  updateCartQuantity,
  toggleCart 
} from '../data/store.js'

function handleCheckout() {
  alert(`Thank you for shopping at Shreshti Ecom! Initiating secure checkout for ${cartSubtotal.value}...`)
}
</script>

<template>
  <div class="relative z-50">
    <!-- Backdrop overlay -->
    <transition name="fade">
      <div 
        v-if="isCartOpen" 
        class="fixed inset-0 bg-obsidian-deep/80 backdrop-blur-sm"
        @click="toggleCart"
      ></div>
    </transition>

    <!-- Slide-out Drawer Panel -->
    <transition name="slide">
      <div 
        v-if="isCartOpen" 
        class="fixed top-0 right-0 h-full w-full sm:w-[440px] glass border-l border-champagne/20 shadow-2xl flex flex-col z-50 overflow-hidden"
      >
        <!-- Header -->
        <div class="p-6 border-b border-champagne/10 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <i class="fas fa-shopping-bag text-champagne text-lg"></i>
            <h2 class="font-luxury text-lg tracking-wider text-pearl font-bold">Shopping Bag</h2>
            <span class="px-2 py-0.5 text-[10px] bg-champagne/20 text-champagne-light rounded-full font-body font-medium">
              {{ cartTotalItems }} {{ cartTotalItems === 1 ? 'item' : 'items' }}
            </span>
          </div>
          <button 
            @click="toggleCart" 
            class="text-pearl-dim hover:text-champagne transition-colors duration-300"
            aria-label="Close cart"
          >
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>

        <!-- Scrollable Cart Items -->
        <div class="flex-1 overflow-y-auto p-6 space-y-5 custom-scroll">
          <transition-group name="list" tag="div" class="space-y-4">
            <div 
              v-for="item in cart" 
              :key="item.id"
              class="relative bg-obsidian-light/60 border border-champagne/10 rounded p-4 flex gap-4 transition-all duration-300 hover:border-champagne/30"
            >
              <!-- Item Image -->
              <div class="relative w-20 h-24 rounded overflow-hidden bg-obsidian-mid border border-champagne/15 shrink-0">
                <img 
                  :src="item.product.image" 
                  :alt="item.product.name" 
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Item Info -->
              <div class="flex-1 flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <h3 class="font-luxury text-sm text-pearl font-medium leading-tight hover:text-champagne-light transition-colors duration-300">
                      {{ item.product.name }}
                    </h3>
                    <button 
                      @click="removeFromCart(item.id)" 
                      class="text-pearl-dim/40 hover:text-red-400 transition-colors duration-300 text-xs py-1"
                      aria-label="Remove item"
                    >
                      <i class="fas fa-trash-can"></i>
                    </button>
                  </div>
                  
                  <!-- Selected size & color attributes -->
                  <div class="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[11px] text-pearl-dim/60 font-body">
                    <span>Size: <strong class="text-champagne-light font-medium">{{ item.selectedSize }}</strong></span>
                    <span class="inline-block w-[1px] h-3 bg-champagne/20 self-center"></span>
                    <span>Color: <strong class="text-champagne-light font-medium">{{ item.selectedColor }}</strong></span>
                  </div>
                </div>

                <!-- Quantity and Price row -->
                <div class="flex justify-between items-center mt-3">
                  <!-- Custom Quantity Selector -->
                  <div class="flex items-center border border-champagne/20 rounded bg-obsidian-deep overflow-hidden">
                    <button 
                      @click="updateCartQuantity(item.id, item.quantity - 1)" 
                      class="px-2.5 py-1 text-[10px] text-pearl-dim hover:text-champagne hover:bg-champagne/5 transition-all duration-300"
                    >
                      <i class="fas fa-minus"></i>
                    </button>
                    <span class="px-3 py-1 text-xs text-pearl font-body font-medium w-8 text-center bg-obsidian/40">
                      {{ item.quantity }}
                    </span>
                    <button 
                      @click="updateCartQuantity(item.id, item.quantity + 1)" 
                      class="px-2.5 py-1 text-[10px] text-pearl-dim hover:text-champagne hover:bg-champagne/5 transition-all duration-300"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>

                  <!-- Price -->
                  <span class="font-body text-sm font-medium text-champagne">
                    {{ item.product.price }}
                  </span>
                </div>
              </div>
            </div>
          </transition-group>

          <!-- Empty Cart State -->
          <div 
            v-if="cart.length === 0" 
            class="h-full flex flex-col items-center justify-center text-center py-20 px-4"
          >
            <div class="relative mb-6 animate-float-medium">
              <div class="w-16 h-16 rounded-full border border-champagne/20 flex items-center justify-center">
                <i class="fas fa-gem text-champagne/40 text-xl"></i>
              </div>
              <div class="absolute inset-0 bg-champagne/5 rounded-full blur-md"></div>
            </div>
            <p class="font-luxury text-base text-pearl tracking-wide mb-2">Your Bag is Empty</p>
            <p class="font-body text-xs text-pearl-dim/50 max-w-[240px] leading-relaxed mb-8">
              Explore our collections and discover weightless silhouettes crafted just for you.
            </p>
            <button 
              @click="toggleCart" 
              class="px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-body font-medium text-champagne border border-champagne/30 rounded hover:border-champagne hover:bg-champagne/5 transition-all duration-300"
            >
              Continue Browsing
            </button>
          </div>
        </div>

        <!-- Footer / Checkout Section -->
        <div v-if="cart.length > 0" class="p-6 border-t border-champagne/10 bg-obsidian-deep/50 space-y-4">
          <!-- Shipping notification -->
          <div class="flex items-center gap-3 p-3 bg-champagne/5 rounded border border-champagne/10 text-left">
            <i class="fas fa-truck-fast text-champagne text-xs"></i>
            <span class="font-body text-[11px] text-pearl-dim/80">
              Complimentary standard shipping applied.
            </span>
          </div>

          <!-- Price Summaries -->
          <div class="space-y-2">
            <div class="flex justify-between items-center text-sm font-body">
              <span class="text-pearl-dim/60">Subtotal</span>
              <span class="text-pearl font-medium">{{ cartSubtotal }}</span>
            </div>
            <div class="flex justify-between items-center text-sm font-body">
              <span class="text-pearl-dim/60">Shipping</span>
              <span class="text-champagne-light font-medium uppercase text-[10px] tracking-wider">Complimentary</span>
            </div>
            <div class="h-[1px] bg-champagne/10 my-2"></div>
            <div class="flex justify-between items-center">
              <span class="font-luxury text-sm text-pearl font-bold uppercase tracking-wider">Total</span>
              <span class="font-body text-lg font-bold text-champagne">{{ cartSubtotal }}</span>
            </div>
          </div>

          <!-- Checkout Button -->
          <button 
            @click="handleCheckout"
            class="group w-full py-4 text-xs tracking-[0.2em] uppercase font-body font-medium text-obsidian bg-champagne rounded hover:bg-champagne-light transition-all duration-500 hover:-translate-y-0.5 animate-pulse-glow flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <i class="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform duration-300"></i>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Scrollbar Customization for cart container */
.custom-scroll::-webkit-scrollbar {
  width: 4px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(212, 168, 83, 0.2);
  border-radius: 2px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(212, 168, 83, 0.4);
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* List animations for items */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
