import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { YouibotPlusResolver } from 'youibot-plus'
// import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

function resolve() {
  return {
    '@': path.resolve(__dirname, './src')
  }
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({}),
    // 兼容旧版浏览器
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    // element-plus 按需引入
    Components({
      dirs: ['src/components'],
      resolvers: [AntDesignVueResolver(), YouibotPlusResolver() as any]
    })
  ],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://10.10.0.72:8026/', //后端接口
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: resolve()
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/assets/styles/default.less";` //全局引用样式变量
      }
    }
  },
  base: './',
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    outDir: 'dist'
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
})
