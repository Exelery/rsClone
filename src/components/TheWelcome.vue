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
              <a href="/builder.html" class="btn-get-started scrollto">Get Started</a>
              <a href="#register" class="btn-get-started scrollto"  data-bs-toggle="modal" data-bs-target="#registerModal">Register</a>
            </div>
          </div>
          <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
            <img src="@/layout/assets/img/hero-img.png" class="img-fluid animated" alt="">
          </div>
        </div>
      </div>

    </section>

  </main>


  <FooterBox></FooterBox>

<!--  <div id="preloader"></div>-->
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i
      class="bi bi-arrow-up-short"></i></a>

  <!-- Modal -->
  <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Register</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script >
import HeaderBox from "@/components/HeaderBox.vue";
import FooterBox from "@/components/FooterBox.vue";
export default {
  components:{
    HeaderBox,
    FooterBox
  }
}
</script>
<style>
@import "@/layout/assets/css/style.css";
</style>
