import styles from './index.module.scss';
import logoSrc from '@assets/imgs/vite.png';
// import {ReactComponent as ReactLogo} from '@assets/icons/logo.svg';
import Worker from './example.js?worker';
// import init from './fib.wasm';
import Logo1 from '@assets/icons/logo-1.svg';
import Logo2 from '@assets/icons/logo-2.svg';
import Logo3 from '@assets/icons/logo-3.svg';
import Logo4 from '@assets/icons/logo-4.svg';
import Logo5 from '@assets/icons/logo-5.svg';

// 1. 初始化 Worker 实例
const worker = new Worker();
// 2. 主线程监听 worker 的信息
worker.addEventListener('message', (e) => {
    // console.log(e);
});

//对象的 value 都是动态 import，适合按需加载的场景。
// const icons = import.meta.glob('../../assets/icons/logo-*.svg');
// console.log(icons);
const icons11 = import.meta.globEager('../../assets/icons/logo-*.svg');
// import.meta.glob('*', { eager: true }) 
console.log('icons11', icons11);

const iconUrls = Object.values(icons11).map(mod => mod.default);

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
      {iconUrls.map((item, index) => (
        <img src={item} key={index} width="50" height="40" alt="" />
      ))}
    </div>
  )
};