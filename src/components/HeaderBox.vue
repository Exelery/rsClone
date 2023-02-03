<template>
  <header id="header" class="fixed-top header-inner-pages">
    <div class="container d-flex align-items-center">
      <h1 class="logo me-auto"><RouterLink to="/">Page builder</RouterLink></h1>
      <nav id="navbar" class="navbar">
        <ul>
          <li><RouterLink to="/" class="nav-link scrollto" :class="{active: $route.name==='home'}">Home</RouterLink></li>
          <li><RouterLink to="/about" class="nav-link scrollto " :class="{active: $route.name==='about'}">About</RouterLink></li>
          <li><RouterLink to="/builder" class="nav-link scrollto " :class="{active: $route.name==='builder'}">Builder</RouterLink></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderBox",
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

</style>