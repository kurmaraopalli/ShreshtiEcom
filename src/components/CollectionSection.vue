<script setup>
import { ref, onMounted, computed } from 'vue'
import { openProductModal, searchQuery } from '../data/store.js'

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  icon: { type: String, required: true },
  products: { type: Array, required: true },
})

const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      })
    },
    { threshold: 0.05 }
  )

  const section = document.getElementById(`collection-${props.id}`)
  if (section) observer.observe(section)
})

// Assign distinct float animations cyclically
const floatClasses = [
  'animate-float-card-1',
  'animate-float-card-2',
  'animate-float-card-3',
  'animate-float-slow',
  'animate-float-medium',
]

function getFloatClass(index) {
  return floatClasses[index % floatClasses.length]
}

function getDelay(index) {
  return `${0.05 * index}s`
}

// Compute filtered products dynamically based on navbar search query
const filteredProducts = computed(() => {
  if (!searchQuery.value) return props.products
  const query = searchQuery.value.toLowerCase().trim()
  return props.products.filter(product => 
    product.name.toLowerCase().includes(query) || 
    product.category.toLowerCase().includes(query)
  )
})
</script>

<template>
  <section
    :id="`collection-${id}`"
    class="relative py-24 px-6 lg:px-10"
  >
    <!-- Section Header -->
    <div class="max-w-7xl mx-auto mb-16 text-center">
      <div
        class="opacity-0"
        :class="isVisible ? 'animate-fade-in-up' : ''"
      >
        <div class="inline-flex items-center gap-3 mb-4">
          <span class="block w-8 h-[1px] bg-champagne/30"></span>
          <i :class="icon" class="text-champagne text-sm"></i>
          <span class="block w-8 h-[1px] bg-champagne/30"></span>
        </div>
        <p class="font-body text-xs tracking-[0.4em] uppercase text-champagne-muted mb-3">
          {{ subtitle }}
        </p>
        <h2 class="font-luxury text-3xl sm:text-4xl lg:text-5xl text-pearl tracking-wide">
          {{ title }}
        </h2>
        <div class="flex items-center justify-center gap-3 mt-5">
          <span class="block w-16 h-[1px] bg-gradient-to-r from-transparent to-champagne/30"></span>
          <span class="block w-1.5 h-1.5 bg-champagne/40 rotate-45"></span>
          <span class="block w-16 h-[1px] bg-gradient-to-l from-transparent to-champagne/30"></span>
        </div>
      </div>
    </div>

    <!-- Products Grid: 4 columns on large, 2 on medium, 1 on small -->
    <div 
      v-if="filteredProducts.length > 0"
      class="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-6"
    >
      <div
        v-for="(product, index) in filteredProducts"
        :key="product.id"
        class="opacity-0"
        :class="isVisible ? 'animate-fade-in-up' : ''"
        :style="{ animationDelay: getDelay(index) }"
      >
        <div
          class="group relative rounded-lg overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl hover:shadow-champagne/10"
          :class="getFloatClass(index)"
          :style="{ animationPlayState: 'running' }"
          @mouseenter="$event.currentTarget.style.animationPlayState = 'paused'"
          @mouseleave="$event.currentTarget.style.animationPlayState = 'running'"
          @click="openProductModal(product)"
        >
          <!-- Holographic border effect -->
          <div class="absolute inset-0 rounded-lg z-0 opacity-40 group-hover:opacity-80 transition-opacity duration-500"
            style="background: conic-gradient(from 0deg, #d4a853, #e8c878, #f0e6d3, #d4a85380, #b8943f, #e8c878, #d4a853); padding: 1px;">
            <div class="w-full h-full bg-obsidian-light rounded-lg"></div>
          </div>

          <!-- Card Content -->
          <div class="relative z-10 bg-obsidian-light rounded-lg overflow-hidden m-[1px]">
            <!-- Image Container -->
            <div class="relative aspect-[3/4] overflow-hidden bg-obsidian-mid">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <!-- Overlay gradient on hover -->
              <div class="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <!-- Quick action on hover -->
              <div class="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                <button class="w-full py-2.5 bg-champagne/90 hover:bg-champagne text-obsidian text-xs tracking-[0.15em] uppercase font-body font-medium rounded transition-colors duration-300">
                  View Details
                </button>
              </div>

              <!-- Badge -->
              <div v-if="product.badge" class="absolute top-3 left-3">
                <span class="px-2.5 py-1 text-[9px] tracking-[0.15em] uppercase font-body font-medium bg-champagne text-obsidian rounded-sm">
                  {{ product.badge }}
                </span>
              </div>
            </div>

            <!-- Info Section -->
            <div class="p-4">
              <p class="font-body text-[10px] tracking-[0.2em] uppercase text-champagne-muted mb-1.5">
                {{ product.category }}
              </p>
              <h3 class="font-luxury text-sm text-pearl group-hover:text-champagne-light transition-colors duration-300 mb-2 line-clamp-1">
                {{ product.name }}
              </h3>
              <div class="flex items-center gap-2">
                <span class="font-body text-sm font-medium text-champagne">{{ product.price }}</span>
                <span v-if="product.originalPrice" class="font-body text-xs text-pearl-dim/40 line-through">{{ product.originalPrice }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Empty search state -->
    <div v-else class="max-w-7xl mx-auto text-center py-16 bg-obsidian-light/20 border border-champagne/5 rounded-lg">
      <i class="fas fa-search text-champagne/30 text-xl mb-3"></i>
      <p class="font-luxury text-sm text-pearl-dim/60 italic">No pieces found matching your criteria in this collection.</p>
    </div>

    <!-- View All Button -->
    <div
      v-if="filteredProducts.length > 0"
      class="max-w-7xl mx-auto mt-14 text-center opacity-0"
      :class="isVisible ? 'animate-fade-in-up' : ''"
      style="animation-delay: 1.2s;"
    >
      <a
        :href="`#${id}`"
        class="inline-flex items-center gap-3 px-8 py-3 text-xs tracking-[0.2em] uppercase font-body font-medium text-champagne border border-champagne/30 rounded-sm hover:border-champagne hover:bg-champagne/5 transition-all duration-500 hover:-translate-y-1 group"
      >
        View All {{ title }}
        <i class="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform duration-300"></i>
      </a>
    </div>
  </section>
</template>
