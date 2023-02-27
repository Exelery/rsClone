import { defineStore } from "pinia";


export const useBuilderFloatMenu = defineStore({
  id: "float",
  state: () => ({
    slecetedPage: '',
    
  }),
  getters: {
    value: (state) => state.slecetedPage,
   
  },
  actions: {
    setActive(blockType: string) {
      this.slecetedPage = blockType;
    },
  },
});