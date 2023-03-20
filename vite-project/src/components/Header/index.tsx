import styles from './index.module.scss';
import logoSrc from '@assets/imgs/vite.png';
import {ReactComponent as ReactLogo} from '@assets/icons/logo.svg';
import Worker from './example.js?worker';

// 1. 初始化 Worker 实例
const worker = new Worker();
// 2. 主线程监听 worker 的信息
worker.addEventListener('message', (e) => {
    console.log(e);
});

export function Header() {
  return (
    <div className={`p-20px text-center ${styles.header}`}>
      {/* <!-- 省略前面的组件内容 -->
      <!-- 使用图片 --> */}
      <img className="m-auto mb-4" src={logoSrc} alt="" />
      <ReactLogo  style={{width: 100}}/>
    </div>
  )
};