<template>
  <div class="content">
    <div class="fix-10-12">

      <div class="woocommerce">

        <div class="woocommerce-MyAccount-content">
          <div class="woocommerce-notices-wrapper"></div>
          <div class="personal-information">
            <form name="profile" method="post">

              <ul class="flex fixedSpaces">

                <!-- PERSONAL INFO -->
                <li class="col-4-12">
                  <h5 class="small">User Profile</h5>
                </li>
                <li class="col-8-12">
                  <ul class="flex fixedSpaces">
                    <li class="col-6-12 desktop-col-1-2 phablet-col-1-1">
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
                        <input type="file" accept=".jpg,.jpeg,.png" id="avatar" name="avatar">
                      </div>
                    </li>
                    <li class="col-6-12 desktop-col-1-2 phablet-col-1-1">
                      <label for="nick_name">
                        <div class="label-title" data-note="Optional">Public Name</div>
                        <input placeholder="Public Name" type="text" name="nick_name" id="nick_name"
                          value="">
                      </label>
                    </li>
                  </ul>
                </li>
              </ul>

              <hr>

              <!-- PERSONAL INFO -->
              <ul class="flex fixedSpaces">
                <li class="col-4-12">
                  <h5 class="small">Personal Details</h5>
                  <p class="note fix-3-12 margin-top-1 desktop-fix-12-12 toLeft">
                    <i class="material-icons">lock</i> Your personal information is never shown to other users.
                  </p>
                </li>
                <li class="col-8-12">
                  <ul class="flex fixedSpaces">
                    <li class="col-6-12 desktop-col-1-2 phablet-col-1-1">
                      <label for="account_first_name">
                        <div class="label-title required">First Name</div>
                        <input placeholder="First Name" type="text" name="account_first_name" id="account_first_name"
                          value="">
                      </label>
                    </li>
                    <li class="col-6-12 desktop-col-1-2 phablet-col-1-1">
                      <label for="account_last_name">
                        <div class="label-title required">Last Name</div>
                        <input placeholder="Last Name" type="text" name="account_last_name" id="account_last_name"
                          value="">
                      </label>
                    </li>
                    <li class="col-12-12 desktop-col-1-1">
                      <label for="account_email">
                        <div class="label-title required">Email address</div>
                        <input placeholder="Email address" type="email" name="account_email" id="account_email"
                          value="">
                      </label>
                    </li>
                  
                  </ul>
                </li>
              </ul>


              <hr>

              <ul class="flex fixedSpaces">
                <!-- ADDRESS INFO -->
                <li class="col-4-12">
                  <h5 class="small">Password</h5>
                  <p class="note fix-3-12 margin-top-1 desktop-fix-12-12 toLeft">Leave password blank if don't want to
                    change.</p>
                </li>
                <li class="col-8-12">
                  <ul class="flex fixedSpaces">
                    <li class="col-6-12 desktop-col-1-2 phablet-col-1-1">
                      <label for="old_password">
                        <div class="label-title">Current Password<i class="material-icons showHidePassword disableSelect"
                            data-input-id="old_password"></i></div>
                        <input placeholder="Current Password" type="text" data-type="password" name="current_password"
                          id="old_password" autocomplete="off">
                      </label>
                    </li>
                    <li class="col-6-12 desktop-col-1-2 phablet-col-1-1">
                      <label for="new_password">
                        <div class="label-title">New Password<i class="material-icons showHidePassword disableSelect"
                            data-input-id="new_password"></i></div>
                        <input placeholder="New Password" type="text" data-type="password" name="new_password"
                          id="new_password" autocomplete="off">
                      </label>
                    </li>
                  </ul>
                </li>
              </ul>

              <hr>

              <ul class="flex fixedSpaces">
                <!-- ADDRESS INFO -->
                <li class="col-4-12">

                </li>
                <li class="col-8-12">
                  <LoadButton  class="btn btn-primary">SaveChanges</LoadButton> 
                  <RouterLink to="/" class="btn-get-started scrollto">Cancel</RouterLink>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
    <TestLoadData></TestLoadData>
  </div>
  
</template>

<script setup lang="ts">
import LoadButton from '../components/LoadButton.vue'
import { useAuthStore } from '../stores/authStore';
import TestLoadData from '../components/TestLoadData.vue'
// :loading="isLoading"
const authStore = useAuthStore()
console.log(authStore)
</script>

<style lang="scss" scoped>

</style>