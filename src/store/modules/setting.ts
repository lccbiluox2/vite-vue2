import { defineStore } from 'pinia';

// 定义一个名为 'SettingStore' 的 store
export const useLayoutSettingStore = defineStore('SettingStore', {
    state: () => ({
        fold: false, // 控制菜单是折叠还是展开
    }),
    actions: {
        toggleFold() {
            this.fold = !this.fold;
        },
        setFold(fold: boolean) {
            this.fold = fold;
        }
    },
    getters: {
        isFolded: (state) => state.fold,
    }
});