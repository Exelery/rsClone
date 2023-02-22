import { defineStore } from "pinia";

import type { IAuthStoreState, IUser, IUserStateUpdate } from "@/utils/types";
import { useLocalStorage } from "@vueuse/core";

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
    setLoginState(user: IUser | null) {
      this.setAuthUser(user)
      this.isAuth = true
    },

    logout() {
      this.isAuth = false
    },
    
    setAuthUser(user: IUser | null) {
      if (user) {
        this.authUser = user
      };
      // console.log('user', this.authUser)
    },
    updateUser({email, name}: IUserStateUpdate) {
      this.authUser.email = email
      this.authUser.name = name
    }
  },
})

// token: JSON.parse(localStorage.getItem("token")|| '')