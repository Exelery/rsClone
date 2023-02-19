<template>
  <HeaderBox></HeaderBox>
  <div class="content container mt-5 mb-5">
    <div class="pt-5 ">
        <div class="py-2">
          <div class="personal-information row">
            <form name="profile" method="post">



                <!-- PERSONAL INFO -->
                <div class="col-12">
                  <h2>User Profile</h2>
                </div>
                <div class="row">

                    <div class="col-12 ">
                      <label class="margin-bottom-0">
                        <div class="label-title">Avatar Image</div>
                      </label>

                      <div class="upload-btn-wrapper">
                        <img alt=""
                          src="https://secure.gravatar.com/avatar/77c304118f58a0d57fdc47b4f8c3d8a5?s=60&amp;d=https%3A%2F%2Fdesignmodo.com%2Fwp-content%2Fthemes%2Fdesignmodo%2Fassets%2Fimg%2Fmy-account%2Fno-avatar.png&amp;r=g"
                          srcset="https://secure.gravatar.com/avatar/77c304118f58a0d57fdc47b4f8c3d8a5?s=120&amp;d=https%3A%2F%2Fdesignmodo.com%2Fwp-content%2Fthemes%2Fdesignmodo%2Fassets%2Fimg%2Fmy-account%2Fno-avatar.png&amp;r=g 2x"
                          class="avatar avatar-60 photo avatar-image" height="60" width="60" loading="lazy">
                        <div class="clickable-area">
                          Upload Picture <p class="small">Max file size is 1 MB (jpg, png).</p>
                        </div>
                        <input class="form-control" type="file" accept=".jpg,.jpeg,.png" id="avatar" name="avatar">
                      </div>
                    </div>
                    <div class="col-12 ">
                      <label for="nick_name" class="w-100">
                        <div class="label-title" data-note="Optional">Public Name</div>
                        <input class="form-control" placeholder="Public Name" type="text" name="nick_name" id="nick_name"
                          value="">
                      </label>
                    </div>

                </div>


              <hr>

              <!-- PERSONAL INFO -->
              <div class="my-2 row">
                <div class="col-12">
                  <h2 >Personal Details</h2>
                  <p>
                    <i class="material-icons">lock</i> Your personal information is never shown to other users.
                  </p>
                </div>
                <div class="row">

                    <div class="col-12 col-md-4">
                      <label for="account_first_name" class="w-100">
                        <div class="label-title required">First Name</div>
                        <input class="form-control"  placeholder="First Name" type="text" name="account_first_name" id="account_first_name"
                          value="">
                      </label>
                    </div>
                    <div class="col-12 col-md-4">
                      <label for="account_last_name" class="w-100">
                        <div class="label-title required">Last Name</div>
                        <input class="form-control"  placeholder="Last Name" type="text" name="account_last_name" id="account_last_name"
                          value="">
                      </label>
                    </div>
                    <div class="col-12 col-md-4">
                      <label for="account_email" class="w-100">
                        <div class="label-title required">Email address</div>
                        <input class="form-control"  placeholder="Email address" type="email" name="account_email" id="account_email"
                          value="">
                      </label>
                    </div>
                  

                </div>
              </div>


              <hr>

              <div class="my-3 row">
                <!-- ADDRESS INFO -->
                <div class="col-12">
                  <h2>Password</h2>
                  <p class="note fix-3-12 margin-top-1 desktop-fix-12-12 toLeft">Leave password blank if don't want to
                    change.</p>
                </div>
                <div class="row">

                    <div class="col-12 col-md-6">
                      <label for="old_password" class="w-100">
                        <div class="label-title">Current Password</div>
                        <input class="form-control"  placeholder="Current Password" type="text" data-type="password" name="current_password"
                          id="old_password" autocomplete="off">
                      </label>
                    </div>
                    <div class="col-12 col-md-6">
                      <label for="new_password" class="w-100">
                        <div class="label-title">New Password</div>
                        <input  class="form-control" placeholder="New Password" type="text" data-type="password" name="new_password"
                          id="new_password" autocomplete="off">
                      </label>
                    </div>

                </div>
              </div>

              <hr>

                <div class="col-12 my-2">
                  <LoadButton  class="btn btn-primary">SaveChanges</LoadButton> 
                  <RouterLink to="/" class="btn-get-started scrollto ms-2 btn btn-success">Cancel</RouterLink>
                </div>

            </form>
          </div>
        </div>
    </div>
    <TestLoadData></TestLoadData>
  </div>
  <FooterBox></FooterBox>
</template>

<script setup lang="ts">
import HeaderBox from "../components/HeaderBox.vue";
import FooterBox from "../components/FooterBox.vue";
import LoadButton from '../components/LoadButton.vue'
import { useAuthStore } from '../stores/authStore';
import TestLoadData from '../components/TestLoadData.vue'
// :loading="isLoading"
const authStore = useAuthStore()
console.log(authStore)
</script>

<style lang="scss" scoped>

</style>