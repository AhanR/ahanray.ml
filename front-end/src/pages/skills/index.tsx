import { useState } from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import styles from "./skills.module.css"

enum skillTypes {
  certification = "certification",
  experience = "experience"
}

export default function Skills() {

  const [skillType, setSkillType] = useState(skillTypes.certification)

  return (
    <PageWrapper
      className={styles.wrapper}
    >
      <div className={styles.topButtons}>
        <button
          className={skillType==skillTypes.certification? styles.selectedType : ""} 
          onClick={()=>{
            setSkillType(skillTypes.certification);
          }}
        >
          certifications
        </button>
        <button 
          className={skillType==skillTypes.experience? styles.selectedType : ""}
          onClick={()=>{
            setSkillType(skillTypes.experience);
          }}
        >
          experiences
        </button>
      </div>
      <div className={styles.explorer}>
        <div className={styles.header}>
          <span
            className={styles.title}
          >
            This is the title
          </span>
          <div className={styles.controls}>
            <div className={styles.buttons}>
              <button>{"<"}</button>
              <button>{">"}</button>
            </div>
            <span>1 of 9</span>
          </div>
        </div>
        <div className={styles.data}>
          <iframe 
            src="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~2S6TDQN6EV8K/CERTIFICATE_LANDING_PAGE~2S6TDQN6EV8K.jpeg"
            // frameBorder="0"
            className={styles.iframe}
          >
          </iframe>
        </div>
      </div>
    </PageWrapper>
  )
}
