<script setup>
import { ref, watch } from 'vue'
import { 
  activeProduct, 
  closeProductModal, 
  addToCart 
} from '../data/store.js'

// Active variants state
const selectedSize = ref('M')
const selectedColor = ref('Champagne Gold')
const quantity = ref(1)

const sizes = ['S', 'M', 'L', 'XL']
const colors = [
  { name: 'Obsidian Black', class: 'bg-[#12121a] border-[#d4a853]/40' },
  { name: 'Champagne Gold', class: 'bg-[#d4a853] border-[#f0e6d3]/40' },
  { name: 'Pearl White', class: 'bg-[#f0e6d3] border-[#d4a853]/40' }
]

// Accordion collapse state
const activeTab = ref('details') // 'details' or 'shipping'

// Reset state when product changes
watch(activeProduct, (newVal) => {
  if (newVal) {
    selectedSize.value = 'M'
    selectedColor.value = 'Champagne Gold'
    quantity.value = 1
    activeTab.value = 'details'
  }
})

function handleAddToCart() {
  if (activeProduct.value) {
    addToCart(activeProduct.value, quantity.value, selectedSize.value, selectedColor.value)
    closeProductModal()
  }
}
</script>

<template>
  <div class="relative z-50">
    <!-- Backdrop overlay -->
    <transition name="fade">
      <div 
        v-if="activeProduct" 
        class="fixed inset-0 bg-obsidian-deep/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        @click.self="closeProductModal"
      >
        <!-- Modal Card Container -->
        <div 
          class="relative w-full max-w-4xl glass rounded-xl border border-champagne/20 shadow-2xl flex flex-col md:flex-row overflow-hidden animate-scale-in my-8"
        >
          <!-- Close button -->
          <button 
            @click="closeProductModal" 
            class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-obsidian-deep/80 border border-champagne/20 flex items-center justify-center text-pearl-dim hover:text-champagne transition-all duration-300 hover:scale-105"
            aria-label="Close modal"
          >
            <i class="fas fa-times"></i>
          </button>

          <!-- Left Panel: Large Image -->
          <div class="w-full md:w-1/2 relative aspect-[3/4] md:aspect-auto md:h-[600px] overflow-hidden bg-obsidian-mid shrink-0">
            <img 
              :src="activeProduct.image" 
              :alt="activeProduct.name" 
              class="w-full h-full object-cover transition-transform duration-[1.5s] hover:scale-110"
            />
            <!-- Holographic overlay shimmer -->
            <div class="absolute inset-0 bg-gradient-to-t from-obsidian-deep/80 via-transparent to-transparent pointer-events-none"></div>
            
            <!-- Float indicators -->
            <div v-if="activeProduct.badge" class="absolute top-6 left-6">
              <span class="px-3.5 py-1.5 text-[10px] tracking-[0.2em] uppercase font-body font-semibold bg-champagne text-obsidian rounded-sm shadow-lg shadow-champagne/10">
                {{ activeProduct.badge }}
              </span>
            </div>
          </div>

          <!-- Right Panel: Information Details -->
          <div class="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between max-h-[600px] overflow-y-auto custom-scroll text-left">
            <div>
              <!-- Category -->
              <p class="font-body text-xs tracking-[0.3em] uppercase text-champagne-muted mb-2">
                {{ activeProduct.category }}
              </p>
              <!-- Name -->
              <h2 class="font-luxury text-2xl sm:text-3xl text-pearl font-bold tracking-wide leading-tight mb-4">
                {{ activeProduct.name }}
              </h2>
              
              <!-- Price and Strikethrough -->
              <div class="flex items-center gap-3 mb-6">
                <span class="font-body text-xl font-semibold text-champagne">{{ activeProduct.price }}</span>
                <span v-if="activeProduct.originalPrice" class="font-body text-sm text-pearl-dim/40 line-through">
                  {{ activeProduct.originalPrice }}
                </span>
                <span class="text-[10px] tracking-widest uppercase text-champagne-light bg-champagne/10 px-2 py-0.5 rounded font-body">In Stock</span>
              </div>

              <!-- Product description prose -->
              <p class="font-body text-xs sm:text-sm text-pearl-dim/70 leading-relaxed mb-6">
                An exceptional piece that captures the essence of weightless luxury. Detailed with premium finishes, designed to fall beautifully and float effortlessly. Crafted with extreme attention to structure and form.
              </p>

              <!-- Size selector -->
              <div class="mb-5">
                <div class="flex justify-between items-center mb-2">
                  <span class="font-body text-[10px] tracking-[0.2em] uppercase text-pearl-dim/60 font-semibold">Select Size</span>
                  <a href="#size-chart" class="font-body text-[9px] tracking-[0.1em] uppercase text-champagne hover:underline">Size Guide</a>
                </div>
                <div class="flex gap-2">
                  <button 
                    v-for="size in sizes" 
                    :key="size"
                    @click="selectedSize = size"
                    class="w-10 h-10 border rounded flex items-center justify-center font-body text-xs font-semibold tracking-wide transition-all duration-300"
                    :class="selectedSize === size 
                      ? 'bg-champagne border-champagne text-obsidian hover:bg-champagne-light' 
                      : 'border-champagne/20 bg-obsidian-deep/50 text-pearl-dim hover:border-champagne hover:text-champagne-light'"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>

              <!-- Color selector -->
              <div class="mb-6">
                <div class="mb-2">
                  <span class="font-body text-[10px] tracking-[0.2em] uppercase text-pearl-dim/60 font-semibold">Select Color:</span>
                  <span class="ml-2 font-body text-xs text-champagne font-medium">{{ selectedColor }}</span>
                </div>
                <div class="flex gap-3">
                  <button 
                    v-for="color in colors" 
                    :key="color.name"
                    @click="selectedColor = color.name"
                    class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-transform duration-300 hover:scale-110"
                    :class="[
                      color.class,
                      selectedColor === color.name ? 'scale-110 ring-2 ring-champagne/40' : 'opacity-80'
                    ]"
                    :title="color.name"
                  ></button>
                </div>
              </div>

              <!-- Quantity Selector -->
              <div class="mb-8">
                <span class="block font-body text-[10px] tracking-[0.2em] uppercase text-pearl-dim/60 font-semibold mb-2">Quantity</span>
                <div class="inline-flex items-center border border-champagne/20 rounded bg-obsidian-deep overflow-hidden">
                  <button 
                    @click="quantity > 1 ? quantity-- : null" 
                    class="px-3.5 py-2 text-[10px] text-pearl-dim hover:text-champagne hover:bg-champagne/5 transition-all duration-300"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                  <span class="px-5 py-2 text-xs text-pearl font-body font-medium w-12 text-center bg-obsidian/40">
                    {{ quantity }}
                  </span>
                  <button 
                    @click="quantity++" 
                    class="px-3.5 py-2 text-[10px] text-pearl-dim hover:text-champagne hover:bg-champagne/5 transition-all duration-300"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Add to Cart Button & Accordion tabs -->
            <div>
              <button 
                @click="handleAddToCart"
                class="group w-full py-4 text-xs tracking-[0.2em] uppercase font-body font-medium text-obsidian bg-champagne rounded hover:bg-champagne-light transition-all duration-500 hover:-translate-y-0.5 animate-pulse-glow flex items-center justify-center gap-2 mb-6"
              >
                <i class="fas fa-shopping-bag text-xs"></i>
                <span>Add to Shopping Bag</span>
              </button>

              <!-- Luxury Accordion Details -->
              <div class="border-t border-champagne/10">
                <!-- Tab Header: Details -->
                <div 
                  @click="activeTab = activeTab === 'details' ? '' : 'details'"
                  class="py-4 flex justify-between items-center cursor-pointer border-b border-champagne/10 group"
                >
                  <span class="font-body text-[10px] tracking-[0.2em] uppercase text-pearl group-hover:text-champagne transition-colors duration-300">Fabric & Care Details</span>
                  <i 
                    class="fas fa-chevron-down text-[10px] text-pearl-dim transition-transform duration-300"
                    :class="activeTab === 'details' ? 'rotate-180 text-champagne' : ''"
                  ></i>
                </div>
                <!-- Tab Body: Details -->
                <transition name="accordion">
                  <div v-show="activeTab === 'details'" class="py-3 text-xs text-pearl-dim/60 leading-relaxed font-body">
                    <ul class="space-y-1.5 list-disc pl-4">
                      <li>100% Ethically Sourced Mulberry Silk & Organza.</li>
                      <li>Dry clean only. Do not bleach.</li>
                      <li>Steam iron with low temperature setting.</li>
                      <li>Handcrafted with delicate detailing; handle with absolute care.</li>
                    </ul>
                  </div>
                </transition>

                <!-- Tab Header: Shipping -->
                <div 
                  @click="activeTab = activeTab === 'shipping' ? '' : 'shipping'"
                  class="py-4 flex justify-between items-center cursor-pointer border-b border-champagne/10 group"
                >
                  <span class="font-body text-[10px] tracking-[0.2em] uppercase text-pearl group-hover:text-champagne transition-colors duration-300">Shipping & Returns</span>
                  <i 
                    class="fas fa-chevron-down text-[10px] text-pearl-dim transition-transform duration-300"
                    :class="activeTab === 'shipping' ? 'rotate-180 text-champagne' : ''"
                  ></i>
                </div>
                <!-- Tab Body: Shipping -->
                <transition name="accordion">
                  <div v-show="activeTab === 'shipping'" class="py-3 text-xs text-pearl-dim/60 leading-relaxed font-body">
                    <p class="mb-2">We provide complimentary Express Worldwide Shipping. All products are shipped in luxurious, signature gift packaging.</p>
                    <ul class="space-y-1 list-disc pl-4">
                      <li>Delivery within 2-4 business days worldwide.</li>
                      <li>Complimentary returns or exchanges within 30 days of receipt.</li>
                      <li>Includes tracked courier service with signature confirmation.</li>
                    </ul>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Scrollbar details */
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
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-in {
  animation: scale-in-animation 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes scale-in-animation {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Accordion Transition styles */
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.35s ease, opacity 0.3s ease;
  overflow: hidden;
  max-height: 200px;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
