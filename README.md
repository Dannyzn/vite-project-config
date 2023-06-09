# vite-project-config
FE engineer


## 1. 项目初始化

 - pnpm create vite
 
 - 可以选择设置 国内 npm 源
 
   - pnpm config set registry https://registry.npmmirror.com/

## 2. 项目配置方案

  - 接入现代化的 css 工程化的方案

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

   -  JS/TS 规范工具: ESLint
   
      -  什么是 ESLint？
      
         -  ESLint 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，
         
         -  它的目标是保证代码的一致性和避免错误。
         
      -  初始化
      
         -  安装
         
            -   pnpm i eslint -D
            
         -  ESLint 的初始化命令
         
            -  npx eslint --init
            
            -  手动安装
            
               -  pnpm i eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest -D
               
            - parser - 解析器
            
              - ESLint 底层默认使用 Espree 来进行 AST 解析
              
            - parserOptions - 解析器选项
            
              - 以对上述的解析器进行能力定制
              
                - ecmaFeatures - ECMAScript 特性
                
                  - 用来指定你想要使用的额外的语言特性
                  - type: object  默认值: {}
                  - jsx - 启用 JSX
                  
                - ecmaVersion - ECMAScript 版本
                
                  - 用来指定你想要使用的 ECMAScript 版本
                  - type: number  默认值: 5
                  - 2015 (6)、2016 (7)、2017 (8)、2018 (9)、2019 (10)、2020 (11)、2021 (12)
                  
                - sourceType - 源类型
                
                  - 用来指定你的代码是 ECMAScript 模块 (ESM) 还是 CommonJS 模块
                  - type: "script" | "module"  默认值: "script"
                  - script - 默认值，适用于普通的 JavaScript 代码
                  - module - 适用于使用了 ECMAScript 模块的 JavaScript 代码
                  
                - rule - 规则
                
                  - 用来指定你想要使用的额外的规则
                  - type: object  默认值: {}
                  - key (一般为规则名): value (具体的配置内容) 
                    - eg：  "no-cond-assign": ["error", "always"]
                    - 数组第一项为 ID, 第二项为 规则的配置
                      - 重点说一说规则的 ID
                        - off 或 0: 表示关闭规则。
                        - warn 或 1: 表示开启规则， 不过违背规则后只抛出 warning，而不会导致程序退出。
                        - error 或 2: 表示开启规则，不过违背规则后抛出 error，程序会退出。
                    - 直接把 value 的 rule 配置为 ID 也是可以的
                    - "no-cond-assign": "error"
                    
                - plugins
                
                  - 为啥需要 plugins？
                  
                    - ESLint 本身也没有内置 TypeScript 的代码规则，这个时候 ESLint 的插件系统就派上用场了
                      - add:  @typescript-eslint/eslint-plugin 
                    - 值得注意的是
                      - 添加插件后只是拓展了 ESLint 本身的规则集
                      - 但 ESLint 默认并没有开启这些规则的校验
                      - 如果要开启或者调整这些规则，你需要在 rules 中进行配置
                       ```
                       rules: {
                            'prettier/prettier': 'error',
                            quotes: ['error', 'single'],
                            semi: ['error', 'always'],
                            'react/react-in-jsx-scope': 'off'
                        }

                        ```
                - extends - 继承配置
                
                  - extends 相当于继承另外一份 ESLint 配置
                  
                    - 大概分为以下三种:
                    
                      - 从 ESLint 本身继承
                      - 从类似 eslint-config-xxx 的 npm 包继承
                      - 从 ESLint 插件继承
                      eg：
                      ```
                      "extends": [
                            // 第1种情况 
                            "eslint:recommended",
                            // 第2种情况，一般配置的时候可以省略 `eslint-config`
                            "standard"
                            // 第3种情况，可以省略包名中的 `eslint-plugin`
                            // 格式一般为: `plugin:${pluginName}/${configName}`
                            "plugin:react/recommended"
                            "plugin:@typescript-eslint/recommended",
                        ]
                      ```
                      - **不需要手动一一开启**
                      - 通过 extends 字段即可自动开启插件中的推荐规则
                      
                - env 和 globals
                
                  - 分别表示运行环境和全局变量
                  
                  - 在指定的运行环境中会预设一些全局变量
                  
                    ```
                     "env": {
                            "browser": "true",
                            "node": "true"
                        }
                    ```

                - 配置后便会启用浏览器和 Node.js 环境
                
                      - 这两个环境中的一些全局变量( window， globel) 会同时启动
                      
                  - 针对于 有些全局变量是业务代码引入的第三方库所声明
                  
                    - 这里就需要用到了 globals配置中声明全局变量
                    
                      - "writable"或者 true，表示变量可重写；
                      - "readonly"或者false，表示变量不可重写；
                      - "off"，表示禁用该全局变量。

   -  Prettier 
    
       -  首先是安装
       
          -  pnpm i prettier -D
          
       -  配置
       
          -  根目录新建.prettierrc.js配置文件

          -  将Prettier集成到现有的ESLint工具
          
             -  安装两个工具包
             
                -  pnpm i eslint-config-prettier eslint-plugin-prettier -D

                -  eslint-config-prettier
                
                   -  覆盖 ESLint 本身的规则配置
                   
                -  eslint-plugin-prettier
                
                   -  让 Prettier 来接管eslint --fix即修复代码的能力
                   
             -  .eslintrc.js 配置文件中接入 prettier 的相关工具链
             
       - VSCode 配置
       
          -  在VSCode中安装ESLint和Prettier这两个插件，并且在设置区中开启Format On Save
          
       -  Vite 中接入 ESLint
       
          -  add:  vite-plugin-eslint
          
             -  pnpm i vite-plugin-eslint -D
             
       -  样式规范工具: Stylelint
       
          -  Stylelint，一个强大的现代化样式 Lint 工具，用来帮助你避免语法错误和统一代码风格。
          
          -  装 Stylelint 以及相应的工具套件
          
             -  pnpm i stylelint stylelint-prettier stylelint-config-prettier stylelint-config-recess-order stylelint-config-standard stylelint-config-standard-scss -D
             
          -  配置文件.stylelintrc.js
          
             -  pnpm run lint:style 即可完成样式代码的规范检查和自动格式化
             
          -  在 Vite 中集成 Stylelint

-  Git 提交工作流集成 

    -  Husky + lint-staged 的 Git 提交工作流集成
       
       -  提交前的代码 Lint 检查
       
          -  代码提交的时候进行卡点检查 就是拦截 git commit 命令
          
             -  安装
             
                -  pnpm i husky -D
                
             -  Husky 4.x 及以下版本
             
                -  在package.json中配置 husky 的钩子
                
                ```
                   {
                       "husky": {
                           "pre-commit": "npm run lint"
                       }
                   }
                ```
                - 最新版本(7.x 版本)中是无效的
                
                  - 初始化 Husky
                  
                    - npx husky install
                    
                    - 并将 husky install作为项目启动前脚本
                    
                    
                    ```
                    {
                        "scripts": {
                            // 会在安装 npm 依赖后自动执行
                            "prepare": "husky install"
                        }
                    }

                    ```
                    
                    - 添加 Husky 钩子，在终端执行如下命令
                    
                      - npx husky add .husky/pre-commit "npm run lint"
                      
                      - 会有一个问题:
                      
                        - 在 Husky 的钩子中执行 npm run lint，这会产生一个额外的问题
                        
                        - Husky 中每次执行npm run lint都对仓库中的代码进行全量检查
                        
                        - 当项目代码越来越多的时候，提交的过程会越来越慢，影响开发体验
                        
                      - 解决上述全量扫描问题
                      
                        - lint-staged
                        
                          - 可以实现只对存入暂存区的文件进行 Lint 检查
                          
                        - 安装
                        
                          - pnpm i -D lint-staged
                          
                          - package.json中添加如下的配置:
                          
                           ```
                           "lint-staged": {
                                "**/*.{js,jsx,tsx,ts}": [
                                "npm run lint:script",
                                "git add ."
                                ],
                                "**/*.{scss}": [
                                "npm run lint:style",
                                "git add ."
                                ]
                            }
                            ```

                          - 在 Husky 的钩子中执行 lint-staged
                          
                            ```
                                {
                                    "husky": {
                                        "pre-commit": "npx --no -- lint-staged"
                                    }
                                }
                            ```
                            
                    - 以上配置完成后，每次提交代码的时候，都会对暂存区的代码进行 Lint 检查
                    
                      - 如果检查不通过，提交会被拦截
                      
                      - 如果检查通过，提交会继续进行
                      
              - 提交时的 commit 信息规范
              
                - Git 提交信息的规范也是不容忽视的一个环节
                
                  - 安装工具库
                  
                    - pnpm i commitlint @commitlint/cli @commitlint/config-conventional -D
                    
                  - 新建.commitlintrc.js
                  
                  - 直接使用@commitlint/config-conventional规范集
                  
                    - 所规定的 commit 信息一般由两个部分: type 和 subject
                    
                      
                      ```
                        // type 指提交的类型
                        // subject 指提交的摘要信息
                        <type>: <subject>
                        
                        ```
                    - type
                    
                      - feat: 添加新功能。
                      - fix: 修复 Bug。
                      - chore: 一些不影响功能的更改
                      - docs: 专指文档的修改。
                      - perf: 性能方面的优化。
                      - refactor: 代码重构。
                      - test: 添加一些测试代码等等
                      
                - 将commitlint的功能集成到 Husky 的钩子
                
                  - npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"

-  图片加载
    - 三种加载图片的场景

        1. HTML 或者 JSX 中，通过 img 标签来加载图片
              ```
              <img src="../../assets/a.png"></img>

              ``` 
        2. 在 CSS 中通过 background 属性加载图片
             ```
                .container {
                    background: url("../../assets/a.png");
                }
             ```  
        3. JavaScript 中，通过脚本的方式动态指定图片的src属性
            ```
            document.getElementById('xxx-img').src = '../../assets/c.png'
            ```
    - 那么如何在 vite 中使用呢？
        - 通过 vite.config.js 中的配置项来实现

            ```
            // 别名配置
            alias: {
            "@assets": path.join(__dirname, "src/assets"),
            },

            ```
        - 在遇到@assets路径的时候，会自动帮我们定位至根目录下的src/assets目录

    -  SVG 组件方式加载

        -  vue2
              -   vite-plugin-vue2-svg
        -  Vue3 
              -   vite-svg-loader
        -  React
              -  vite-plugin-svgr

    -  JSON 加载
    
        -  Vite 中已经内置了对于 JSON 文件的解析
        
             -  底层使用@rollup/pluginutils 的 dataToEsm 方法
             
             -  将 JSON 对象转换为一个包含各种具名导出的 ES 模块
             
            ```
            import { version } from '../../../package.json';

            ``` 
            
            -  也可以在配置文件禁用按名导入的方式
            
            ```
            // vite.config.ts

                {
                json: {
                    stringify: true
                }
            }
            ``` 
            
            -  export default JSON.parse("xxx") 
            
               -  会失去按名导出的能力，不过在 JSON 数据量比较大的时候，可以优化解析性能

     - Web Worker 脚本
     
         - 组件中引入，引入的时候注意加上 ***?worker后缀***
         
         - 相当于告诉 Vite 这是一个 Web Worker 脚本文件
         

    - Web Assembly 文件
    

    - 其它静态资源
    
          - 媒体类文件
          
              - mp4、webm、ogg、mp3、wav、flac和aac

          - 字体类文件
          
              - woff、woff2、eot、ttf 和 otf

          - 文本类
          
              - webmanifest、pdf和txt
              
          - 增加配置

            ```
             // vite.config.ts

             {
                 assetsInclude: ['.gltf']
             }
            ```
            
    - 特殊资源后缀
    
          - Vite 中引入静态资源时，也支持在路径最后加上一些特殊的 query 后缀
          

            - ?url
            
                -  表示获取资源的路径，这在只想获取文件路径而不是内容的场景将会很有用
                
            - ?raw
            
                -  表示获取资源的字符串内容，如果你只想拿到资源的原始内容，可以使用这个后缀。
                
            - ?inline
            
                -  表示资源强制内联，而不是打包成单独的文件。

    -  生产环境处理

        -  部署域名怎么配置？
        -  资源打包成单文件还是作为 Base64 格式内联?
        -  图片太大了怎么压缩？
        -  vg 请求数量太多了怎么优化？

        -  1. 自定义部署域名
              -    一般在我们访问线上的站点时，站点里面一些静态资源的地址都包含了相应域名的前缀
            ```<img src="https://aliyun.cos.ap-beijing.myqcloud.com/logo.png" />``` 
              - 实现 自动化的方式来实现地址的替换
                  - 首先 配置 env 文件
                      - .env.development
                          - NODE_ENV=development
                      - .env.production
                          - NODE_ENV=production
                  - 打包的时候 Vite 会自动将这些环境变量替换为相应的字符串。

            - 有时候可能项目中的某些图片需要存放到另外的存储服务
                - 一种直接的方案是将完整地址写死到 src 属性中
                      - ```<img src="https://my-image-cdn.com/logo.png">```
                      - 不太优雅的，我们可以通过定义环境变量的方式来解决这个问题
                - 在项目根目录新增.env文件
                      1. // 开发环境优先级: .env.development > .env
                         // 生产环境优先级: .env.production > .env
                    
                      2. src/vite-env.d.ts增加类型声明
                         ```
                         /// <reference types="vite/client" />

                            interface ImportMetaEnv {
                                readonly VITE_APP_TITLE: string;
                                // 自定义的环境变量
                                readonly VITE_IMG_BASE_URL: string;
                            }

                            interface ImportMeta {
                                readonly env: ImportMetaEnv;
                            }
                         ``` 
        - 2. 单文件 or 内联
              - Vite 中，所有的静态资源都有两种构建方式
                  - 一种是打包成一个单文件
                  - 另一种是通过 base64 编码的格式内嵌到代码中

              -  这两种方案到底应该如何来选择呢？
                  -  比较小的资源，适合内联到代码中
                        - 一方面对代码体积的影响很小
                        - 另一方面可以减少不必要的网络请求，优化网络性能

                  -   对于比较大的资源，就推荐单独打包成一个文件
                        -  否则可能导致上 MB 的 base64 字符串内嵌到代码中，导致代码体积瞬间庞大，页面加载性能直线下降。

              -  Vite 中内置的优化方案
                  -   如果静态资源体积 >= 4KB，则提取成单独的文件
                  -   如果静态资源体积 < 4KB，则作为 base64 格式的字符串内联

                  -  4 KB即为提取成单文件的临界值
                  -  这个临界值你可以通过 ***build.assetsInlineLimit*** 自行配置
                  ```// vite.config.ts
                    {
                        build: {
                            // 8 KB
                            assetsInlineLimit: 8 * 1024
                        }
                    }
                    ```
                  -  svg 格式的文件不受这个临时值的影响，始终会打包成单独的文件，因为它和普通格式的图片不一样，需要动态设置一些属性，比如 width、height、fill 等
        -  3. 图片压缩
              -  在 JavaScript 领域有一个非常知名的图片压缩库imagemin，
                    -  Webpack 中大名鼎鼎的image-webpack-loader
                    -  Vite 插件——vite-plugin-imagemin
                       -  pnpm i vite-plugin-imagemin -D
                    -  Vite 配置文件中引入:
                    ```
                    //vite.config.ts
                        import viteImagemin from 'vite-plugin-imagemin';

                        {
                        plugins: [
                            // 忽略前面的插件
                            viteImagemin({
                            // 无损压缩配置，无损压缩下图片质量不会变差
                            optipng: {
                                optimizationLevel: 7
                            },
                            // 有损压缩配置，有损压缩下图片质量可能会变差
                            pngquant: {
                                quality: [0.8, 0.9],
                            },
                            // svg 优化
                            svgo: {
                                plugins: [
                                {
                                    name: 'removeViewBox'
                                },
                                {
                                    name: 'removeEmptyAttrs',
                                    active: false
                                }
                                ]
                            }
                            })
                        ]
                        }
                    ``` 
        - 4. 雪碧图优化
              -  虽然 svg 文件一般体积不大，但 Vite 中对于 svg 文件会始终打包成单文件，大量的图标引入之后会导致网络请求增加，大量的 HTTP 请求会导致网络解析耗时变长，页面加载性能直接受到影响。这个问题怎么解决呢
                    -  HTTP2 的多路复用设计可以解决大量 HTTP 的请求导致的网络加载性能问题，因此雪碧图技术在 HTTP2 并没有明显的优化效果，这个技术更适合在传统的 HTTP 1.1 场景下使用(比如本地的 Dev Server)。

              -  Vite 中提供了import.meta.glob的语法糖来解决这种批量导入的问题
                 -  对象的 value 都是动态 import，适合按需加载的场景
               
              -  在这里我们只需要同步加载即可，可以使用 import.meta.globEager来完成:

                  - 我们能不能把这些 svg 合并到一起，从而大幅减少网络请求呢？
                    - 可以通过vite-plugin-svg-icons来实现这个方案
                    - pnpm i vite-plugin-svg-icons -D

-  为什么需要预构建?
      -  lodash-es

      -  Esbuild 

   -  如何开启预构建？
         -  自动开启
            -  
         -  手动开启
            -  