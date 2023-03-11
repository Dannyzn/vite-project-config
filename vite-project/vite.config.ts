import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// 引入 path 包注意两点:
// 1. 为避免类型报错，你需要通过 `pnpm i @types/node -D` 安装类型
// 2. tsconfig.node.json 中设置 `allowSyntheticDefaultImports: true`，以允许下面的 default 导入方式
import path from 'path'
import { normalizePath } from 'vite';
// vite.config.ts 增加如下的配置
import autoprefixer from 'autoprefixer';

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题


// https://vitejs.dev/config/
export default defineConfig({
  // 手动指定项目根目录位置
  // root: path.resolve(__dirname, './'),
  // root: path.join(__dirname, 'src')
  plugins: [react()],
  css: {  // css 配置 https://vitejs.dev/config/#css-modules-options
    modules: {
      localsConvention: 'camelCaseOnly',
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: '[name]__[local]___[hash:base64:5]',

    },
    preprocessorOptions: { // 配置 scss 全局变量
      scss: { // 配置 scss 全局变量 
        // additionalData: `@import "./src/variable.scss";` //Can't find stylesheet to import
        additionalData: `@import "./src/variable.scss";` // plan 1
        // additionalData: `@import "${normalizePath(path.resolve(__dirname, './src/variable.scss'))}";`, // plan 2
      },
    },
    //  进行 PostCSS 配置
    postcss: {
      plugins: [autoprefixer({
        // overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        overrideBrowserslist: ['last 2 versions', '>1%', 'ios 7'],
      })]
    },
  },
})
