# vite-project-config
FE engineer


## 1. 项目初始化
 - pnpm create vite
 - 可以选择设置 国内 npm 源
   - pnpm config set registry https://registry.npmmirror.com/

## 2. 项目配置

  -  1. 接入现代化的 css 工程化的方案

    - css 预处理器
      - sass
        -  pnpm i sass -D
           -  手动引入的方案
              -  variable.scss 文件中配置 $style: 'scss'; style为自定义的变量名
              -  style.scss 文件中引入 @import './variable.scss';
           -  自动引入的方案
              -  基于vite的配置方案
                 -  plan 1
                    -  手动引入路径 @import './variable.scss';
                    -  借助于插件   vite-plugin-style-import 实现自动引入
                       - pnpm i vite-plugin-style-import -D
                       - 如何实现自动引入  在 vite.config.js 中配置
                          ```
                          import styleImport from 'vite-plugin-style-import';
                              export default {
                                plugins: [
                                  styleImport({
                                    libs: [
                                      {
                                        libraryName: 'element-plus',
                                        esModule: true,
                                        ensureStyleFile: true,
                                        resolveStyle: (name) => {
                                          name = name.slice(3);
                                          return `element-plus/packages/theme-chalk/src/${name}.scss`;
                                        },
                                        resolveComponent: (name) => {
                                          return `element-plus/lib/${name}`;
                                        },
                                      },
                                    ],
                                  }),
                                ],
                              };

                          ```
                    -  plan 2
                       -  normalizePath 解决 window 下的路径问题    
      - less
      - stylus

    - css module 
      - 不太常用的配置网站
        - [postcss-modules](https://github.com/madyankin/postcss-modules)

    - PostCSS
        
      - 一般你可以通过 postcss.config.js 来配置 postcss

      -  Vite 配置文件中提供了 PostCSS 的配置入口


    - autoprefixer

      - 自动为不同的目标浏览器添加样式前缀
      - 解决的是浏览器兼容性的问题

    - [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)
      - 用来将 px 转换为 rem 单位，在适配移动端的场景下很常用

    - [postcss-preset-env](https://github.com/csstools/postcss-preset-env)
      - 通过它，你可以编写最新的 CSS 语法，不用担心兼容性问题

    - [postcss-px-to-viewport](https://www.npmjs.com/package/postcss-px-to-viewport)

    - [cssnano](https://github.com/cssnano/cssnano)
      - 用来压缩 CSS 代码