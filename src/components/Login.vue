<!-- <template>
  <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Login to Page Builder</h1>
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
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template> -->

<template>
  <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Login to Page Builder</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit="onSubmit"
            class="max-w-[27rem] mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5">
            <div class="mb-3">
              <div class="">
                <label for="email" class="block text-ct-blue-600 mb-3 form-label">Email Address</label>
                <input v-model="email" type="email" placeholder=" " class="form-control" id="email" />
                <span class="text-red-500 text-xs pt-1 block">{{
                  errors.email
                }}</span>
              </div>
              <div class="">
                <label for="password" class="block text-ct-blue-600 mb-3 form-label">Password</label>
                <input v-model="password" type="password" placeholder=" " class="form-control" id="password" />
                <span class="text-red-500 text-xs pt-1 block">{{
                  errors.password
                }}</span>
              </div>
            </div>

            <!-- <span class="block">Already have an account?
                  <router-link :to="{ name: 'login' }" class="text-ct-blue-600">Login Here</router-link></span> -->
            <button :loading="isLoading" class="btn btn-primary">Log in</button>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUpdate } from 'vue';
import { Form, useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';
import { useMutation, useQuery, useQueryClient  } from '@tanstack/vue-query';
import Auth from '../api/authApi';
import type {ILoginInput, IResponse, ISignUpInput } from '@/utils/types';
import type { AxiosError } from 'axios';
// import router from '@/router';
// import LoadingButton from '../components/LoadingButton.vue';
const registerSchema = toFormValidator(
  zod
    .object({
      email: zod
        .string()
        .min(1, 'Email address is required')
        .email('Email Address is invalid'),
      password: zod
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
    })
);
const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: registerSchema,
});
const { value: email } = useField('email');
const { value: password } = useField('password');

// const authResult = useQuery('authStore', () => getMeFn(), {
//   enabled: false,
//   retry: 1,
// });

const queryClient = useQueryClient();


const { isLoading, mutate } = useMutation(
  (credentials: ILoginInput) => Auth.login(credentials),
  {
    onError: (error: AxiosError) => {
      console.log(Array.isArray((error)))
      if (Array.isArray((error as any).response.data.error)) {
        (error as any).response.data.error.forEach((el: any) =>
          console.log('140', error.message)
        );
      } else {
        console.log('146', error.message)
      }
    },
    onSuccess: (data: any) => {
      console.log('sucess', data)
      resetForm();
    },
  }
);
const onSubmit = handleSubmit((values: { name: any; email: any; password: any; }) => {
  mutate({
    email: values.email,
    password: values.password
  });
});

// onBeforeUpdate(() => {
//   if (authResult.isSuccess.value) {
//     const authUser = Object.assign({}, authResult.data.value?.data.user);
//     authStore.setAuthUser(authUser);
//   }
// });

</script>

<style></style>