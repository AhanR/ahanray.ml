import PageWrapper from "../../components/pageWrapper/pageWrapper";
import styles from "./projects.module.css"
import { useState } from 'react'; 

export default function Projects() {

  const [searchKey, setSearchKey] = useState("Dance");

  return (
    <PageWrapper
      className={styles.wrapper}
    >
      <div 
        className={styles.wrapperContent}
      >
        <div className={styles.questionWrapper}>
          <div
            className={styles.question}
          >
            Can Ahan
          </div>
          <input
            className={styles.blank}
            value={searchKey}
            onChange={e=>setSearchKey(e.target.value)}
          />
        </div>
        <div className={styles.answerWrapper}>
          <div
            className={styles.resultHeader}
          >According to experts, Ahan can</div>
          <div className={styles.resultOption} >This is a result</div>
          <div className={styles.resultOption} >This is a result</div>
          <div className={styles.resultOption} >This is a result</div>
          <div className={styles.resultOption} >This is a result</div>
        </div>
      </div>
    </PageWrapper>
  )
}
