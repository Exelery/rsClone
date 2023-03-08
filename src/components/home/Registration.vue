<template>
  <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ $t("registration.header") }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit="onSubmit"
            class="max-w-[27rem] mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5">
            <div class="mb-3">
              <div class="">
                <label for="name" class="block text-ct-blue-600 mb-3 form-label">{{ $t("registration.name") }}</label>
                <input v-model="name" type="text" placeholder=" " class=" form-control" id="name" />
                <span class="text-red-500 text-xs pt-1 block">{{ errors.name }}</span>
              </div>
              <div class="">
                <label for="email" class="block text-ct-blue-600 mb-3 form-label">{{ $t("registration.email") }}</label>
                <input v-model="email" type="email" placeholder=" " class="form-control" id="email" />
                <span class="text-red-500 text-xs pt-1 block">{{
                  errors.email
                }}</span>
              </div>
              <div class="">
                <label for="password" class="block text-ct-blue-600 mb-3 form-label">{{ $t("registration.password")
                }}</label>
                <input v-model="password" type="password" placeholder="" class="form-control" id="password" />
                <span class="text-red-500 text-xs pt-1 block">{{
                  errors.password
                }}</span>
              </div>
              <div class="">
                <label for="passwordConfirm" class="block text-ct-blue-600 mb-3 form-label">{{ $t("registration.confirm")
                }}</label>
                <input v-model="passwordConfirm" type="password" placeholder=" " class=" form-control"
                  id="passwordConfirm" />
                <span class="text-red-500 text-xs pt-1 block">{{
                  errors.passwordConfirm
                }}</span>
              </div>
            </div>

            <!-- <span class="block">Already have an account?
                  <router-link :to="{ name: 'login' }" class="text-ct-blue-600">Login Here</router-link></span> -->
            <LoadButton :loading="isLoading" class="btn btn-primary">{{ $t("registration.create") }}</LoadButton>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';
import { useMutation } from '@tanstack/vue-query';
import Auth from '@/api/authApi';
import type { ISignUpInput } from '@/utils/types';
import type { AxiosError } from 'axios';
import LoadButton from './LoadButton.vue';
import { useAuthStore } from '@/stores/authStore';
// import router from '@/router';

const authStore = useAuthStore();
const registerSchema = toFormValidator(
  zod
    .object({
      name: zod.string().min(1, 'Full name is required'),
      email: zod
        .string()
        .min(1, 'Email address is required')
        .email('Email Address is invalid'),
      password: zod
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
      passwordConfirm: zod.string().min(1, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      path: ['passwordConfirm'],
      message: 'Passwords do not match',
    })
);
const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: registerSchema,
});
const { value: name } = useField('name');
const { value: email } = useField('email');
const { value: password } = useField('password');
const { value: passwordConfirm } = useField('passwordConfirm');
const { isLoading, mutate } = useMutation(
  (credentials: ISignUpInput) => Auth.registration(credentials),
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
      localStorage.setItem('token', data.value.token)
      resetForm();
      const collapseElement = document.querySelector('#registerModal .btn-close') as HTMLButtonElement;
      collapseElement.click()
      
      authStore.setAuth()

    },
  }
);

const onSubmit = handleSubmit((values: { name: any; email: any; password: any; }) => {
  mutate({
    name: values.name,
    email: values.email,
    password: values.password
  });
});
</script>
