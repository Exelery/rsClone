import { defineStore } from "pinia";

import type { IAuthStoreState, IUser, IUserStateUpdate } from "@/utils/types";
import { useLocalStorage } from "@vueuse/core";
import Auth from "@/api/authApi";

export const useAuthStore = defineStore({
  id: "authStore",
  state: () => {
    return {
      authUser: useLocalStorage("authStore", {
        name: "",
        email: '',
        isActivated: false,
        id: ''
      } as IUser),
      isAuth: useLocalStorage('isAuth', false)
    }
  },

  getters: {},
  actions: {
    setAuth() {
      this.isAuth = true
    },
    setLoginState(user: IUser | null) {
      this.setAuthUser(user) 
    },

    logout() {
      this.isAuth = false
    },
    
    setAuthUser(user: IUser | null) {
      if (user) {
        this.authUser = user
      };
    },
    updateUser({email, name}: IUserStateUpdate) {
      this.authUser.email = email
      this.authUser.name = name
    },
    async addUserParams() {
      const response = await Auth.getUserInfo()
      this.setLoginState(response.data.value)
    }
  },
 
})
