<template>
  <div class="body">
 <HeaderBox></HeaderBox>
  <main>
    <section id="hero" class="d-flex align-items-center">

      <div class="container">
        <div class="row">
          <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
               data-aos="fade-up" data-aos-delay="200">
            <h1>Create web pages in one click</h1>
            <h2>We are team of talented developers give you the best webpage builder!</h2>
            <div class="d-flex justify-content-center justify-content-lg-start">
              <RouterLink v-if="isAuth" to="/builder/create"  class="btn-get-started scrollto me-2">Get Started</RouterLink>
              <a v-if="!isAuth" href="#register" class="btn-get-started scrollto me-2"  data-bs-toggle="modal" data-bs-target="#registerModal">Register</a>
              <a v-if="!isAuth" href="#login" class="btn-get-started scrollto me-2"  data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>
              <a v-if="isAuth" href="#logout" @click="logout()" class="btn-get-started scrollto me-2" >Logout</a>
              <RouterLink  v-if="isAuth" to="/account" class="btn-get-started scrollto me-2">Account</RouterLink>
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
import HeaderBox from "../components/HeaderBox.vue";
import FooterBox from "../components/FooterBox.vue";
import Registration from "../components/Registration.vue";
import Login from "../components/Login.vue";
export default {
  data(){
    return{
      isAuth: false
    }
  },
  methods:{
    logout(){
      // выбрасываем юзера
    }
  },
  components:{
    HeaderBox,
    FooterBox,
    Registration,
    Login
  },

}
</script>
<style >
@import "../layout/assets/css/style.css";
a {
  text-decoration: none !important;
}
</style>
