<template>
  <header id="header" class="fixed-top header-inner-pages">
    <div class="container d-flex align-items-center">
      <h1 class="logo me-auto"><a href="index.html">Page builder</a></h1>
      <nav id="navbar" class="navbar">
        <ul>
          <li><RouterLink to="/" class="nav-link scrollto active">Home</RouterLink></li>
          <li><RouterLink to="/about" class="nav-link scrollto ">About</RouterLink></li>
          <li><RouterLink to="/builder" class="nav-link scrollto ">Builder</RouterLink></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderBox"
}
</script>

<style scoped>

</style>