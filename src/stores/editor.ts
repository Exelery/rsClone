import { defineStore } from "pinia";

export const useEditorStore = defineStore({
  id: "editor",
  state: () => ({
    activeBlock: 'navBar',
  }),
  getters: {
    value: (state) => state.activeBlock ,
  },
  actions: {
    setActive(blockType: string) {
      this.activeBlock = blockType;
    },
  },
});
