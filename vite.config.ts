import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';

export default defineConfig(({ command }) => ({
    plugins: [
        vue(),
        vueJsx(),
        viteMockServe({
            localEnabled: command === 'serve',
            mockPath: 'mock/',
            watchFiles: true,
            injectFile: true,
        } as any),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src') // 确保路径别名指向 src 目录
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                // 使用 @use 替代 @import
                additionalData: `@use "@/styles/variables" as *;`
            }
        }
    }
}));

