import {defineConfig} from 'vite'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    plugins: [
    ],
    css: {
        preprocessorOptions: {
            less: {
                additionalData: `@import "@/assets/styles/_var.less" ;@import "@/assets/styles/_mixins.less" ;`,
            },
        },
    },
})
