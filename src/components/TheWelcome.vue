<template>
  <div class="body">
    <HeaderBox></HeaderBox>
    <main>
      <section id="hero" class="d-flex align-items-center">

        <div class="container">
          <div class="row">
            <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
              data-aos="fade-up" data-aos-delay="200">
              <h1>{{ $t("welcome.header") }}</h1>
              <h2>{{ $t("welcome.text") }}</h2>
              <div class="d-flex justify-content-center justify-content-lg-start">
                <RouterLink v-if="authStore.isAuth" to="/builder/user" class="btn-get-started scrollto me-2">{{ $t("welcome.startBtn") }}
                </RouterLink>
                <a v-if="!authStore.isAuth" href="#register" class="btn-get-started scrollto me-2" data-bs-toggle="modal"
                  data-bs-target="#registerModal">{{ $t("welcome.register") }}</a>
                <a v-if="!authStore.isAuth" href="#login" class="btn-get-started scrollto me-2" data-bs-toggle="modal"
                  data-bs-target="#loginModal">{{ $t("welcome.login") }}</a>
                <a v-if="authStore.isAuth" href="#logout" @click="logout()" class="btn-get-started scrollto me-2">{{ $t("welcome.logout") }}</a>
              </div>
            </div>
            <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
              <img src="../layout/assets/img/hero-img.png" class="img-fluid animated" alt="">
            </div>
          </div>
        </div>

      </section>

    </main>


    <FooterBox></FooterBox>

    <!--  <div id="preloader"></div>-->
    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i
        class="bi bi-arrow-up-short"></i></a>

    <Registration></Registration>
    <Login></Login>
  </div>
</template>

<script lang="ts">
import HeaderBox from "@/components/HeaderBox.vue";
import FooterBox from "@/components/FooterBox.vue";
import Registration from "@/components/Registration.vue";
import Login from "@/components/Login.vue";
import { useAuthStore } from "@/stores/authStore";
export default {
  data() {
    return {
      authStore: useAuthStore(),
      isAuth: false
    }
  },
  methods: {
    logout() {
      // выбрасываем юзера
      this.authStore.logout();
    }
  },
  components: {
    HeaderBox,
    FooterBox,
    Registration,
    Login
  },

}
</script>
<style scoped>
@import "../layout/assets/css/style.css";

a {
  text-decoration: none !important;
}</style>
