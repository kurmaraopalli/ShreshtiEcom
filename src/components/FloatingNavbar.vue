<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { cartTotalItems, toggleCart, isSearchOpen, toggleSearch, searchQuery } from '../data/store.js'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Collections', href: '#collections' },
  { label: 'Beauty', href: '#beauty' },
  { label: 'About', href: '#about' },
]

function handleScroll() {
  isScrolled.value = window.scrollY > 30
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    id="floating-navbar"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-fade-in-down"
    :class="[
      isScrolled
        ? 'glass shadow-lg shadow-obsidian/50 border-b border-champagne/20'
        : 'bg-transparent border-b border-champagne/10'
    ]"
  >
    <div class="animate-float-slow">
      <nav class="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        <!-- Brand Logo -->
        <a href="#home" class="flex items-center gap-3 group" id="nav-logo">
          <div class="relative">
            <i class="fas fa-gem text-champagne text-xl group-hover:text-champagne-light transition-colors duration-300"></i>
            <div class="absolute -inset-2 bg-champagne/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <span class="font-luxury text-2xl tracking-[0.15em] text-champagne font-bold">
            SHRESHTI
          </span>
        </a>

        <!-- Desktop Navigation -->
        <ul class="hidden md:flex items-center gap-10" id="nav-links">
          <li v-for="link in navLinks" :key="link.label">
            <a
              :href="link.href"
              class="relative font-body text-sm tracking-[0.1em] uppercase text-pearl-dim hover:text-champagne-light transition-colors duration-300 py-2 group"
            >
              {{ link.label }}
              <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-champagne-light group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
        </ul>

        <!-- Action Icons -->
        <div class="hidden md:flex items-center gap-5" id="nav-actions">
          <button
            class="text-pearl-dim hover:text-champagne-light transition-colors duration-300 relative group"
            aria-label="Search"
            id="nav-search-btn"
            @click="toggleSearch"
          >
            <i class="fas fa-search text-sm"></i>
            <span class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-pearl-dim opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Search</span>
          </button>
          <button
            class="text-pearl-dim hover:text-champagne-light transition-colors duration-300 relative group"
            aria-label="Wishlist"
            id="nav-wishlist-btn"
          >
            <i class="fas fa-heart text-sm"></i>
            <span class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-pearl-dim opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Wishlist</span>
          </button>
          <button
            class="text-pearl-dim hover:text-champagne-light transition-colors duration-300 relative group"
            aria-label="Cart"
            id="nav-cart-btn"
            @click="toggleCart"
          >
            <i class="fas fa-shopping-bag text-sm"></i>
            <span v-if="cartTotalItems > 0" class="absolute -top-1 -right-2 w-4 h-4 bg-champagne text-obsidian text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse-glow">
              {{ cartTotalItems }}
            </span>
            <span class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-pearl-dim opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Cart</span>
          </button>

          <div class="w-[1px] h-6 bg-champagne/20 mx-1"></div>

          <a
            href="#shop"
            class="relative px-6 py-2 text-xs tracking-[0.15em] uppercase font-body font-medium text-obsidian bg-champagne rounded hover:bg-champagne-light transition-all duration-300 hover:-translate-y-0.5 animate-pulse-glow"
            id="nav-shop-btn"
          >
            Shop Now
          </a>
        </div>

        <!-- Mobile Menu Toggle -->
        <button
          class="md:hidden text-pearl-dim hover:text-champagne transition-colors duration-300"
          @click="toggleMobileMenu"
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          <i :class="isMobileMenuOpen ? 'fas fa-times text-lg' : 'fas fa-bars text-lg'"></i>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <transition name="slide-down">
        <div v-if="isMobileMenuOpen" class="md:hidden glass border-t border-champagne/10">
          <ul class="flex flex-col items-center py-6 gap-5">
            <li v-for="link in navLinks" :key="link.label">
              <a
                :href="link.href"
                class="font-body text-sm tracking-[0.1em] uppercase text-pearl-dim hover:text-champagne-light transition-colors duration-300"
                @click="isMobileMenuOpen = false"
              >
                {{ link.label }}
              </a>
            </li>
            <li>
              <a
                href="#shop"
                class="px-6 py-2 text-xs tracking-[0.15em] uppercase font-body font-medium text-obsidian bg-champagne rounded hover:bg-champagne-light transition-all duration-300"
              >
                Shop Now
              </a>
            </li>
          </ul>
        </div>
      </transition>

      <!-- Search Overlay -->
      <transition name="fade">
        <div 
          v-if="isSearchOpen" 
          class="fixed inset-0 bg-obsidian-deep/95 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-6"
        >
          <button 
            @click="toggleSearch" 
            class="absolute top-6 right-6 text-pearl-dim hover:text-champagne transition-colors duration-300"
            aria-label="Close search"
          >
            <i class="fas fa-times text-2xl"></i>
          </button>

          <div class="w-full max-w-2xl text-center space-y-8 animate-scale-in">
            <h2 class="font-luxury text-3xl sm:text-4xl text-pearl tracking-wider">Search Our Catalog</h2>
            
            <div class="relative border-b border-champagne/30 focus-within:border-champagne transition-colors duration-500 py-3">
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="What are you looking for..." 
                class="w-full bg-transparent border-none text-pearl placeholder-pearl-dim/40 text-xl font-body text-center focus:ring-0 focus:outline-none"
                autofocus
              />
              <i class="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-champagne text-lg"></i>
            </div>

            <p class="font-body text-xs text-pearl-dim/50 tracking-widest uppercase">
              Try searching for: <span class="text-champagne-light font-medium italic">Gown</span>, <span class="text-champagne-light font-medium italic">Serum</span>, <span class="text-champagne-light font-medium italic">Ring</span>
            </p>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.35s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
