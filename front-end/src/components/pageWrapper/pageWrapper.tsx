import { useContext } from 'react';
import styles from './pageWrapper.module.css';
import { pagePadding } from '../status/status';

export default function PageWrapper(props : any) {

  const padding = useContext(pagePadding)

  return (
    <div
      className={styles.pageComponent}
      style={{
        padding: `${padding.y} ${padding.x}`
      }}
    >
      <div className={props.className} style={props.style} >
        {
          props.children
        }
      </div>
    </div>
  )
}
