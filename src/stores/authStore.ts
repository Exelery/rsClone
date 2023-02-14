import { defineStore } from "pinia";

import { API_URL } from "@/api/http";
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
    },
  },
})

// token: JSON.parse(localStorage.getItem("token")|| '')