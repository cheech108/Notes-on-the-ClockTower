<script setup>
import PlayerManager from './components/playerManager.vue'
import Footer from './components/Footer.vue';
import CharSearch from './components/CharSearch.vue';
</script>

<template class="flex flex-col min-h-dvh">
  <main class="grow">
    <CharSearch />
  </main>
  <footer>
    <Footer />
  </footer>
</template>
