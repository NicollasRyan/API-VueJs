
<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="app">
    <header class="navbar navbar-dark bg-dark">
      <div class="container">
        <RouterLink
          to="/"
          class="navbar-brand fw-bold"
        >
          🎬 CineVue
        </RouterLink>

        <nav class="d-flex gap-3">
          <RouterLink to="/" class="nav-link text-light">
            Filmes
          </RouterLink>

          <RouterLink
            to="/watched"
            class="nav-link text-light"
          >
            Assistidos
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="container py-4">
      <RouterView />
    </main>

    <footer class="bg-dark text-light text-center py-3 mt-5">
      <small>
        CineVue — Projeto de estudos com Vue 3 e TMDB
      </small>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.router-link-active {
  font-weight: 600;
}
</style>