<template>
  <HeaderBox></HeaderBox>
  <div class="content container mt-5 mb-5">
    <div class="pt-5 ">
      <div class="py-2">
        <div class="personal-information row">
          <form name="profile" @submit="onSubmit">
            <div class="col-12">
              <h2>{{ $t("account.header") }}</h2>
            </div>
            <hr>
            <div class="row">

              <!-- <div class="col-12 ">
                      <label class="margin-bottom-0">
                        <div class="label-title">Avatar Image</div>
                      </label>

                      <div class="upload-btn-wrapper">
                        <img alt=""
                          src="https://ntco.com.br/wp-content/uploads/2020/08/equipe-semfoto.png"
                          class="rounded-circle" style="width: 100px;" loading="lazy">
                        <div class="clickable-area">
                          Upload Picture <p class="small">Max file size is 1 MB (jpg, png).</p>
                        </div>
                        <input class="form-control" style="max-width: 200; min-width: 200px; width: 25%;" type="file" accept=".jpg,.jpeg,.png" id="avatar" name="avatar">
                      </div>
                    </div> -->
              <div class="col-12 ">
                <label for="name" class="w-100">
                  <div class="label-title" data-note="Optional">{{ $t("account.name") }}</div>
                  <input class="form-control" placeholder="Public Name" type="text" name="name" v-model="name" id="name">
                </label>
                <span class="text-red-500 text-xs pt-1 block">{{ errors.name }}</span>
              </div>

            </div>
            <hr>

            <div class="my-2 row">
              <div class="col-12">
                <h2>{{ $t("account.emailHeader") }} </h2>
                <p>
                  {{ $t("account.emailText") }}
                </p>
              </div>
              <div class="row">
                <div v-if="!authStore.authUser.isActivated" class="col-12">
                  <button @click="activate()" class="btn btn-primary">{{ $t("account.verify") }}</button>
                </div>
                <div v-else class="col-12">
                  <p>
                    {{ $t("account.verified") }}
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-4">
                  <label for="email" class="w-100">
                    <div class="label-title required">{{ $t("account.email") }}</div>
                    <input class="form-control" placeholder="Email address" type="email" name="account_email" id="email"
                      v-model="email">
                  </label>
                  <span class="text-red-500 text-xs pt-1 block">{{ errors.email }}</span>
                </div>
              </div>
            </div>
            <hr>
            <div class="my-3 row">
              <div class="col-12">
                <h2>{{ $t("account.password") }}</h2>
                <p class="note fix-3-12 margin-top-1 desktop-fix-12-12 toLeft">{{ $t("account.passwordText") }}</p>
              </div>
              <div class="row">

                <div class="col-12 col-md-6">
                  <label for="oldPassword" class="w-100">
                    <div class="label-title">{{ $t("account.currentPasword") }}</div>
                    <input v-model="oldPassword" class="form-control" :placeholder="$t('account.currentPasword')" type="password"
                      name="current_password" id="oldPassword" autocomplete="off">
                  </label>
                  <span class="text-red-500 text-xs pt-1 block">{{ errors.oldPassword }}</span>
                </div>
                <div class="col-12 col-md-6">
                  <label for="newPassword" class="w-100">
                    <div class="label-title">{{ $t("account.newPassword") }}</div>
                    <input v-model="newPassword" class="form-control" :placeholder="$t('account.newPassword')" type="password"
                      name="newPassword" id="newPassword" autocomplete="off">
                  </label>
                  <span class="text-red-500 text-xs pt-1 block">{{ errors.newPassword }}</span>
                </div>
              </div>
            </div>
            <hr>
            <div class="col-12 my-2">
              <LoadButton class="btn btn-primary" :loading="isLoading">{{ $t("account.save") }}</LoadButton>
              <RouterLink to="/" class="btn-get-started scrollto ms-2 btn btn-success">{{ $t("account.cancel") }}</RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- <TestLoadData></TestLoadData> -->
  </div>
  <FooterBox></FooterBox>
</template>

<script setup lang="ts">
import HeaderBox from "@/components/HeaderBox.vue";
import FooterBox from "@/components/FooterBox.vue";
import LoadButton from '@/components/LoadButton.vue'
import { useAuthStore } from '@/stores/authStore';


import { Form, useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';
import { useMutation } from '@tanstack/vue-query';
import type { IUpdateUser, IUserStateUpdate } from '@/utils/types';
import type { AxiosError } from 'axios';
import Auth from "@/api/authApi";

const authStore = useAuthStore()

authStore.addUserParams()
const registerSchema = toFormValidator(
  zod
    .object({
      name: zod.string().min(1, 'Full name is required'),
      email: zod
        .string()
        .min(1, 'Email address is required')
        .email('Email Address is invalid'),
      oldPassword: zod.literal("")
        .or(
          zod
            .string()
            .min(1, 'Password is required')
            .min(6, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters')
        ),
      newPassword: zod.literal("")
        .or(
          zod
            .string()
            .min(1, 'Password is required')
            .min(6, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters')
        ),

    }).refine((data) => {
      if (data.newPassword.length > 0) {
        return data.oldPassword.length > 0
      }
      return true

    }, {
      path: ['oldPassword'],
      message: 'Type old password',
    })

);
const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: registerSchema,
  initialValues: {
    name: authStore.authUser.name,
    email: authStore.authUser.email,
    newPassword: '',
    oldPassword: ''
  },
});
const { value: name } = useField('name');
const { value: email } = useField('email');
const { value: newPassword } = useField('newPassword');
const { value: oldPassword } = useField('oldPassword');
let sendedData: IUserStateUpdate
const { isLoading, mutate } = useMutation(
  (credentials: IUpdateUser) => {
    sendedData = {
      name: credentials.name,
      email: credentials.email,
    }
    return Auth.updateUser(credentials)
  },
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
      authStore.updateUser(sendedData)
    },
  }
);

const onSubmit = handleSubmit((values: { name: any; email: any; oldPassword: any; newPassword: any; }) => {
  mutate({
    name: values.name,
    email: values.email,
    password: values.oldPassword,
    newpassword: values.newPassword
  });
});

const activate = async () => {
  const answer = await Auth.activateUser()
  console.log(answer)
}



</script>

<style lang="scss" scoped></style>