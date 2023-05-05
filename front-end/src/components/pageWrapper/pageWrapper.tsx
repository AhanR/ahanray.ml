import { useContext } from 'react';
import styles from './pageWrapper.module.css';
import { pagePadding } from '../status/status';
import { motion } from 'framer-motion'

export default function PageWrapper(props : any) {

  const padding = useContext(pagePadding)

  return (
    <motion.div
      className={styles.pageComponent}
      style={{
        padding: `${padding.y} ${padding.x}`
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity:1 }}
      exit={{ opacity:0 }}
    >
      <div className={props.className} style={props.style} >
        {
          props.children
        }
      </div>
    </motion.div>
  )
}
