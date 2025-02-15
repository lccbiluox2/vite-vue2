import { defineStore } from 'pinia';

export const useLayoutSettingStore = defineStore('SettingStore', {
    state: () => ({
        fold: false, // 控制菜单是折叠还是展开
        needRefresh: false, // 新增：控制是否需要刷新layout_main的内容
    }),
    actions: {
        toggleFold() {
            this.fold = !this.fold;
        },
        setFold(fold: boolean) {
            this.fold = fold;
        },
        setLayoutMainRefresh(refresh: boolean) {
            this.needRefresh = refresh;
        },
        refreshLayoutMain() {
            this.setLayoutMainRefresh(true); // 设置刷新标志
            setTimeout(() => { // 模拟延迟后清除刷新标志
                this.setLayoutMainRefresh(false);
            }, 500); // 延迟时间可以根据实际需求调整
        }
    },
    getters: {
        isFolded: (state) => state.fold,
        shouldRefresh: (state) => state.needRefresh,
    }
});