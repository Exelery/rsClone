import { defineStore } from "pinia";

import type { IAuthStoreState, IUser } from "@/utils/types";

export const useAuthStore = defineStore({
  id: "authStore",
  state: () => ({
    authUser: null,
  } as IAuthStoreState),
  getters: {},
  actions: {
    setAuthUser(user: IUser | null) {
      
      this.authUser = user;
      console.log('user', this.authUser)
    },
  },
})

// token: JSON.parse(localStorage.getItem("token")|| '')