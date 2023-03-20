import styles from './index.module.scss';
import logoSrc from '@assets/imgs/vite.png';
import {ReactComponent as ReactLogo} from '@assets/icons/logo.svg';


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