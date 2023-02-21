<template>
  <header id="header" class="fixed-top header-inner-pages">
    <div class="container d-flex align-items-center">
      <h1 class="logo me-auto"><RouterLink to="/">Page builder</RouterLink></h1>
      <nav id="navbar" class="navbar">
        <ul>
          <li><RouterLink to="/" class="nav-link scrollto" :class="{active: $route.name==='home'}">Home</RouterLink></li>
          <li><RouterLink to="/about" class="nav-link scrollto " :class="{active: $route.name==='about'}">About</RouterLink></li>
          <li v-if="authStore.isAuth"><RouterLink to="/builder/create" class="nav-link scrollto " :class="{active: $route.name==='creator'}">Builder</RouterLink></li>
          <li v-if="authStore.isAuth"><RouterLink to="/account" class="nav-link scrollto " :class="{active: $route.name==='account'}">Account</RouterLink></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </header>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
export default {
  data(){
    return{
      isAuth: false,
      authStore: useAuthStore(),
    }
  },
  mounted() {
    document.querySelector(".mobile-nav-toggle").addEventListener('click', function(e) {
      document.querySelector('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })

  },
}
</script>

<style scoped>
.navbar-mobile {
  position: fixed;
  overflow: hidden;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(40, 58, 90, 0.9);
  transition: 0.3s;
  z-index: 999;
}
</style>