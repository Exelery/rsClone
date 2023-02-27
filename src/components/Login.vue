<template>
  <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ $t("login.header") }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit="onSubmit"
            class="max-w-[27rem] mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5">
            <div class="mb-3">
              <div class="">
                <label for="emailLogin" class="block text-ct-blue-600 mb-3 form-label">{{ $t("login.email") }}</label>
                <input v-model="email" type="email" placeholder=" " class="form-control" id="emailLogin" />
                <span class="text-red-500 text-xs pt-1 block">{{
                  errors.email
                }}</span>
              </div>
              <div class="">
                <label for="password" class="block text-ct-blue-600 mb-3 form-label">{{ $t("login.password") }}</label>
                <input v-model="password" type="password" placeholder=" " class="form-control" id="passwordLogn" />
                <span class="text-red-500 text-xs pt-1 block">{{
                  errors.password
                }}</span>
              </div>
            </div>

            <!-- <span class="block">Already have an account?
                        <router-link :to="{ name: 'login' }" class="text-ct-blue-600">Login Here</router-link></span> -->
            <!-- <button :loading="isLoading" class="btn btn-primary">Log in</button> -->
            <LoadButton :loading="isLoading" class="btn btn-primary">{{ $t("login.login") }}</LoadButton>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// import * as bootstrap from 'bootstrap';
// import { Toast } from 'bootstrap.esm.min.js'
// import { Popover } from "bootstrap";
import { Form, useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import Auth from '../api/authApi';
import type { ILoginInput, ILoginResponse, IResponse, ISignUpInput } from '@/utils/types';
import type { AxiosError } from 'axios';
import { useAuthStore } from '../stores/authStore';
// import router from '@/router';
import LoadButton from './LoadButton.vue';

const authStore = useAuthStore();

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
        .min(6, 'Password must be more than 6 characters')
        .max(32, 'Password must be less than 32 characters'),
    })
);
const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: registerSchema,
});
const { value: email } = useField('email');
const { value: password } = useField('password');

// const authResult = useQuery({
//   queryKey: ['authStore'],
//   queryFn: Auth.getUserInfo,
//   retry: 1,
//   enabled: false
// });

// const queryClient = useQueryClient();


const { isLoading, mutate } = useMutation(
  (credentials: ILoginInput) => Auth.login(credentials),
  {
    onError: (error: AxiosError) => {
      if (Array.isArray((error as any).response.data.error)) {
        (error as any).response.data.error.forEach((el: any) =>
          console.log('92', error.message)
        );
      } else {
        console.log('95', error.message)
      }
    },
    onSuccess: (data: any) => {
      console.log('sucess', data)
      console.log('sucess', data.value.token)
      localStorage.setItem('token', data.value.token)
      // queryClient.refetchQueries({queryKey: ['authStore']});
      // data-bs-toggle="modal"
      addUserParams()
      resetForm();
      const collapseElement = document.querySelector('#loginModal') as Element;
      // bootstrap.Collapse(collapseElement).hide()
      
      // collapseElement.setAttribute("style", "display: none;")
      // collapseElement.setAttribute("aria-hidden", "true")
      // collapseElement.setAttribute("aria-modal", "")
      // collapseElement.setAttribute("role", "")
      // collapseElement.classList.toggle('show');

    },
  }
);

const addUserParams = async () => {
  const response = await Auth.getUserInfo()
  console.log('pinia', response)
  authStore.setLoginState(response.data.value)
}
const onSubmit = handleSubmit((values: { name: any; email: any; password: any; }) => {
  mutate({
    email: values.email,
    password: values.password
  });
});

// onBeforeUpdate(() => {
//   if (authResult.isSuccess.value) {
//     console.log('onbefore', authResult)
//     const authUser = Object.assign({}, authResult.data.value?.data.value);
//     authStore.setAuthUser(authUser);
//   }
// });


</script>

<style></style>