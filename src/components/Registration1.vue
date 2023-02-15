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

<!-- <template>
  <section class="py-8 bg-ct-blue-600 min-h-screen grid place-items-center">
    <div>
      <h1 class="text-4xl xl:text-6xl text-center font-[600] text-ct-yellow-600 mb-4">
        Welcome to CodevoWeb!
      </h1>
      <h2 class="text-lg text-center mb-4 text-ct-dark-200">
        Sign Up To Get Started!
      </h2>
      <form @submit="onSubmit"
        class="max-w-[27rem] mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5">
        <div class="">
          <label for="username" class="block text-ct-blue-600 mb-3">Full Username</label>
          <input v-model="username" type="text" placeholder=" "
            class="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4" id="username" />
          <span class="text-red-500 text-xs pt-1 block">{{ errors.name }}</span>
        </div>
        <div class="">
          <label for="email" class="block text-ct-blue-600 mb-3">Email Address</label>
          <input v-model="email" type="email" placeholder=" "
            class="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4" id="email" />
          <span class="text-red-500 text-xs pt-1 block">{{ errors.email }}</span>
        </div>
        <div class="">
          <label for="password" class="block text-ct-blue-600 mb-3">Password</label>
          <input v-model="password" type="password" placeholder=" "
            class="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4" id="password" />
          <span class="text-red-500 text-xs pt-1 block">{{
            errors.password
          }}</span>
        </div>
        <div class="">
          <label for="passwordConfirm" class="block text-ct-blue-600 mb-3">Confirm Password</label>
          <input v-model="passwordConfirm" type="password" placeholder=" "
            class="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4" id="passwordConfirm" />
          <span class="text-red-500 text-xs pt-1 block">{{ errors.passwordConfirm }}</span>
        </div>
        <span class="block">Already have an account?
          <router-link :to="{ username: 'login' }" class="text-ct-blue-600">Login Here</router-link></span>
        <button :loading="isLoading">Sign Up</button>
      </form>
    </div>
  </section>
</template> -->

<template>
  <section class="py-8 bg-ct-blue-600 min-h-screen grid place-items-center">
    <div>
      <h1 class="text-4xl xl:text-6xl text-center font-[600] text-ct-yellow-600 mb-4">
        Welcome to CodevoWeb!
      </h1>
      <h2 class="text-lg text-center mb-4 text-ct-dark-200">
        Sign Up To Get Started!
      </h2>
      <form @submit="onSubmit"
        class="max-w-[27rem] mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5">
        <div class="">
          <label for="name" class="block text-ct-blue-600 mb-3">Full Name</label>
          <input v-model="username" type="text" placeholder=" "
            class="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4" id="name" />
          <span class="text-red-500 text-xs pt-1 block">{{ errors.name }}</span>
        </div>
        <div class="">
          <label for="email" class="block text-ct-blue-600 mb-3">Email Address</label>
          <input v-model="email" type="email" placeholder=" "
            class="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4" id="email" />
          <span class="text-red-500 text-xs pt-1 block">{{errors.email}}</span>
        </div>
        <div class="">
          <label for="password" class="block text-ct-blue-600 mb-3">Password</label>
          <input v-model="password" type="password" placeholder=" "
            class="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4" id="password" />
          <span class="text-red-500 text-xs pt-1 block">{{errors.password}}</span>
        </div>
        <div class="">
          <label for="passwordConfirm" class="block text-ct-blue-600 mb-3">Confirm Password</label>
          <input v-model="passwordConfirm" type="password" placeholder=" "
            class="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4" id="passwordConfirm" />
          <span class="text-red-500 text-xs pt-1 block">{{ errors.passwordConfirm }}</span>
        </div>
      </form>
    </div>
  </section>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { Form, useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';
import { useMutation } from '@tanstack/vue-query';
import { createToast } from 'mosha-vue-toastify';
// import router from '@/router';
import type { IAuthResponse, IResponse, ISignUpInput } from '@/utils/types';
import { registration } from '@/api/authApi';

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
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
      passwordConfirm: zod.string().min(1, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      path: ['passwordConfirm'],
      message: 'Passwords do not match',
    })
);

export default defineComponent({
  // name: 'Registration',
  components: {
    // LoadingButton,
  },
  setup() {
    const { handleSubmit, errors, resetForm } = useForm({
      validationSchema: registerSchema,
    });

    const { value: username } = useField('name');
    const { value: email } = useField('email');
    const { value: password } = useField('password');
    const { value: passwordConfirm } = useField('passwordConfirm');

    const { isLoading, mutate } = useMutation(
      (credentials: ISignUpInput) => registration(credentials),
      {
        onError: (error) => {
          if (Array.isArray((error as any).response.data.error)) {
            (error as any).response.data.error.forEach((el: any) =>
              createToast(el.message, {
                position: 'top-right',
                type: 'warning',
              })
            );
          } else {
            createToast((error as any).response.data.message, {
              position: 'top-right',
              type: 'danger',
            });
          }
        },
        onSuccess: (data) => {
          console.log('success')
          // router.push({ name: 'verifyemail' });
          // createToast(data.message, {
          //   position: 'top-right',
          // });
        },
      }
    );

    const onSubmit = handleSubmit((values: ISignUpInput) => {
      mutate({
        username: values.username,
        email: values.email,
        password: values.password
      });
      resetForm();
    });

    return {
      username,
      email,
      password,
      passwordConfirm,
      onSubmit,
      errors,
      isLoading,
    };
  },
});
</script>