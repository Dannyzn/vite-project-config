import styles from './index.module.scss';
import logoSrc from '@assets/imgs/vite.png';
// import {ReactComponent as ReactLogo} from '@assets/icons/logo.svg';
import Worker from './example.js?worker';
// import init from './fib.wasm';

// 1. 初始化 Worker 实例
const worker = new Worker();
// 2. 主线程监听 worker 的信息
worker.addEventListener('message', (e) => {
    console.log(e);
});

// wasm 引入
// type FibFunc = (num: number) => number;
// init({}).then((exports) => {
//     const fibFunc = exports.fib as FibFunc;
//     console.log('Fib result:', fibFunc(10));
// });

export function Header() {
  return (
    <div className={`p-20px text-center ${styles.header}`}>
      {/* <!-- 省略前面的组件内容 -->
      <!-- 使用图片 --> */}
      <img className="m-auto mb-4" src={logoSrc} alt="" />
      {/* <ReactLogo  style={{width: 100}}/> */}
      {/* 图片资源生产环境域名替换 */}
      <img src={new URL('./logo.png', import.meta.env.VITE_IMG_BASE_URL).href} />
    </div>
  )
};