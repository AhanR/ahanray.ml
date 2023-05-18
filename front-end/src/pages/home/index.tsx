import PageWrapper from "../../components/pageWrapper/pageWrapper";
import styles from "./home.module.css";
import { motion } from "framer-motion"

export default function Home() {



  return (
    <div>
        <PageWrapper
          className = {styles.center}
          onViewportEnter = {()=>{
            // do a callback that slowly shows the hi text
          }}
        >
            <span className={styles.bigText} >Hi</span>
            <motion.div
              className={styles.center}
              initial={{
                opacity: 0,
                height: 0
              }}
              whileInView={{
                opacity: 1,
                height: "max-content"
              }}
            >
              <motion.span
                className={styles.midText}
              >
                I'm ahan
              </motion.span>
              <motion.span 
                className={styles.smallText}
              >
                swipe up to see more
              </motion.span>
            </motion.div>
        </PageWrapper>
    </div>
  )
}
