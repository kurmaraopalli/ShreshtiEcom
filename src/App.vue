<script setup>
import FloatingNavbar from './components/FloatingNavbar.vue'
import HeroTitle from './components/HeroTitle.vue'
import MediaGrid from './components/MediaGrid.vue'
import CollectionSection from './components/CollectionSection.vue'
import CartDrawer from './components/CartDrawer.vue'
import ProductModal from './components/ProductModal.vue'
import {
  hauteCoutureProducts,
  luminousBeautyProducts,
  etherealAccessoriesProducts,
} from './data/products.js'
</script>

<template>
  <div class="app-root relative min-h-screen bg-obsidian font-body overflow-hidden">
    <!-- Ambient Background Effects -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <!-- Large radial glow — top-left -->
      <div
        class="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full opacity-[0.04]"
        style="background: radial-gradient(circle, #d4a853 0%, transparent 70%)"
      ></div>
      <!-- Subtle glow — bottom-right -->
      <div
        class="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style="background: radial-gradient(circle, #e8c878 0%, transparent 70%)"
      ></div>
      <!-- Decorative floating rings -->
      <div class="deco-ring w-64 h-64 top-[15%] right-[10%] animate-float-slow opacity-30"></div>
      <div class="deco-ring w-40 h-40 top-[60%] left-[5%] animate-float-medium opacity-20"></div>
      <div class="deco-ring w-24 h-24 top-[35%] left-[20%] animate-float-fast opacity-15"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10">
      <FloatingNavbar />
      <main>
        <HeroTitle />
        <MediaGrid />

        <!-- Divider -->
        <div class="max-w-7xl mx-auto px-6 lg:px-10">
          <div class="h-[1px] bg-gradient-to-r from-transparent via-champagne/20 to-transparent"></div>
        </div>

        <!-- Haute Couture Collection — 20 Products -->
        <CollectionSection
          id="haute-couture"
          title="Haute Couture"
          subtitle="Women's Premier Apparel"
          icon="fas fa-crown"
          :products="hauteCoutureProducts"
        />

        <!-- Divider -->
        <div class="max-w-7xl mx-auto px-6 lg:px-10">
          <div class="h-[1px] bg-gradient-to-r from-transparent via-champagne/20 to-transparent"></div>
        </div>

        <!-- Luminous Beauty Collection — 20 Products -->
        <CollectionSection
          id="luminous-beauty"
          title="Luminous Beauty"
          subtitle="Cosmetics & Skincare"
          icon="fas fa-spa"
          :products="luminousBeautyProducts"
        />

        <!-- Divider -->
        <div class="max-w-7xl mx-auto px-6 lg:px-10">
          <div class="h-[1px] bg-gradient-to-r from-transparent via-champagne/20 to-transparent"></div>
        </div>

        <!-- Ethereal Accessories Collection — 20 Products -->
        <CollectionSection
          id="ethereal-accessories"
          title="Ethereal Accessories"
          subtitle="Jewelry & Accessories"
          icon="fas fa-gem"
          :products="etherealAccessoriesProducts"
        />
      </main>

      <!-- Footer -->
      <footer class="relative py-16 px-6 lg:px-10 border-t border-champagne/10">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
            <!-- Brand -->
            <div class="md:col-span-2">
              <div class="flex items-center gap-3 mb-4">
                <i class="fas fa-gem text-champagne text-lg"></i>
                <span class="font-luxury text-xl tracking-[0.15em] text-champagne font-bold">SHRESHTI</span>
              </div>
              <p class="font-body text-sm text-pearl-dim/60 leading-relaxed max-w-sm mb-6">
                Defy gravity. Discover a weightless world of luxury apparel, luminous beauty, and ethereal accessories crafted for the extraordinary woman.
              </p>
              <div class="flex items-center gap-4">
                <a href="#" class="w-9 h-9 rounded-full border border-champagne/20 flex items-center justify-center text-pearl-dim hover:text-champagne hover:border-champagne/50 transition-all duration-300">
                  <i class="fab fa-instagram text-sm"></i>
                </a>
                <a href="#" class="w-9 h-9 rounded-full border border-champagne/20 flex items-center justify-center text-pearl-dim hover:text-champagne hover:border-champagne/50 transition-all duration-300">
                  <i class="fab fa-pinterest text-sm"></i>
                </a>
                <a href="#" class="w-9 h-9 rounded-full border border-champagne/20 flex items-center justify-center text-pearl-dim hover:text-champagne hover:border-champagne/50 transition-all duration-300">
                  <i class="fab fa-facebook text-sm"></i>
                </a>
                <a href="#" class="w-9 h-9 rounded-full border border-champagne/20 flex items-center justify-center text-pearl-dim hover:text-champagne hover:border-champagne/50 transition-all duration-300">
                  <i class="fab fa-youtube text-sm"></i>
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div>
              <h4 class="font-body text-xs tracking-[0.2em] uppercase text-champagne mb-5">Quick Links</h4>
              <ul class="space-y-3">
                <li><a href="#home" class="font-body text-sm text-pearl-dim/60 hover:text-champagne-light transition-colors duration-300">Home</a></li>
                <li><a href="#haute-couture" class="font-body text-sm text-pearl-dim/60 hover:text-champagne-light transition-colors duration-300">Collections</a></li>
                <li><a href="#luminous-beauty" class="font-body text-sm text-pearl-dim/60 hover:text-champagne-light transition-colors duration-300">Beauty</a></li>
                <li><a href="#ethereal-accessories" class="font-body text-sm text-pearl-dim/60 hover:text-champagne-light transition-colors duration-300">Accessories</a></li>
                <li><a href="#about" class="font-body text-sm text-pearl-dim/60 hover:text-champagne-light transition-colors duration-300">About</a></li>
              </ul>
            </div>

            <!-- Contact -->
            <div>
              <h4 class="font-body text-xs tracking-[0.2em] uppercase text-champagne mb-5">Contact</h4>
              <ul class="space-y-3">
                <li class="font-body text-sm text-pearl-dim/60 flex items-center gap-2">
                  <i class="fas fa-envelope text-xs text-champagne/40"></i>
                  tulsi90@gmail.com
                </li>
                <li class="font-body text-sm text-pearl-dim/60 flex items-center gap-2">
                  <i class="fas fa-user text-xs text-champagne/40"></i>
                  Shreshti Devi
                </li>
                <li class="font-body text-sm text-pearl-dim/60 flex items-center gap-2">
                  <i class="fas fa-user text-xs text-champagne/40"></i>
                  Tulsi Devi
                </li>
              </ul>
            </div>
          </div>

          <!-- Bottom bar -->
          <div class="mt-12 pt-6 border-t border-champagne/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="font-body text-xs text-pearl-dim/30 tracking-wide">
              © 2026 Shreshti Ecom. All rights reserved.
            </p>
            <p class="font-body text-[10px] text-pearl-dim/20 tracking-[0.15em] uppercase">
              Crafted with the Antigravity Philosophy
            </p>
          </div>
        </div>
      </footer>
    </div>

    <!-- Global Cart Drawer & Product Detail Modal -->
    <CartDrawer />
    <ProductModal />
  </div>
</template>

<style scoped>
.app-root {
  background-image:
    radial-gradient(ellipse at 30% 20%, rgba(212, 168, 83, 0.04) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(26, 26, 46, 0.5) 0%, transparent 50%);
}
</style>
