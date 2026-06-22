<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  // Small delay to ensure CSS transitions fire after mount
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section
    id="hero-section"
    class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
  >
    <!-- Ambient background particles -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Floating gold dust particles -->
      <div class="absolute top-[20%] left-[15%] w-1 h-1 bg-champagne/30 rounded-full animate-float-fast"></div>
      <div class="absolute top-[40%] right-[20%] w-1.5 h-1.5 bg-champagne/20 rounded-full animate-float-slow"></div>
      <div class="absolute top-[65%] left-[70%] w-1 h-1 bg-champagne/25 rounded-full animate-float-medium"></div>
      <div class="absolute top-[30%] left-[80%] w-0.5 h-0.5 bg-pearl/20 rounded-full animate-float-card-1"></div>
      <div class="absolute top-[75%] left-[30%] w-1 h-1 bg-champagne-light/15 rounded-full animate-float-card-3"></div>
      <div class="absolute top-[50%] left-[50%] w-0.5 h-0.5 bg-pearl-dim/20 rounded-full animate-float-card-2"></div>

      <!-- Decorative floating golden ring -->
      <div
        class="deco-ring w-48 h-48 -right-10 top-[25%] animate-float-fast opacity-20"
      ></div>
      <div
        class="deco-ring w-32 h-32 left-[8%] bottom-[20%] animate-float-medium opacity-15"
      ></div>
    </div>

    <!-- Hero Content -->
    <div class="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 text-center">
      <!-- Floating hero text block -->
      <div :class="isVisible ? 'animate-float-medium' : ''" class="space-y-2">

        <!-- Eyebrow text -->
        <div
          class="opacity-0"
          :class="isVisible ? 'animate-fade-in-up' : ''"
          style="animation-delay: 0s;"
        >
          <p class="font-body text-xs tracking-[0.4em] uppercase text-champagne-muted mb-6">
            <span class="inline-block w-8 h-[1px] bg-champagne-muted/50 align-middle mr-3"></span>
            Luxury Redefined
            <span class="inline-block w-8 h-[1px] bg-champagne-muted/50 align-middle ml-3"></span>
          </p>
        </div>

        <!-- Main headline: DEFY -->
        <div
          class="opacity-0"
          :class="isVisible ? 'animate-fade-in-up' : ''"
          style="animation-delay: 0.2s;"
        >
          <h1 class="font-luxury leading-none">
            <span
              class="block text-7xl sm:text-8xl lg:text-9xl font-bold tracking-wide text-champagne shimmer-text md:-translate-x-8"
            >
              DEFY
            </span>
          </h1>
        </div>

        <!-- Main headline: GRAVITY -->
        <div
          class="opacity-0"
          :class="isVisible ? 'animate-fade-in-up' : ''"
          style="animation-delay: 0.4s;"
        >
          <h1 class="font-luxury leading-none">
            <span
              class="block text-7xl sm:text-8xl lg:text-[10rem] font-bold tracking-wider text-pearl md:translate-x-10"
            >
              GRAVITY
            </span>
          </h1>
        </div>

        <!-- Subtitle -->
        <div
          class="opacity-0"
          :class="isVisible ? 'animate-fade-in-up' : ''"
          style="animation-delay: 0.6s;"
        >
          <div class="flex items-center justify-center gap-4 mt-8 mb-4">
            <span class="block w-16 h-[1px] bg-gradient-to-r from-transparent to-champagne/50"></span>
            <span class="block w-2 h-2 border border-champagne/40 rotate-45"></span>
            <span class="block w-16 h-[1px] bg-gradient-to-l from-transparent to-champagne/50"></span>
          </div>
          <p class="font-luxury italic text-xl sm:text-2xl lg:text-3xl text-pearl-dim tracking-wide">
            Elevate Your Essence
          </p>
          <p class="font-body text-sm text-pearl-dim/60 mt-4 max-w-md mx-auto leading-relaxed tracking-wide">
            Discover a weightless world of haute couture, luminous beauty, and ethereal accessories — crafted for the extraordinary woman.
          </p>
        </div>

        <!-- CTA Button -->
        <div
          class="opacity-0"
          :class="isVisible ? 'animate-fade-in-up' : ''"
          style="animation-delay: 0.8s;"
        >
          <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#collections"
              id="hero-cta-primary"
              class="group relative px-10 py-4 text-xs tracking-[0.2em] uppercase font-body font-medium text-obsidian bg-champagne rounded-sm hover:bg-champagne-light transition-all duration-500 hover:-translate-y-1 animate-pulse-glow"
            >
              <span class="relative z-10">Explore Collection</span>
            </a>
            <a
              href="#about"
              id="hero-cta-secondary"
              class="group px-10 py-4 text-xs tracking-[0.2em] uppercase font-body font-medium text-champagne border border-champagne/30 rounded-sm hover:border-champagne hover:bg-champagne/5 transition-all duration-500 hover:-translate-y-1"
            >
              Our Story
            </a>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0"
        :class="isVisible ? 'animate-fade-in-up' : ''"
        style="animation-delay: 1.2s;"
      >
        <div class="flex flex-col items-center gap-2 animate-float-slow">
          <span class="font-body text-[10px] tracking-[0.3em] uppercase text-pearl-dim/40">Scroll</span>
          <div class="w-[1px] h-8 bg-gradient-to-b from-champagne/40 to-transparent"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Asymmetric offset for the headline on larger screens */
@media (min-width: 768px) {
  h1 span {
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
}
</style>
