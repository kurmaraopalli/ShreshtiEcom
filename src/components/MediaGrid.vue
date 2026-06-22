<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const hoveredCard = ref(null)

const categories = [
  {
    id: 1,
    title: 'Haute Couture',
    subtitle: 'Women\'s Apparel',
    description: 'Timeless silhouettes that transcend gravity — flowing fabrics, sculptural forms, and effortless elegance.',
    icon: 'fas fa-crown',
    floatClass: 'animate-float-card-1',
    delay: '0.2s',
  },
  {
    id: 2,
    title: 'Luminous Beauty',
    subtitle: 'Cosmetics & Skincare',
    description: 'Radiance distilled — weightless formulas, holographic finishes, and skin that glows from within.',
    icon: 'fas fa-spa',
    floatClass: 'animate-float-card-2',
    delay: '0.5s',
  },
  {
    id: 3,
    title: 'Ethereal Accessories',
    subtitle: 'Jewelry & Accessories',
    description: 'Delicate adornments that float on skin — champagne gold, iridescent pearls, and celestial sparkle.',
    icon: 'fas fa-gem',
    floatClass: 'animate-float-card-3',
    delay: '0.8s',
  },
]

onMounted(() => {
  // Use Intersection Observer for scroll-triggered reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      })
    },
    { threshold: 0.15 }
  )

  const section = document.getElementById('media-grid-section')
  if (section) observer.observe(section)
})
</script>

<template>
  <section
    id="media-grid-section"
    class="relative py-32 px-6 lg:px-10"
  >
    <!-- Section header -->
    <div class="max-w-7xl mx-auto mb-20 text-center">
      <div
        class="opacity-0"
        :class="isVisible ? 'animate-fade-in-up' : ''"
      >
        <p class="font-body text-xs tracking-[0.4em] uppercase text-champagne-muted mb-4">
          Curated for You
        </p>
        <h2 class="font-luxury text-4xl sm:text-5xl lg:text-6xl text-pearl tracking-wide">
          The Collection
        </h2>
        <div class="flex items-center justify-center gap-3 mt-6">
          <span class="block w-12 h-[1px] bg-champagne/30"></span>
          <span class="block w-1.5 h-1.5 bg-champagne/50 rotate-45"></span>
          <span class="block w-12 h-[1px] bg-champagne/30"></span>
        </div>
      </div>
    </div>

    <!-- Cards Grid -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
      <div
        v-for="card in categories"
        :key="card.id"
        :id="`media-card-${card.id}`"
        class="opacity-0"
        :class="isVisible ? 'animate-fade-in-up' : ''"
        :style="{ animationDelay: card.delay }"
      >
        <div
          class="holographic-border rounded-lg cursor-pointer transition-all duration-500"
          :class="[
            card.floatClass,
            hoveredCard === card.id
              ? '-translate-y-3 scale-[1.02] shadow-2xl shadow-champagne/10'
              : ''
          ]"
          :style="hoveredCard === card.id ? 'animation-play-state: paused' : ''"
          @mouseenter="hoveredCard = card.id"
          @mouseleave="hoveredCard = null"
        >
          <!-- Card inner content -->
          <div class="relative bg-obsidian-light rounded-lg overflow-hidden aspect-[3/4] flex flex-col items-center justify-center p-8 group">
            <!-- Background gradient decoration -->
            <div
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style="background: radial-gradient(ellipse at 50% 30%, rgba(212, 168, 83, 0.06) 0%, transparent 60%)"
            ></div>

            <!-- Top decorative line -->
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-champagne/20 group-hover:w-24 transition-all duration-500"></div>

            <!-- Icon -->
            <div class="relative mb-8">
              <div class="w-20 h-20 rounded-full border border-champagne/20 flex items-center justify-center group-hover:border-champagne/50 transition-all duration-500 group-hover:scale-110">
                <i :class="card.icon" class="text-2xl text-champagne group-hover:text-champagne-light transition-colors duration-300"></i>
              </div>
              <div class="absolute -inset-3 bg-champagne/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <!-- Subtitle badge -->
            <p class="font-body text-[10px] tracking-[0.3em] uppercase text-champagne-muted mb-3">
              {{ card.subtitle }}
            </p>

            <!-- Title -->
            <h3 class="font-luxury text-2xl lg:text-3xl text-pearl tracking-wide mb-4 text-center group-hover:text-champagne-light transition-colors duration-500">
              {{ card.title }}
            </h3>

            <!-- Description -->
            <p class="font-body text-sm text-pearl-dim/60 text-center leading-relaxed max-w-xs">
              {{ card.description }}
            </p>

            <!-- Explore link -->
            <div class="mt-8 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
              <span class="font-body text-xs tracking-[0.2em] uppercase text-champagne border-b border-champagne/30 pb-1 hover:border-champagne transition-colors duration-300">
                Explore
              </span>
            </div>

            <!-- Bottom decorative line -->
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-champagne/20 group-hover:w-24 transition-all duration-500"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
